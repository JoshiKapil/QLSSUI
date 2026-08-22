SET NOCOUNT ON;
SET XACT_ABORT ON;

BEGIN TRY
    BEGIN TRANSACTION;

    IF OBJECT_ID(N'dbo.qlss_pm_setting', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_pm_setting
        (
            setting_key nvarchar(100) NOT NULL CONSTRAINT PK_qlss_pm_setting PRIMARY KEY,
            setting_value nvarchar(1000) NOT NULL,
            description nvarchar(500) NULL,
            updated_by_user_id int NULL,
            updated_on_utc datetime2(0) NOT NULL CONSTRAINT DF_qlss_pm_setting_updated DEFAULT SYSUTCDATETIME()
        );
    END;

    MERGE dbo.qlss_pm_setting AS target
    USING (VALUES
        (N'QuotationFollowUpDays', N'2', N'Days after sending a quotation before follow-up is due.'),
        (N'ActivityUpcomingDays', N'5', N'Days used by dashboards to classify upcoming activities.'),
        (N'EmailRetryLimit', N'3', N'Maximum manual retry attempts for a failed PM email.'),
        (N'ReminderWorkerMinutes', N'30', N'Background reminder scan interval in minutes.')
    ) AS source(setting_key, setting_value, description)
    ON target.setting_key = source.setting_key
    WHEN NOT MATCHED THEN INSERT(setting_key, setting_value, description)
        VALUES(source.setting_key, source.setting_value, source.description);

    IF COL_LENGTH(N'dbo.qlss_pm_email_log', N'retry_count') IS NULL
        ALTER TABLE dbo.qlss_pm_email_log ADD retry_count int NOT NULL CONSTRAINT DF_qlss_pm_email_log_retry_count DEFAULT(0);
    IF COL_LENGTH(N'dbo.qlss_pm_email_log', N'last_retry_on_utc') IS NULL
        ALTER TABLE dbo.qlss_pm_email_log ADD last_retry_on_utc datetime2(0) NULL;

    IF OBJECT_ID(N'dbo.qlss_pm_customer_response', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_pm_customer_response
        (
            customer_response_id bigint IDENTITY(1,1) NOT NULL CONSTRAINT PK_qlss_pm_customer_response PRIMARY KEY,
            entity_type nvarchar(30) NOT NULL,
            entity_id bigint NOT NULL,
            channel nvarchar(30) NOT NULL,
            response_status nvarchar(30) NOT NULL,
            received_from nvarchar(250) NULL,
            subject nvarchar(500) NULL,
            response_text nvarchar(max) NULL,
            received_on_utc datetime2(0) NOT NULL,
            recorded_by_user_id int NOT NULL,
            created_on_utc datetime2(0) NOT NULL CONSTRAINT DF_qlss_pm_customer_response_created DEFAULT SYSUTCDATETIME(),
            CONSTRAINT CK_qlss_pm_customer_response_entity CHECK(entity_type IN (N'Enquiry',N'Quotation',N'Project')),
            CONSTRAINT CK_qlss_pm_customer_response_channel CHECK(channel IN (N'Email',N'Phone',N'Meeting',N'Portal',N'Other'))
        );
        CREATE INDEX IX_qlss_pm_customer_response_entity ON dbo.qlss_pm_customer_response(entity_type, entity_id, received_on_utc DESC);
    END;

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
    THROW;
END CATCH;
