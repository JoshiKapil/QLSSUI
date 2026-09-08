SET XACT_ABORT ON;
SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
GO

/*
  Training presentation email workflow.
  The header stores the history row; the recipient table stores one delivery
  record per address so failed recipients can be retried independently.
  Existing Training, Client, Certifications_Data and Users rows are reused by
  the API and are intentionally not changed by this migration.
*/

BEGIN TRY
    BEGIN TRANSACTION;

    IF OBJECT_ID(N'dbo.qlss_training_presentation_email', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_training_presentation_email
        (
            history_id BIGINT IDENTITY(1,1) NOT NULL
                CONSTRAINT PK_qlss_training_presentation_email PRIMARY KEY,
            company_id INT NOT NULL,
            training_id INT NOT NULL,
            training_date DATE NOT NULL,
            company_name NVARCHAR(250) NOT NULL,
            training_name NVARCHAR(250) NOT NULL,
            subject NVARCHAR(250) NOT NULL,
            message NVARCHAR(MAX) NOT NULL,
            file_name NVARCHAR(260) NOT NULL,
            recipient_count INT NOT NULL
                CONSTRAINT DF_qlss_training_presentation_email_recipient_count DEFAULT (0),
            sent_count INT NOT NULL
                CONSTRAINT DF_qlss_training_presentation_email_sent_count DEFAULT (0),
            failed_count INT NOT NULL
                CONSTRAINT DF_qlss_training_presentation_email_failed_count DEFAULT (0),
            sent_by NVARCHAR(256) NOT NULL,
            sent_date_utc DATETIME2(0) NOT NULL
                CONSTRAINT DF_qlss_training_presentation_email_sent_date DEFAULT (SYSUTCDATETIME()),
            status NVARCHAR(30) NOT NULL
                CONSTRAINT DF_qlss_training_presentation_email_status DEFAULT (N'Pending'),
            CONSTRAINT CK_qlss_training_presentation_email_counts CHECK
                (recipient_count >= 0 AND sent_count >= 0 AND failed_count >= 0 AND sent_count + failed_count <= recipient_count),
            CONSTRAINT CK_qlss_training_presentation_email_status CHECK
                (status IN (N'Pending', N'PartiallySent', N'Sent', N'Failed'))
        );
    END;

    IF OBJECT_ID(N'dbo.qlss_training_presentation_recipient', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_training_presentation_recipient
        (
            recipient_id BIGINT IDENTITY(1,1) NOT NULL
                CONSTRAINT PK_qlss_training_presentation_recipient PRIMARY KEY,
            history_id BIGINT NOT NULL,
            recipient_name NVARCHAR(250) NULL,
            recipient_email NVARCHAR(320) NOT NULL,
            normalized_email AS LOWER(LTRIM(RTRIM(recipient_email))) PERSISTED,
            delivery_status NVARCHAR(20) NOT NULL
                CONSTRAINT DF_qlss_training_presentation_recipient_status DEFAULT (N'Pending'),
            error_message NVARCHAR(2000) NULL,
            sent_date_utc DATETIME2(0) NULL,
            attempt_count INT NOT NULL
                CONSTRAINT DF_qlss_training_presentation_recipient_attempts DEFAULT (0),
            CONSTRAINT FK_qlss_training_presentation_recipient_history FOREIGN KEY (history_id)
                REFERENCES dbo.qlss_training_presentation_email(history_id),
            CONSTRAINT CK_qlss_training_presentation_recipient_status CHECK
                (delivery_status IN (N'Pending', N'Sent', N'Failed'))
        );
    END;

    IF NOT EXISTS
    (
        SELECT 1 FROM sys.indexes
        WHERE object_id = OBJECT_ID(N'dbo.qlss_training_presentation_recipient')
          AND name = N'UX_qlss_training_presentation_recipient_history_email'
    )
    BEGIN
        CREATE UNIQUE INDEX UX_qlss_training_presentation_recipient_history_email
            ON dbo.qlss_training_presentation_recipient(history_id, normalized_email);
    END;

    IF NOT EXISTS
    (
        SELECT 1 FROM sys.indexes
        WHERE object_id = OBJECT_ID(N'dbo.qlss_training_presentation_email')
          AND name = N'IX_qlss_training_presentation_email_sent_date'
    )
    BEGIN
        CREATE INDEX IX_qlss_training_presentation_email_sent_date
            ON dbo.qlss_training_presentation_email(sent_date_utc DESC, history_id DESC);
    END;

    IF NOT EXISTS
    (
        SELECT 1 FROM sys.indexes
        WHERE object_id = OBJECT_ID(N'dbo.qlss_training_presentation_recipient')
          AND name = N'IX_qlss_training_presentation_recipient_failed'
    )
    BEGIN
        CREATE INDEX IX_qlss_training_presentation_recipient_failed
            ON dbo.qlss_training_presentation_recipient(history_id, delivery_status)
            INCLUDE (recipient_name, recipient_email, error_message);
    END;

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF XACT_STATE() <> 0 ROLLBACK TRANSACTION;
    THROW;
END CATCH;
GO
