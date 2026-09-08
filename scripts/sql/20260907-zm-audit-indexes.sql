-- ZM audit: supporting indexes and unique follow-up numbering.
-- Run on the target QLSS database after the ZM module migration.
-- Does not import the supplied dump, delete rows, or change prices/stock.
USE [QLSS];
GO
SET XACT_ABORT ON;
BEGIN TRY
    BEGIN TRANSACTION;

    IF OBJECT_ID(N'dbo.qlss_Zeiss_follow_up', N'U') IS NULL
        THROW 50001, 'Apply the base ZM migration first.', 1;

    IF EXISTS (SELECT quotation_id, follow_up_no FROM dbo.qlss_Zeiss_follow_up GROUP BY quotation_id, follow_up_no HAVING COUNT(*) > 1)
        THROW 50002, 'Duplicate follow-up numbers exist. Review them before applying this patch.', 1;

    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id=OBJECT_ID(N'dbo.qlss_Zeiss_follow_up') AND name=N'UX_ZM_follow_up_number')
        CREATE UNIQUE INDEX UX_ZM_follow_up_number ON dbo.qlss_Zeiss_follow_up(quotation_id, follow_up_no);
    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id=OBJECT_ID(N'dbo.qlss_Zeiss_follow_up') AND name=N'IX_ZM_follow_up_due')
        CREATE INDEX IX_ZM_follow_up_due ON dbo.qlss_Zeiss_follow_up(status, due_on_utc) INCLUDE(quotation_id);
    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id=OBJECT_ID(N'dbo.qlss_Zeiss_enquiry_item') AND name=N'IX_ZM_enquiry_items')
        CREATE INDEX IX_ZM_enquiry_items ON dbo.qlss_Zeiss_enquiry_item(enquiry_id, enquiry_item_id);
    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id=OBJECT_ID(N'dbo.qlss_Zeiss_quotation_item') AND name=N'IX_ZM_quotation_items')
        CREATE INDEX IX_ZM_quotation_items ON dbo.qlss_Zeiss_quotation_item(quotation_id, quotation_item_id);
    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id=OBJECT_ID(N'dbo.qlss_Zeiss_sales_lifecycle_item') AND name=N'IX_ZM_sale_items')
        CREATE INDEX IX_ZM_sale_items ON dbo.qlss_Zeiss_sales_lifecycle_item(lifecycle_id, instrument_id);
    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id=OBJECT_ID(N'dbo.qlss_Zeiss_invoice_item') AND name=N'IX_ZM_invoice_items')
        CREATE INDEX IX_ZM_invoice_items ON dbo.qlss_Zeiss_invoice_item(invoice_id, invoice_item_id);
    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id=OBJECT_ID(N'dbo.qlss_Zeiss_notification') AND name=N'IX_ZM_notification_dedup')
        CREATE INDEX IX_ZM_notification_dedup ON dbo.qlss_Zeiss_notification(instrument_id, notification_type, created_on_utc);
    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id=OBJECT_ID(N'dbo.qlss_Zeiss_attachment') AND name=N'IX_ZM_attachment_entity')
        CREATE INDEX IX_ZM_attachment_entity ON dbo.qlss_Zeiss_attachment(entity_type, entity_id, is_deleted, attachment_id);

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
    THROW;
END CATCH;
GO
