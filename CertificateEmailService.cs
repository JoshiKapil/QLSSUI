using System.Net;
using MailKit.Security;
using MimeKit;
using QlssService.DTOs;
using QlssService.Services.Interface;

namespace QlssService.Services.Implementation;

public sealed class CertificateEmailService : ICertificateEmailService
{
    private const long MaxPdfSize = 5 * 1024 * 1024;
    private readonly IConfiguration _configuration;
    private readonly ILogger<CertificateEmailService> _logger;

    public CertificateEmailService(IConfiguration configuration, ILogger<CertificateEmailService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public async Task SendAsync(CertificateEmailRequestDto request, CancellationToken cancellationToken)
    {
        if (request.File.Length == 0 || request.File.Length > MaxPdfSize)
            throw new InvalidOperationException("Certificate PDF must be between 1 byte and 5 MB.");

        if (!string.Equals(request.File.ContentType, "application/pdf", StringComparison.OrdinalIgnoreCase) ||
            !string.Equals(Path.GetExtension(request.File.FileName), ".pdf", StringComparison.OrdinalIgnoreCase))
            throw new InvalidOperationException("Only PDF certificate files are accepted.");

        var smtp = _configuration.GetSection("SmtpSettings");
        var smtpUser = smtp["User"] ?? throw new InvalidOperationException("SMTP user is not configured.");
        var smtpPassword = smtp["Pass"] ?? throw new InvalidOperationException("SMTP password is not configured.");
        var smtpHost = smtp["Host"] ?? throw new InvalidOperationException("SMTP host is not configured.");
        if (string.IsNullOrWhiteSpace(smtpUser) || string.IsNullOrWhiteSpace(smtpPassword) || string.IsNullOrWhiteSpace(smtpHost))
            throw new InvalidOperationException("SMTP settings are incomplete.");
        if (!int.TryParse(smtp["Port"], out var smtpPort))
            throw new InvalidOperationException("SMTP port is invalid.");

        await using var pdfStream = request.File.OpenReadStream();
        using var buffer = new MemoryStream();
        await pdfStream.CopyToAsync(buffer, cancellationToken);

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("QLSS Business Consulting", smtpUser));
        message.To.Add(new MailboxAddress(request.RecipientName.Trim(), request.RecipientEmail.Trim()));
        message.Subject = $"QLSS Certificate - {request.TrainingName.Trim()} - {request.RecipientName.Trim()}";

        var safeName = WebUtility.HtmlEncode(request.RecipientName.Trim());
        var safeTraining = WebUtility.HtmlEncode(request.TrainingName.Trim());
        var safeNumber = WebUtility.HtmlEncode(request.CertificateNumber.Trim());
        var body = new BodyBuilder
        {
            HtmlBody = $"<p>Dear {safeName},</p>" +
                       $"<p>Congratulations! You have successfully passed the assessment of <strong>{safeTraining}</strong>.</p>" +
                       $"<p>Please find attached your QLSS Certificate for <strong>{safeTraining}</strong>.</p>" +
                       $"<p><strong>Certificate Number: {safeNumber}</strong></p>" +
                       "<p>We appreciate your commitment to continuous learning and professional excellence. We wish you continued success in your career.</p>" +
                       "<p>Regards,<br>Vedant Kulkarni<br>QLSS Business Consulting</p>"
        };
        body.Attachments.Add(Path.GetFileName(request.File.FileName), buffer.ToArray(), ContentType.Parse("application/pdf"));
        message.Body = body.ToMessageBody();

        using var client = new MailKit.Net.Smtp.SmtpClient();
        await client.ConnectAsync(smtpHost, smtpPort, SecureSocketOptions.StartTls, cancellationToken);
        await client.AuthenticateAsync(smtpUser, smtpPassword, cancellationToken);
        await client.SendAsync(message, cancellationToken);
        await client.DisconnectAsync(true, cancellationToken);
        _logger.LogInformation("Certificate {CertificateNumber} emailed to {Recipient}.", request.CertificateNumber, request.RecipientEmail);
    }
}