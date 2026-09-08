-- Fix GET /api/GharBooking/admin: missing UpdatedDate and AdminRemark.
-- Run against the QLSS database. Safe to run more than once.
USE [QLSS];
GO
SET XACT_ABORT ON;

IF OBJECT_ID(N'dbo.Ghar9001Booking', N'U') IS NULL
    THROW 50001, 'Ghar9001Booking is missing. Apply the base booking and payment migrations first.', 1;

BEGIN TRY
    BEGIN TRANSACTION;

    IF COL_LENGTH(N'dbo.Ghar9001Booking', N'UpdatedDate') IS NULL
        ALTER TABLE dbo.Ghar9001Booking ADD UpdatedDate DATETIME2(0) NULL;

    IF COL_LENGTH(N'dbo.Ghar9001Booking', N'AdminRemark') IS NULL
        ALTER TABLE dbo.Ghar9001Booking ADD AdminRemark NVARCHAR(500) NULL;

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
    THROW;
END CATCH;
GO

-- Verify all columns used by the admin listing without returning customer data.
SELECT TOP (0)
    BookingId, Name, WhatsAppNumber, Quantity, ShippingAddress, City, State,
    PinCode, ListPricePerCopy, DiscountedPricePerCopy, DeliveryCharge, FinalAmount,
    TransactionId, PaymentScreenshotOriginalName, PaymentScreenshotContentType,
    PaymentScreenshotSize, Status, CreatedDate, UpdatedDate, AdminRemark
FROM dbo.Ghar9001Booking;
GO
