/*
    QLSS PROJECT MANAGEMENT - FINAL SERVER MIGRATION
    Version: 2026-08-09 FINAL (Base FIXED + Complete Flow V2)
    Target: SQL Server 2022+

    PURPOSE
      - One server-side migration containing the complete Project Management SQL structure.
      - Safe for an existing QLSS database.
      - Existing non-Project-Management business rows are not updated, deleted, renamed or reset.
      - Existing dbo.Users rows are never inserted, updated or deleted by this migration.
      - Existing PM master rows are preserved; only missing seed/master rows are inserted.

    SAFETY
      - No DROP TABLE / DROP COLUMN / TRUNCATE / DELETE statements.
      - Creates only missing dbo.qlss_pm_* tables, constraints/indexes and the PM number procedure.
      - Reuses dbo.Users, and optionally existing Client / Training tables through foreign keys.
      - Cross-module records remain in their existing tables and are linked through qlss_pm_module_link.
      - The number generator contains the corrected sp_getapplock implementation.

    BEFORE PRODUCTION EXECUTION
      1. Take a full database backup.
      2. Select the correct QLSS database in SSMS.
      3. Execute this complete file once.
      4. Review the PASS verification output at the end.
*/

SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
SET ANSI_PADDING ON;
SET ANSI_WARNINGS ON;
SET CONCAT_NULL_YIELDS_NULL ON;
SET ARITHABORT ON;
SET NUMERIC_ROUNDABORT OFF;
SET NOCOUNT ON;
SET XACT_ABORT ON;
GO

/* ============================================================
   PRODUCTION PRE-FLIGHT - READ ONLY
   ============================================================ */
IF OBJECT_ID(N'dbo.Users', N'U') IS NULL
    THROW 51900, 'Required table dbo.Users was not found. Migration stopped without changes.', 1;

IF COL_LENGTH(N'dbo.Users', N'Id') IS NULL
   OR COL_LENGTH(N'dbo.Users', N'Role') IS NULL
BEGIN
    THROW 51901, 'dbo.Users does not contain the required Id/Role columns. Migration stopped without changes.', 1;
END;

DECLARE @ExpectedPmColumns TABLE(table_name sysname NOT NULL, column_name sysname NOT NULL);
INSERT @ExpectedPmColumns(table_name,column_name) VALUES
        (N'qlss_pm_role', N'role_code'),
        (N'qlss_pm_role', N'role_name'),
        (N'qlss_pm_role', N'description'),
        (N'qlss_pm_role', N'is_workspace_role'),
        (N'qlss_pm_role', N'is_admin_equivalent'),
        (N'qlss_pm_role', N'is_active'),
        (N'qlss_pm_role', N'created_on_utc'),
        (N'qlss_pm_enquiry_category', N'category_id'),
        (N'qlss_pm_enquiry_category', N'category_code'),
        (N'qlss_pm_enquiry_category', N'category_name'),
        (N'qlss_pm_enquiry_category', N'display_order'),
        (N'qlss_pm_enquiry_category', N'is_active'),
        (N'qlss_pm_enquiry_category', N'created_on_utc'),
        (N'qlss_pm_number_sequence', N'sequence_type'),
        (N'qlss_pm_number_sequence', N'period_key'),
        (N'qlss_pm_number_sequence', N'last_number'),
        (N'qlss_pm_number_sequence', N'updated_on_utc'),
        (N'qlss_pm_enquiry', N'enquiry_id'),
        (N'qlss_pm_enquiry', N'enquiry_no'),
        (N'qlss_pm_enquiry', N'client_id'),
        (N'qlss_pm_enquiry', N'customer_name'),
        (N'qlss_pm_enquiry', N'contact_person'),
        (N'qlss_pm_enquiry', N'email_id'),
        (N'qlss_pm_enquiry', N'contact_number'),
        (N'qlss_pm_enquiry', N'enquiry_date'),
        (N'qlss_pm_enquiry', N'category_id'),
        (N'qlss_pm_enquiry', N'requirement_scope'),
        (N'qlss_pm_enquiry', N'expected_timeline'),
        (N'qlss_pm_enquiry', N'expected_start_date'),
        (N'qlss_pm_enquiry', N'expected_completion_date'),
        (N'qlss_pm_enquiry', N'remarks'),
        (N'qlss_pm_enquiry', N'status'),
        (N'qlss_pm_enquiry', N'created_by_user_id'),
        (N'qlss_pm_enquiry', N'created_on_utc'),
        (N'qlss_pm_enquiry', N'updated_by_user_id'),
        (N'qlss_pm_enquiry', N'updated_on_utc'),
        (N'qlss_pm_enquiry', N'is_deleted'),
        (N'qlss_pm_enquiry_assignee', N'enquiry_assignee_id'),
        (N'qlss_pm_enquiry_assignee', N'enquiry_id'),
        (N'qlss_pm_enquiry_assignee', N'user_id'),
        (N'qlss_pm_enquiry_assignee', N'is_primary'),
        (N'qlss_pm_enquiry_assignee', N'assigned_by_user_id'),
        (N'qlss_pm_enquiry_assignee', N'assigned_on_utc'),
        (N'qlss_pm_enquiry_assignee', N'is_active'),
        (N'qlss_pm_quotation_template', N'quotation_template_id'),
        (N'qlss_pm_quotation_template', N'template_code'),
        (N'qlss_pm_quotation_template', N'template_name'),
        (N'qlss_pm_quotation_template', N'category_id'),
        (N'qlss_pm_quotation_template', N'training_id'),
        (N'qlss_pm_quotation_template', N'scope_template'),
        (N'qlss_pm_quotation_template', N'payment_terms'),
        (N'qlss_pm_quotation_template', N'special_conditions'),
        (N'qlss_pm_quotation_template', N'default_tax_percent'),
        (N'qlss_pm_quotation_template', N'default_validity_days'),
        (N'qlss_pm_quotation_template', N'is_active'),
        (N'qlss_pm_quotation_template', N'created_by_user_id'),
        (N'qlss_pm_quotation_template', N'created_on_utc'),
        (N'qlss_pm_quotation_template', N'updated_by_user_id'),
        (N'qlss_pm_quotation_template', N'updated_on_utc'),
        (N'qlss_pm_quotation', N'quotation_id'),
        (N'qlss_pm_quotation', N'quotation_no'),
        (N'qlss_pm_quotation', N'enquiry_id'),
        (N'qlss_pm_quotation', N'quotation_template_id'),
        (N'qlss_pm_quotation', N'scope'),
        (N'qlss_pm_quotation', N'consulting_days'),
        (N'qlss_pm_quotation', N'number_of_participants'),
        (N'qlss_pm_quotation', N'professional_fees'),
        (N'qlss_pm_quotation', N'travel_accommodation'),
        (N'qlss_pm_quotation', N'tax_percent'),
        (N'qlss_pm_quotation', N'subtotal_amount'),
        (N'qlss_pm_quotation', N'tax_amount'),
        (N'qlss_pm_quotation', N'total_amount'),
        (N'qlss_pm_quotation', N'payment_terms'),
        (N'qlss_pm_quotation', N'validity_days'),
        (N'qlss_pm_quotation', N'special_conditions'),
        (N'qlss_pm_quotation', N'customer_specific_changes'),
        (N'qlss_pm_quotation', N'version_no'),
        (N'qlss_pm_quotation', N'status'),
        (N'qlss_pm_quotation', N'quotation_date'),
        (N'qlss_pm_quotation', N'prepared_by_user_id'),
        (N'qlss_pm_quotation', N'submitted_on_utc'),
        (N'qlss_pm_quotation', N'approved_by_user_id'),
        (N'qlss_pm_quotation', N'approved_on_utc'),
        (N'qlss_pm_quotation', N'decision_remark'),
        (N'qlss_pm_quotation', N'pdf_file_name'),
        (N'qlss_pm_quotation', N'pdf_relative_path'),
        (N'qlss_pm_quotation', N'sent_by_user_id'),
        (N'qlss_pm_quotation', N'sent_on_utc'),
        (N'qlss_pm_quotation', N'created_on_utc'),
        (N'qlss_pm_quotation', N'updated_by_user_id'),
        (N'qlss_pm_quotation', N'updated_on_utc'),
        (N'qlss_pm_quotation', N'is_deleted'),
        (N'qlss_pm_quotation_approval_history', N'approval_history_id'),
        (N'qlss_pm_quotation_approval_history', N'quotation_id'),
        (N'qlss_pm_quotation_approval_history', N'action'),
        (N'qlss_pm_quotation_approval_history', N'from_status'),
        (N'qlss_pm_quotation_approval_history', N'to_status'),
        (N'qlss_pm_quotation_approval_history', N'remark'),
        (N'qlss_pm_quotation_approval_history', N'action_by_user_id'),
        (N'qlss_pm_quotation_approval_history', N'action_on_utc'),
        (N'qlss_pm_follow_up', N'follow_up_id'),
        (N'qlss_pm_follow_up', N'quotation_id'),
        (N'qlss_pm_follow_up', N'follow_up_no'),
        (N'qlss_pm_follow_up', N'due_on_utc'),
        (N'qlss_pm_follow_up', N'status'),
        (N'qlss_pm_follow_up', N'notes'),
        (N'qlss_pm_follow_up', N'completed_by_user_id'),
        (N'qlss_pm_follow_up', N'completed_on_utc'),
        (N'qlss_pm_follow_up', N'created_by_user_id'),
        (N'qlss_pm_follow_up', N'created_on_utc'),
        (N'qlss_pm_project_template', N'project_template_id'),
        (N'qlss_pm_project_template', N'template_code'),
        (N'qlss_pm_project_template', N'template_name'),
        (N'qlss_pm_project_template', N'category_id'),
        (N'qlss_pm_project_template', N'description'),
        (N'qlss_pm_project_template', N'is_active'),
        (N'qlss_pm_project_template', N'created_by_user_id'),
        (N'qlss_pm_project_template', N'created_on_utc'),
        (N'qlss_pm_project_template', N'updated_by_user_id'),
        (N'qlss_pm_project_template', N'updated_on_utc'),
        (N'qlss_pm_project_template_activity', N'template_activity_id'),
        (N'qlss_pm_project_template_activity', N'project_template_id'),
        (N'qlss_pm_project_template_activity', N'sequence_no'),
        (N'qlss_pm_project_template_activity', N'activity_name'),
        (N'qlss_pm_project_template_activity', N'description'),
        (N'qlss_pm_project_template_activity', N'default_duration_days'),
        (N'qlss_pm_project_template_activity', N'is_required'),
        (N'qlss_pm_project_template_activity', N'is_active'),
        (N'qlss_pm_project', N'project_id'),
        (N'qlss_pm_project', N'project_no'),
        (N'qlss_pm_project', N'quotation_id'),
        (N'qlss_pm_project', N'enquiry_id'),
        (N'qlss_pm_project', N'project_template_id'),
        (N'qlss_pm_project', N'client_id'),
        (N'qlss_pm_project', N'customer_name'),
        (N'qlss_pm_project', N'project_title'),
        (N'qlss_pm_project', N'category_id'),
        (N'qlss_pm_project', N'project_start_date'),
        (N'qlss_pm_project', N'target_completion_date'),
        (N'qlss_pm_project', N'actual_completion_date'),
        (N'qlss_pm_project', N'project_value'),
        (N'qlss_pm_project', N'customer_contact_person'),
        (N'qlss_pm_project', N'customer_email'),
        (N'qlss_pm_project', N'project_location'),
        (N'qlss_pm_project', N'po_wo_reference'),
        (N'qlss_pm_project', N'project_leader_user_id'),
        (N'qlss_pm_project', N'status'),
        (N'qlss_pm_project', N'completion_percent'),
        (N'qlss_pm_project', N'remarks'),
        (N'qlss_pm_project', N'closure_requested_by_user_id'),
        (N'qlss_pm_project', N'closure_requested_on_utc'),
        (N'qlss_pm_project', N'closure_approved_by_user_id'),
        (N'qlss_pm_project', N'closure_approved_on_utc'),
        (N'qlss_pm_project', N'closure_remark'),
        (N'qlss_pm_project', N'final_closed_by_user_id'),
        (N'qlss_pm_project', N'final_closed_on_utc'),
        (N'qlss_pm_project', N'created_by_user_id'),
        (N'qlss_pm_project', N'created_on_utc'),
        (N'qlss_pm_project', N'updated_by_user_id'),
        (N'qlss_pm_project', N'updated_on_utc'),
        (N'qlss_pm_project', N'is_deleted'),
        (N'qlss_pm_project_member', N'project_member_id'),
        (N'qlss_pm_project_member', N'project_id'),
        (N'qlss_pm_project_member', N'user_id'),
        (N'qlss_pm_project_member', N'member_role'),
        (N'qlss_pm_project_member', N'assigned_by_user_id'),
        (N'qlss_pm_project_member', N'assigned_on_utc'),
        (N'qlss_pm_project_member', N'is_active'),
        (N'qlss_pm_project_activity', N'activity_id'),
        (N'qlss_pm_project_activity', N'project_id'),
        (N'qlss_pm_project_activity', N'sequence_no'),
        (N'qlss_pm_project_activity', N'activity_name'),
        (N'qlss_pm_project_activity', N'description'),
        (N'qlss_pm_project_activity', N'responsible_user_id'),
        (N'qlss_pm_project_activity', N'planned_start_date'),
        (N'qlss_pm_project_activity', N'planned_completion_date'),
        (N'qlss_pm_project_activity', N'actual_completion_date'),
        (N'qlss_pm_project_activity', N'status'),
        (N'qlss_pm_project_activity', N'remarks'),
        (N'qlss_pm_project_activity', N'is_applicable'),
        (N'qlss_pm_project_activity', N'weight_percent'),
        (N'qlss_pm_project_activity', N'created_by_user_id'),
        (N'qlss_pm_project_activity', N'created_on_utc'),
        (N'qlss_pm_project_activity', N'updated_by_user_id'),
        (N'qlss_pm_project_activity', N'updated_on_utc'),
        (N'qlss_pm_project_activity', N'is_deleted'),
        (N'qlss_pm_notification', N'notification_id'),
        (N'qlss_pm_notification', N'recipient_user_id'),
        (N'qlss_pm_notification', N'notification_type'),
        (N'qlss_pm_notification', N'title'),
        (N'qlss_pm_notification', N'message'),
        (N'qlss_pm_notification', N'entity_type'),
        (N'qlss_pm_notification', N'entity_id'),
        (N'qlss_pm_notification', N'route_url'),
        (N'qlss_pm_notification', N'is_read'),
        (N'qlss_pm_notification', N'read_on_utc'),
        (N'qlss_pm_notification', N'created_on_utc'),
        (N'qlss_pm_email_log', N'email_log_id'),
        (N'qlss_pm_email_log', N'entity_type'),
        (N'qlss_pm_email_log', N'entity_id'),
        (N'qlss_pm_email_log', N'email_type'),
        (N'qlss_pm_email_log', N'recipient_email'),
        (N'qlss_pm_email_log', N'cc_email'),
        (N'qlss_pm_email_log', N'subject'),
        (N'qlss_pm_email_log', N'attachment_name'),
        (N'qlss_pm_email_log', N'quotation_version'),
        (N'qlss_pm_email_log', N'sent_by_user_id'),
        (N'qlss_pm_email_log', N'sent_on_utc'),
        (N'qlss_pm_email_log', N'delivery_status'),
        (N'qlss_pm_email_log', N'error_message'),
        (N'qlss_pm_email_log', N'created_on_utc'),
        (N'qlss_pm_attachment', N'attachment_id'),
        (N'qlss_pm_attachment', N'entity_type'),
        (N'qlss_pm_attachment', N'entity_id'),
        (N'qlss_pm_attachment', N'original_file_name'),
        (N'qlss_pm_attachment', N'stored_file_name'),
        (N'qlss_pm_attachment', N'relative_path'),
        (N'qlss_pm_attachment', N'content_type'),
        (N'qlss_pm_attachment', N'file_size_bytes'),
        (N'qlss_pm_attachment', N'uploaded_by_user_id'),
        (N'qlss_pm_attachment', N'uploaded_on_utc'),
        (N'qlss_pm_attachment', N'is_deleted'),
        (N'qlss_pm_project_acknowledgement', N'acknowledgement_id'),
        (N'qlss_pm_project_acknowledgement', N'project_id'),
        (N'qlss_pm_project_acknowledgement', N'status'),
        (N'qlss_pm_project_acknowledgement', N'generated_on_utc'),
        (N'qlss_pm_project_acknowledgement', N'sent_on_utc'),
        (N'qlss_pm_project_acknowledgement', N'received_on_utc'),
        (N'qlss_pm_project_acknowledgement', N'customer_name'),
        (N'qlss_pm_project_acknowledgement', N'customer_designation'),
        (N'qlss_pm_project_acknowledgement', N'signed_file_name'),
        (N'qlss_pm_project_acknowledgement', N'signed_relative_path'),
        (N'qlss_pm_project_acknowledgement', N'remarks'),
        (N'qlss_pm_project_acknowledgement', N'updated_by_user_id'),
        (N'qlss_pm_project_acknowledgement', N'updated_on_utc'),
        (N'qlss_pm_module_link', N'module_link_id'),
        (N'qlss_pm_module_link', N'project_id'),
        (N'qlss_pm_module_link', N'module_code'),
        (N'qlss_pm_module_link', N'record_id'),
        (N'qlss_pm_module_link', N'record_reference'),
        (N'qlss_pm_module_link', N'remarks'),
        (N'qlss_pm_module_link', N'created_by_user_id'),
        (N'qlss_pm_module_link', N'created_on_utc'),
        (N'qlss_pm_audit_log', N'audit_log_id'),
        (N'qlss_pm_audit_log', N'entity_type'),
        (N'qlss_pm_audit_log', N'entity_id'),
        (N'qlss_pm_audit_log', N'action'),
        (N'qlss_pm_audit_log', N'old_status'),
        (N'qlss_pm_audit_log', N'new_status'),
        (N'qlss_pm_audit_log', N'details'),
        (N'qlss_pm_audit_log', N'action_by_user_id'),
        (N'qlss_pm_audit_log', N'action_on_utc');

IF EXISTS
(
    SELECT 1
    FROM @ExpectedPmColumns e
    WHERE OBJECT_ID(N'dbo.' + e.table_name, N'U') IS NOT NULL
      AND COL_LENGTH(N'dbo.' + e.table_name, e.column_name) IS NULL
)
BEGIN
    SELECT e.table_name AS ExistingTableWithMismatch,
           e.column_name AS MissingRequiredColumn
    FROM @ExpectedPmColumns e
    WHERE OBJECT_ID(N'dbo.' + e.table_name, N'U') IS NOT NULL
      AND COL_LENGTH(N'dbo.' + e.table_name, e.column_name) IS NULL
    ORDER BY e.table_name,e.column_name;

    THROW 51902, 'An existing qlss_pm_* table has an incompatible structure. No migration changes were applied by this run.', 1;
END;

PRINT N'PASS - Production pre-flight compatibility check completed.';
GO

BEGIN TRY
    BEGIN TRANSACTION;

    /* ============================================================
       1. Role catalog (Users.Role remains the source of truth)
       ============================================================ */
    IF OBJECT_ID(N'dbo.qlss_pm_role', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_pm_role
        (
            role_code           nvarchar(30)  NOT NULL CONSTRAINT PK_qlss_pm_role PRIMARY KEY,
            role_name           nvarchar(100) NOT NULL,
            description         nvarchar(500) NULL,
            is_workspace_role   bit           NOT NULL CONSTRAINT DF_qlss_pm_role_workspace DEFAULT (0),
            is_admin_equivalent bit           NOT NULL CONSTRAINT DF_qlss_pm_role_admin DEFAULT (0),
            is_active           bit           NOT NULL CONSTRAINT DF_qlss_pm_role_active DEFAULT (1),
            created_on_utc      datetime2(0)  NOT NULL CONSTRAINT DF_qlss_pm_role_created DEFAULT (SYSUTCDATETIME())
        );
    END;

    /* Insert only missing role catalog rows. Existing role rows are never overwritten. */
    INSERT dbo.qlss_pm_role(role_code, role_name, description, is_workspace_role, is_admin_equivalent)
    SELECT source.role_code, source.role_name, source.description, source.is_workspace_role, source.is_admin_equivalent
    FROM (VALUES
        (N'SuperAdmin', N'Super Admin', N'Full access to current Admin functions and all Project Management functions.', CAST(1 AS bit), CAST(1 AS bit)),
        -- Future Admin PM access: change is_workspace_role back to CAST(1 AS bit).
        (N'Admin',      N'Admin',       N'Existing administrator role. Current non-PM access remains unchanged.', CAST(0 AS bit), CAST(1 AS bit)),
        (N'Manager',    N'Manager',     N'Project/work allocation, monitoring and operational management access.', CAST(1 AS bit), CAST(0 AS bit)),
        (N'Employee',   N'Employee',    N'Assigned project, enquiry and activity execution access.', CAST(1 AS bit), CAST(0 AS bit)),
        (N'User',       N'User',        N'Existing application user role. Existing flow remains unchanged.', CAST(0 AS bit), CAST(0 AS bit))
    ) AS source(role_code, role_name, description, is_workspace_role, is_admin_equivalent)
    WHERE NOT EXISTS
    (
        SELECT 1 FROM dbo.qlss_pm_role target WHERE target.role_code = source.role_code
    );

    /* ============================================================
       2. Master data
       ============================================================ */
    IF OBJECT_ID(N'dbo.qlss_pm_enquiry_category', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_pm_enquiry_category
        (
            category_id     bigint IDENTITY(1,1) NOT NULL CONSTRAINT PK_qlss_pm_enquiry_category PRIMARY KEY,
            category_code   nvarchar(50) NOT NULL,
            category_name   nvarchar(150) NOT NULL,
            display_order   int NOT NULL CONSTRAINT DF_qlss_pm_category_order DEFAULT (0),
            is_active       bit NOT NULL CONSTRAINT DF_qlss_pm_category_active DEFAULT (1),
            created_on_utc  datetime2(0) NOT NULL CONSTRAINT DF_qlss_pm_category_created DEFAULT (SYSUTCDATETIME()),
            CONSTRAINT UQ_qlss_pm_enquiry_category_code UNIQUE (category_code)
        );
    END;

    /* Insert only missing enquiry categories. Existing category rows are never overwritten. */
    INSERT dbo.qlss_pm_enquiry_category(category_code, category_name, display_order)
    SELECT source.category_code, source.category_name, source.display_order
    FROM (VALUES
        (N'TRAINING',              N'Training',               10),
        (N'ISO_IMPLEMENTATION',    N'ISO Implementation',     20),
        (N'IMS_IMPLEMENTATION',    N'IMS Implementation',     30),
        (N'INTERNAL_AUDIT',        N'Internal Audit',          40),
        (N'SUPPLIER_AUDIT',        N'Supplier Audit',          50),
        (N'PROCESS_AUDIT',         N'Process Audit',           60),
        (N'PRODUCT_AUDIT',         N'Product Audit',           70),
        (N'GAP_ASSESSMENT',        N'Gap Assessment',          80),
        (N'DOCUMENTATION_SUPPORT', N'Documentation Support',   90),
        (N'CERTIFICATION_SUPPORT', N'Certification Support',  100),
        (N'CONSULTANCY',           N'Consultancy',            110),
        (N'OTHER',                 N'Other Services',         120)
    ) AS source(category_code, category_name, display_order)
    WHERE NOT EXISTS
    (
        SELECT 1 FROM dbo.qlss_pm_enquiry_category target WHERE target.category_code = source.category_code
    );

    /* ============================================================
       3. Number sequence
       ============================================================ */
    IF OBJECT_ID(N'dbo.qlss_pm_number_sequence', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_pm_number_sequence
        (
            sequence_type  nvarchar(30) NOT NULL,
            period_key     char(4)      NOT NULL,
            last_number    int          NOT NULL,
            updated_on_utc datetime2(0) NOT NULL,
            CONSTRAINT PK_qlss_pm_number_sequence PRIMARY KEY (sequence_type, period_key)
        );
    END;

    /* ============================================================
       4. Enquiry
       ============================================================ */
    IF OBJECT_ID(N'dbo.qlss_pm_enquiry', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_pm_enquiry
        (
            enquiry_id                bigint IDENTITY(1,1) NOT NULL CONSTRAINT PK_qlss_pm_enquiry PRIMARY KEY,
            enquiry_no                nvarchar(40) NOT NULL,
            client_id                 bigint NULL,
            customer_name             nvarchar(250) NOT NULL,
            contact_person            nvarchar(200) NULL,
            email_id                  nvarchar(250) NULL,
            contact_number            nvarchar(50) NULL,
            enquiry_date              date NOT NULL,
            category_id               bigint NOT NULL,
            requirement_scope         nvarchar(max) NOT NULL,
            expected_timeline         nvarchar(250) NULL,
            expected_start_date       date NULL,
            expected_completion_date  date NULL,
            remarks                   nvarchar(2000) NULL,
            status                    nvarchar(50) NOT NULL CONSTRAINT DF_qlss_pm_enquiry_status DEFAULT (N'Enquiry Received'),
            created_by_user_id        int NOT NULL,
            created_on_utc            datetime2(0) NOT NULL CONSTRAINT DF_qlss_pm_enquiry_created DEFAULT (SYSUTCDATETIME()),
            updated_by_user_id        int NULL,
            updated_on_utc            datetime2(0) NULL,
            is_deleted                bit NOT NULL CONSTRAINT DF_qlss_pm_enquiry_deleted DEFAULT (0),
            CONSTRAINT UQ_qlss_pm_enquiry_no UNIQUE (enquiry_no),
            CONSTRAINT FK_qlss_pm_enquiry_category FOREIGN KEY (category_id) REFERENCES dbo.qlss_pm_enquiry_category(category_id),
            CONSTRAINT FK_qlss_pm_enquiry_created_by FOREIGN KEY (created_by_user_id) REFERENCES dbo.Users(Id),
            CONSTRAINT FK_qlss_pm_enquiry_updated_by FOREIGN KEY (updated_by_user_id) REFERENCES dbo.Users(Id)
        );
    END;

    IF OBJECT_ID(N'dbo.qlss_pm_enquiry_assignee', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_pm_enquiry_assignee
        (
            enquiry_assignee_id bigint IDENTITY(1,1) NOT NULL CONSTRAINT PK_qlss_pm_enquiry_assignee PRIMARY KEY,
            enquiry_id          bigint NOT NULL,
            user_id             int NOT NULL,
            is_primary          bit NOT NULL CONSTRAINT DF_qlss_pm_enq_assignee_primary DEFAULT (0),
            assigned_by_user_id int NOT NULL,
            assigned_on_utc     datetime2(0) NOT NULL CONSTRAINT DF_qlss_pm_enq_assignee_created DEFAULT (SYSUTCDATETIME()),
            is_active           bit NOT NULL CONSTRAINT DF_qlss_pm_enq_assignee_active DEFAULT (1),
            CONSTRAINT FK_qlss_pm_enq_assignee_enquiry FOREIGN KEY (enquiry_id) REFERENCES dbo.qlss_pm_enquiry(enquiry_id),
            CONSTRAINT FK_qlss_pm_enq_assignee_user FOREIGN KEY (user_id) REFERENCES dbo.Users(Id),
            CONSTRAINT FK_qlss_pm_enq_assignee_by FOREIGN KEY (assigned_by_user_id) REFERENCES dbo.Users(Id)
        );
    END;

    /* ============================================================
       5. Quotation templates and quotation workflow
       ============================================================ */
    IF OBJECT_ID(N'dbo.qlss_pm_quotation_template', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_pm_quotation_template
        (
            quotation_template_id bigint IDENTITY(1,1) NOT NULL CONSTRAINT PK_qlss_pm_quotation_template PRIMARY KEY,
            template_code         nvarchar(60) NOT NULL,
            template_name         nvarchar(200) NOT NULL,
            category_id           bigint NULL,
            training_id           bigint NULL,
            scope_template        nvarchar(max) NULL,
            payment_terms         nvarchar(1000) NULL,
            special_conditions    nvarchar(2000) NULL,
            default_tax_percent   decimal(5,2) NOT NULL CONSTRAINT DF_qlss_pm_qt_tax DEFAULT (18.00),
            default_validity_days int NOT NULL CONSTRAINT DF_qlss_pm_qt_validity DEFAULT (30),
            is_active             bit NOT NULL CONSTRAINT DF_qlss_pm_qt_active DEFAULT (1),
            created_by_user_id    int NULL,
            created_on_utc        datetime2(0) NOT NULL CONSTRAINT DF_qlss_pm_qt_created DEFAULT (SYSUTCDATETIME()),
            updated_by_user_id    int NULL,
            updated_on_utc        datetime2(0) NULL,
            CONSTRAINT UQ_qlss_pm_quotation_template_code UNIQUE (template_code),
            CONSTRAINT FK_qlss_pm_qt_category FOREIGN KEY (category_id) REFERENCES dbo.qlss_pm_enquiry_category(category_id),
            CONSTRAINT FK_qlss_pm_qt_created_by FOREIGN KEY (created_by_user_id) REFERENCES dbo.Users(Id),
            CONSTRAINT FK_qlss_pm_qt_updated_by FOREIGN KEY (updated_by_user_id) REFERENCES dbo.Users(Id)
        );
    END;

    IF OBJECT_ID(N'dbo.qlss_pm_quotation', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_pm_quotation
        (
            quotation_id            bigint IDENTITY(1,1) NOT NULL CONSTRAINT PK_qlss_pm_quotation PRIMARY KEY,
            quotation_no            nvarchar(40) NOT NULL,
            enquiry_id              bigint NOT NULL,
            quotation_template_id   bigint NULL,
            scope                   nvarchar(max) NOT NULL,
            consulting_days         decimal(10,2) NULL,
            number_of_participants  int NULL,
            professional_fees       decimal(18,2) NOT NULL CONSTRAINT DF_qlss_pm_quote_fees DEFAULT (0),
            travel_accommodation    decimal(18,2) NOT NULL CONSTRAINT DF_qlss_pm_quote_travel DEFAULT (0),
            tax_percent             decimal(5,2) NOT NULL CONSTRAINT DF_qlss_pm_quote_tax DEFAULT (18.00),
            subtotal_amount         decimal(18,2) NOT NULL CONSTRAINT DF_qlss_pm_quote_subtotal DEFAULT (0),
            tax_amount              decimal(18,2) NOT NULL CONSTRAINT DF_qlss_pm_quote_taxamount DEFAULT (0),
            total_amount            decimal(18,2) NOT NULL CONSTRAINT DF_qlss_pm_quote_total DEFAULT (0),
            payment_terms           nvarchar(1000) NULL,
            validity_days           int NOT NULL CONSTRAINT DF_qlss_pm_quote_validity DEFAULT (30),
            special_conditions      nvarchar(2000) NULL,
            customer_specific_changes nvarchar(2000) NULL,
            version_no              int NOT NULL CONSTRAINT DF_qlss_pm_quote_version DEFAULT (1),
            status                  nvarchar(50) NOT NULL CONSTRAINT DF_qlss_pm_quote_status DEFAULT (N'Draft Quotation'),
            quotation_date          date NOT NULL,
            prepared_by_user_id     int NOT NULL,
            submitted_on_utc        datetime2(0) NULL,
            approved_by_user_id     int NULL,
            approved_on_utc         datetime2(0) NULL,
            decision_remark         nvarchar(2000) NULL,
            pdf_file_name           nvarchar(260) NULL,
            pdf_relative_path       nvarchar(1000) NULL,
            sent_by_user_id         int NULL,
            sent_on_utc             datetime2(0) NULL,
            created_on_utc          datetime2(0) NOT NULL CONSTRAINT DF_qlss_pm_quote_created DEFAULT (SYSUTCDATETIME()),
            updated_by_user_id      int NULL,
            updated_on_utc          datetime2(0) NULL,
            is_deleted              bit NOT NULL CONSTRAINT DF_qlss_pm_quote_deleted DEFAULT (0),
            CONSTRAINT UQ_qlss_pm_quotation_no UNIQUE (quotation_no),
            CONSTRAINT FK_qlss_pm_quote_enquiry FOREIGN KEY (enquiry_id) REFERENCES dbo.qlss_pm_enquiry(enquiry_id),
            CONSTRAINT FK_qlss_pm_quote_template FOREIGN KEY (quotation_template_id) REFERENCES dbo.qlss_pm_quotation_template(quotation_template_id),
            CONSTRAINT FK_qlss_pm_quote_prepared_by FOREIGN KEY (prepared_by_user_id) REFERENCES dbo.Users(Id),
            CONSTRAINT FK_qlss_pm_quote_approved_by FOREIGN KEY (approved_by_user_id) REFERENCES dbo.Users(Id),
            CONSTRAINT FK_qlss_pm_quote_sent_by FOREIGN KEY (sent_by_user_id) REFERENCES dbo.Users(Id),
            CONSTRAINT FK_qlss_pm_quote_updated_by FOREIGN KEY (updated_by_user_id) REFERENCES dbo.Users(Id)
        );
    END;

    IF OBJECT_ID(N'dbo.qlss_pm_quotation_approval_history', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_pm_quotation_approval_history
        (
            approval_history_id bigint IDENTITY(1,1) NOT NULL CONSTRAINT PK_qlss_pm_quote_approval_history PRIMARY KEY,
            quotation_id        bigint NOT NULL,
            action              nvarchar(30) NOT NULL,
            from_status         nvarchar(50) NULL,
            to_status           nvarchar(50) NOT NULL,
            remark              nvarchar(2000) NULL,
            action_by_user_id   int NOT NULL,
            action_on_utc       datetime2(0) NOT NULL CONSTRAINT DF_qlss_pm_quote_hist_created DEFAULT (SYSUTCDATETIME()),
            CONSTRAINT FK_qlss_pm_quote_hist_quote FOREIGN KEY (quotation_id) REFERENCES dbo.qlss_pm_quotation(quotation_id),
            CONSTRAINT FK_qlss_pm_quote_hist_user FOREIGN KEY (action_by_user_id) REFERENCES dbo.Users(Id)
        );
    END;

    IF OBJECT_ID(N'dbo.qlss_pm_follow_up', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_pm_follow_up
        (
            follow_up_id        bigint IDENTITY(1,1) NOT NULL CONSTRAINT PK_qlss_pm_follow_up PRIMARY KEY,
            quotation_id        bigint NOT NULL,
            follow_up_no        int NOT NULL CONSTRAINT DF_qlss_pm_follow_no DEFAULT (1),
            due_on_utc          datetime2(0) NOT NULL,
            status              nvarchar(30) NOT NULL CONSTRAINT DF_qlss_pm_follow_status DEFAULT (N'Pending'),
            notes               nvarchar(2000) NULL,
            completed_by_user_id int NULL,
            completed_on_utc    datetime2(0) NULL,
            created_by_user_id  int NULL,
            created_on_utc      datetime2(0) NOT NULL CONSTRAINT DF_qlss_pm_follow_created DEFAULT (SYSUTCDATETIME()),
            CONSTRAINT FK_qlss_pm_follow_quote FOREIGN KEY (quotation_id) REFERENCES dbo.qlss_pm_quotation(quotation_id),
            CONSTRAINT FK_qlss_pm_follow_completed_by FOREIGN KEY (completed_by_user_id) REFERENCES dbo.Users(Id),
            CONSTRAINT FK_qlss_pm_follow_created_by FOREIGN KEY (created_by_user_id) REFERENCES dbo.Users(Id)
        );
    END;

    /* ============================================================
       6. Project templates, projects and activities
       ============================================================ */
    IF OBJECT_ID(N'dbo.qlss_pm_project_template', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_pm_project_template
        (
            project_template_id bigint IDENTITY(1,1) NOT NULL CONSTRAINT PK_qlss_pm_project_template PRIMARY KEY,
            template_code       nvarchar(60) NOT NULL,
            template_name       nvarchar(200) NOT NULL,
            category_id         bigint NULL,
            description         nvarchar(1000) NULL,
            is_active           bit NOT NULL CONSTRAINT DF_qlss_pm_pt_active DEFAULT (1),
            created_by_user_id  int NULL,
            created_on_utc      datetime2(0) NOT NULL CONSTRAINT DF_qlss_pm_pt_created DEFAULT (SYSUTCDATETIME()),
            updated_by_user_id  int NULL,
            updated_on_utc      datetime2(0) NULL,
            CONSTRAINT UQ_qlss_pm_project_template_code UNIQUE (template_code),
            CONSTRAINT FK_qlss_pm_pt_category FOREIGN KEY (category_id) REFERENCES dbo.qlss_pm_enquiry_category(category_id),
            CONSTRAINT FK_qlss_pm_pt_created_by FOREIGN KEY (created_by_user_id) REFERENCES dbo.Users(Id),
            CONSTRAINT FK_qlss_pm_pt_updated_by FOREIGN KEY (updated_by_user_id) REFERENCES dbo.Users(Id)
        );
    END;

    IF OBJECT_ID(N'dbo.qlss_pm_project_template_activity', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_pm_project_template_activity
        (
            template_activity_id bigint IDENTITY(1,1) NOT NULL CONSTRAINT PK_qlss_pm_project_template_activity PRIMARY KEY,
            project_template_id  bigint NOT NULL,
            sequence_no          int NOT NULL,
            activity_name        nvarchar(250) NOT NULL,
            description          nvarchar(1000) NULL,
            default_duration_days int NULL,
            is_required          bit NOT NULL CONSTRAINT DF_qlss_pm_pta_required DEFAULT (1),
            is_active            bit NOT NULL CONSTRAINT DF_qlss_pm_pta_active DEFAULT (1),
            CONSTRAINT FK_qlss_pm_pta_template FOREIGN KEY (project_template_id) REFERENCES dbo.qlss_pm_project_template(project_template_id)
        );
    END;

    IF OBJECT_ID(N'dbo.qlss_pm_project', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_pm_project
        (
            project_id               bigint IDENTITY(1,1) NOT NULL CONSTRAINT PK_qlss_pm_project PRIMARY KEY,
            project_no               nvarchar(60) NOT NULL,
            quotation_id             bigint NULL,
            enquiry_id               bigint NULL,
            project_template_id      bigint NULL,
            client_id                bigint NULL,
            customer_name            nvarchar(250) NOT NULL,
            project_title            nvarchar(500) NOT NULL,
            category_id              bigint NULL,
            project_start_date       date NULL,
            target_completion_date   date NULL,
            actual_completion_date   date NULL,
            project_value            decimal(18,2) NOT NULL CONSTRAINT DF_qlss_pm_project_value DEFAULT (0),
            customer_contact_person  nvarchar(200) NULL,
            customer_email           nvarchar(250) NULL,
            project_location         nvarchar(500) NULL,
            po_wo_reference          nvarchar(200) NULL,
            project_leader_user_id   int NULL,
            status                   nvarchar(50) NOT NULL CONSTRAINT DF_qlss_pm_project_status DEFAULT (N'Project Confirmed'),
            completion_percent       decimal(5,2) NOT NULL CONSTRAINT DF_qlss_pm_project_completion DEFAULT (0),
            remarks                  nvarchar(2000) NULL,
            closure_requested_by_user_id int NULL,
            closure_requested_on_utc datetime2(0) NULL,
            closure_approved_by_user_id int NULL,
            closure_approved_on_utc  datetime2(0) NULL,
            closure_remark           nvarchar(2000) NULL,
            final_closed_by_user_id  int NULL,
            final_closed_on_utc      datetime2(0) NULL,
            created_by_user_id       int NOT NULL,
            created_on_utc           datetime2(0) NOT NULL CONSTRAINT DF_qlss_pm_project_created DEFAULT (SYSUTCDATETIME()),
            updated_by_user_id       int NULL,
            updated_on_utc           datetime2(0) NULL,
            is_deleted               bit NOT NULL CONSTRAINT DF_qlss_pm_project_deleted DEFAULT (0),
            CONSTRAINT UQ_qlss_pm_project_no UNIQUE (project_no),
            CONSTRAINT FK_qlss_pm_project_quote FOREIGN KEY (quotation_id) REFERENCES dbo.qlss_pm_quotation(quotation_id),
            CONSTRAINT FK_qlss_pm_project_enquiry FOREIGN KEY (enquiry_id) REFERENCES dbo.qlss_pm_enquiry(enquiry_id),
            CONSTRAINT FK_qlss_pm_project_template FOREIGN KEY (project_template_id) REFERENCES dbo.qlss_pm_project_template(project_template_id),
            CONSTRAINT FK_qlss_pm_project_category FOREIGN KEY (category_id) REFERENCES dbo.qlss_pm_enquiry_category(category_id),
            CONSTRAINT FK_qlss_pm_project_leader FOREIGN KEY (project_leader_user_id) REFERENCES dbo.Users(Id),
            CONSTRAINT FK_qlss_pm_project_created_by FOREIGN KEY (created_by_user_id) REFERENCES dbo.Users(Id),
            CONSTRAINT FK_qlss_pm_project_updated_by FOREIGN KEY (updated_by_user_id) REFERENCES dbo.Users(Id),
            CONSTRAINT FK_qlss_pm_project_closure_requested_by FOREIGN KEY (closure_requested_by_user_id) REFERENCES dbo.Users(Id),
            CONSTRAINT FK_qlss_pm_project_closure_approved_by FOREIGN KEY (closure_approved_by_user_id) REFERENCES dbo.Users(Id),
            CONSTRAINT FK_qlss_pm_project_closed_by FOREIGN KEY (final_closed_by_user_id) REFERENCES dbo.Users(Id)
        );
    END;

    IF OBJECT_ID(N'dbo.qlss_pm_project_member', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_pm_project_member
        (
            project_member_id  bigint IDENTITY(1,1) NOT NULL CONSTRAINT PK_qlss_pm_project_member PRIMARY KEY,
            project_id         bigint NOT NULL,
            user_id            int NOT NULL,
            member_role        nvarchar(80) NULL,
            assigned_by_user_id int NOT NULL,
            assigned_on_utc    datetime2(0) NOT NULL CONSTRAINT DF_qlss_pm_project_member_created DEFAULT (SYSUTCDATETIME()),
            is_active          bit NOT NULL CONSTRAINT DF_qlss_pm_project_member_active DEFAULT (1),
            CONSTRAINT FK_qlss_pm_project_member_project FOREIGN KEY (project_id) REFERENCES dbo.qlss_pm_project(project_id),
            CONSTRAINT FK_qlss_pm_project_member_user FOREIGN KEY (user_id) REFERENCES dbo.Users(Id),
            CONSTRAINT FK_qlss_pm_project_member_assigned_by FOREIGN KEY (assigned_by_user_id) REFERENCES dbo.Users(Id)
        );
    END;

    IF OBJECT_ID(N'dbo.qlss_pm_project_activity', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_pm_project_activity
        (
            activity_id             bigint IDENTITY(1,1) NOT NULL CONSTRAINT PK_qlss_pm_project_activity PRIMARY KEY,
            project_id              bigint NOT NULL,
            sequence_no             int NOT NULL,
            activity_name           nvarchar(250) NOT NULL,
            description             nvarchar(1000) NULL,
            responsible_user_id     int NULL,
            planned_start_date      date NULL,
            planned_completion_date date NULL,
            actual_completion_date  date NULL,
            status                  nvarchar(30) NOT NULL CONSTRAINT DF_qlss_pm_activity_status DEFAULT (N'Not Started'),
            remarks                 nvarchar(2000) NULL,
            is_applicable           bit NOT NULL CONSTRAINT DF_qlss_pm_activity_applicable DEFAULT (1),
            weight_percent          decimal(5,2) NULL,
            created_by_user_id      int NOT NULL,
            created_on_utc          datetime2(0) NOT NULL CONSTRAINT DF_qlss_pm_activity_created DEFAULT (SYSUTCDATETIME()),
            updated_by_user_id      int NULL,
            updated_on_utc          datetime2(0) NULL,
            is_deleted              bit NOT NULL CONSTRAINT DF_qlss_pm_activity_deleted DEFAULT (0),
            CONSTRAINT FK_qlss_pm_activity_project FOREIGN KEY (project_id) REFERENCES dbo.qlss_pm_project(project_id),
            CONSTRAINT FK_qlss_pm_activity_responsible FOREIGN KEY (responsible_user_id) REFERENCES dbo.Users(Id),
            CONSTRAINT FK_qlss_pm_activity_created_by FOREIGN KEY (created_by_user_id) REFERENCES dbo.Users(Id),
            CONSTRAINT FK_qlss_pm_activity_updated_by FOREIGN KEY (updated_by_user_id) REFERENCES dbo.Users(Id)
        );
    END;

    /* ============================================================
       7. Notifications, email log, files, acknowledgement, module link, audit
       ============================================================ */
    IF OBJECT_ID(N'dbo.qlss_pm_notification', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_pm_notification
        (
            notification_id     bigint IDENTITY(1,1) NOT NULL CONSTRAINT PK_qlss_pm_notification PRIMARY KEY,
            recipient_user_id   int NOT NULL,
            notification_type   nvarchar(80) NOT NULL,
            title               nvarchar(250) NOT NULL,
            message             nvarchar(1000) NULL,
            entity_type         nvarchar(50) NULL,
            entity_id           bigint NULL,
            route_url           nvarchar(500) NULL,
            is_read             bit NOT NULL CONSTRAINT DF_qlss_pm_notification_read DEFAULT (0),
            read_on_utc         datetime2(0) NULL,
            created_on_utc      datetime2(0) NOT NULL CONSTRAINT DF_qlss_pm_notification_created DEFAULT (SYSUTCDATETIME()),
            CONSTRAINT FK_qlss_pm_notification_user FOREIGN KEY (recipient_user_id) REFERENCES dbo.Users(Id)
        );
    END;

    IF OBJECT_ID(N'dbo.qlss_pm_email_log', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_pm_email_log
        (
            email_log_id        bigint IDENTITY(1,1) NOT NULL CONSTRAINT PK_qlss_pm_email_log PRIMARY KEY,
            entity_type         nvarchar(50) NOT NULL,
            entity_id           bigint NOT NULL,
            email_type          nvarchar(80) NOT NULL,
            recipient_email     nvarchar(500) NOT NULL,
            cc_email            nvarchar(1000) NULL,
            subject             nvarchar(500) NOT NULL,
            attachment_name     nvarchar(260) NULL,
            quotation_version   int NULL,
            sent_by_user_id     int NULL,
            sent_on_utc         datetime2(0) NULL,
            delivery_status     nvarchar(30) NOT NULL,
            error_message       nvarchar(2000) NULL,
            created_on_utc      datetime2(0) NOT NULL CONSTRAINT DF_qlss_pm_email_log_created DEFAULT (SYSUTCDATETIME()),
            CONSTRAINT FK_qlss_pm_email_log_user FOREIGN KEY (sent_by_user_id) REFERENCES dbo.Users(Id)
        );
    END;

    IF OBJECT_ID(N'dbo.qlss_pm_attachment', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_pm_attachment
        (
            attachment_id       bigint IDENTITY(1,1) NOT NULL CONSTRAINT PK_qlss_pm_attachment PRIMARY KEY,
            entity_type         nvarchar(50) NOT NULL,
            entity_id           bigint NOT NULL,
            original_file_name  nvarchar(260) NOT NULL,
            stored_file_name    nvarchar(260) NOT NULL,
            relative_path       nvarchar(1000) NOT NULL,
            content_type        nvarchar(150) NULL,
            file_size_bytes     bigint NOT NULL,
            uploaded_by_user_id int NOT NULL,
            uploaded_on_utc     datetime2(0) NOT NULL CONSTRAINT DF_qlss_pm_attachment_created DEFAULT (SYSUTCDATETIME()),
            is_deleted          bit NOT NULL CONSTRAINT DF_qlss_pm_attachment_deleted DEFAULT (0),
            CONSTRAINT FK_qlss_pm_attachment_user FOREIGN KEY (uploaded_by_user_id) REFERENCES dbo.Users(Id)
        );
    END;

    IF OBJECT_ID(N'dbo.qlss_pm_project_acknowledgement', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_pm_project_acknowledgement
        (
            acknowledgement_id bigint IDENTITY(1,1) NOT NULL CONSTRAINT PK_qlss_pm_project_ack PRIMARY KEY,
            project_id          bigint NOT NULL,
            status              nvarchar(40) NOT NULL CONSTRAINT DF_qlss_pm_ack_status DEFAULT (N'Pending'),
            generated_on_utc    datetime2(0) NULL,
            sent_on_utc         datetime2(0) NULL,
            received_on_utc     datetime2(0) NULL,
            customer_name       nvarchar(250) NULL,
            customer_designation nvarchar(200) NULL,
            signed_file_name    nvarchar(260) NULL,
            signed_relative_path nvarchar(1000) NULL,
            remarks             nvarchar(2000) NULL,
            updated_by_user_id  int NULL,
            updated_on_utc      datetime2(0) NULL,
            CONSTRAINT FK_qlss_pm_ack_project FOREIGN KEY (project_id) REFERENCES dbo.qlss_pm_project(project_id),
            CONSTRAINT FK_qlss_pm_ack_user FOREIGN KEY (updated_by_user_id) REFERENCES dbo.Users(Id)
        );
    END;

    IF OBJECT_ID(N'dbo.qlss_pm_module_link', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_pm_module_link
        (
            module_link_id      bigint IDENTITY(1,1) NOT NULL CONSTRAINT PK_qlss_pm_module_link PRIMARY KEY,
            project_id          bigint NOT NULL,
            module_code         nvarchar(50) NOT NULL,
            record_id           nvarchar(100) NOT NULL,
            record_reference    nvarchar(250) NULL,
            remarks             nvarchar(1000) NULL,
            created_by_user_id  int NOT NULL,
            created_on_utc      datetime2(0) NOT NULL CONSTRAINT DF_qlss_pm_module_link_created DEFAULT (SYSUTCDATETIME()),
            CONSTRAINT FK_qlss_pm_module_link_project FOREIGN KEY (project_id) REFERENCES dbo.qlss_pm_project(project_id),
            CONSTRAINT FK_qlss_pm_module_link_user FOREIGN KEY (created_by_user_id) REFERENCES dbo.Users(Id)
        );
    END;

    IF OBJECT_ID(N'dbo.qlss_pm_audit_log', N'U') IS NULL
    BEGIN
        CREATE TABLE dbo.qlss_pm_audit_log
        (
            audit_log_id        bigint IDENTITY(1,1) NOT NULL CONSTRAINT PK_qlss_pm_audit_log PRIMARY KEY,
            entity_type         nvarchar(50) NOT NULL,
            entity_id           bigint NOT NULL,
            action              nvarchar(80) NOT NULL,
            old_status          nvarchar(50) NULL,
            new_status          nvarchar(50) NULL,
            details             nvarchar(max) NULL,
            action_by_user_id   int NULL,
            action_on_utc       datetime2(0) NOT NULL CONSTRAINT DF_qlss_pm_audit_created DEFAULT (SYSUTCDATETIME()),
            CONSTRAINT FK_qlss_pm_audit_user FOREIGN KEY (action_by_user_id) REFERENCES dbo.Users(Id)
        );
    END;

    /* ============================================================
       8. Optional links to existing Client / Training tables
       ============================================================ */
    IF OBJECT_ID(N'dbo.Client', N'U') IS NOT NULL
       AND NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = N'FK_qlss_pm_enquiry_client')
    BEGIN
        ALTER TABLE dbo.qlss_pm_enquiry WITH CHECK
            ADD CONSTRAINT FK_qlss_pm_enquiry_client FOREIGN KEY (client_id) REFERENCES dbo.Client(ClientId);
    END;

    IF OBJECT_ID(N'dbo.Client', N'U') IS NOT NULL
       AND NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = N'FK_qlss_pm_project_client')
    BEGIN
        ALTER TABLE dbo.qlss_pm_project WITH CHECK
            ADD CONSTRAINT FK_qlss_pm_project_client FOREIGN KEY (client_id) REFERENCES dbo.Client(ClientId);
    END;

    IF OBJECT_ID(N'dbo.Training', N'U') IS NOT NULL
       AND NOT EXISTS (SELECT 1 FROM sys.foreign_keys WHERE name = N'FK_qlss_pm_qt_training')
    BEGIN
        ALTER TABLE dbo.qlss_pm_quotation_template WITH CHECK
            ADD CONSTRAINT FK_qlss_pm_qt_training FOREIGN KEY (training_id) REFERENCES dbo.Training(TrainingId);
    END;

    /* ============================================================
       9. Indexes
       ============================================================ */
    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(N'dbo.qlss_pm_enquiry') AND name = N'IX_qlss_pm_enquiry_status_date')
        CREATE INDEX IX_qlss_pm_enquiry_status_date ON dbo.qlss_pm_enquiry(status, enquiry_date) INCLUDE (customer_name, category_id, created_by_user_id) WHERE is_deleted = 0;

    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(N'dbo.qlss_pm_enquiry_assignee') AND name = N'IX_qlss_pm_enquiry_assignee_user')
        CREATE INDEX IX_qlss_pm_enquiry_assignee_user ON dbo.qlss_pm_enquiry_assignee(user_id, is_active) INCLUDE (enquiry_id);

    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(N'dbo.qlss_pm_quotation') AND name = N'IX_qlss_pm_quotation_status')
        CREATE INDEX IX_qlss_pm_quotation_status ON dbo.qlss_pm_quotation(status, quotation_date) INCLUDE (enquiry_id, total_amount, prepared_by_user_id) WHERE is_deleted = 0;

    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(N'dbo.qlss_pm_follow_up') AND name = N'IX_qlss_pm_follow_up_due')
        CREATE INDEX IX_qlss_pm_follow_up_due ON dbo.qlss_pm_follow_up(status, due_on_utc) INCLUDE (quotation_id);

    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(N'dbo.qlss_pm_project') AND name = N'IX_qlss_pm_project_status_target')
        CREATE INDEX IX_qlss_pm_project_status_target ON dbo.qlss_pm_project(status, target_completion_date) INCLUDE (project_leader_user_id, completion_percent, project_value) WHERE is_deleted = 0;

    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(N'dbo.qlss_pm_project_activity') AND name = N'IX_qlss_pm_activity_project_status')
        CREATE INDEX IX_qlss_pm_activity_project_status ON dbo.qlss_pm_project_activity(project_id, status, planned_completion_date) INCLUDE (responsible_user_id, is_applicable) WHERE is_deleted = 0;

    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(N'dbo.qlss_pm_notification') AND name = N'IX_qlss_pm_notification_user_read')
        CREATE INDEX IX_qlss_pm_notification_user_read ON dbo.qlss_pm_notification(recipient_user_id, is_read, created_on_utc DESC);

    IF NOT EXISTS (SELECT 1 FROM sys.indexes WHERE object_id = OBJECT_ID(N'dbo.qlss_pm_attachment') AND name = N'IX_qlss_pm_attachment_entity')
        CREATE INDEX IX_qlss_pm_attachment_entity ON dbo.qlss_pm_attachment(entity_type, entity_id, is_deleted);

    /* ============================================================
       10. Starter project templates from the approved workflow
       ============================================================ */
    DECLARE @TrainingCategoryId bigint = (SELECT category_id FROM dbo.qlss_pm_enquiry_category WHERE category_code = N'TRAINING');
    DECLARE @IsoCategoryId bigint = (SELECT category_id FROM dbo.qlss_pm_enquiry_category WHERE category_code = N'ISO_IMPLEMENTATION');
    DECLARE @AuditCategoryId bigint = (SELECT category_id FROM dbo.qlss_pm_enquiry_category WHERE category_code = N'INTERNAL_AUDIT');

    IF NOT EXISTS (SELECT 1 FROM dbo.qlss_pm_project_template WHERE template_code = N'TRAINING_PROJECT')
        INSERT dbo.qlss_pm_project_template(template_code, template_name, category_id, description)
        VALUES (N'TRAINING_PROJECT', N'Training Project', @TrainingCategoryId, N'Standard training delivery activity template.');

    IF NOT EXISTS (SELECT 1 FROM dbo.qlss_pm_project_template WHERE template_code = N'ISO_IMPLEMENTATION_PROJECT')
        INSERT dbo.qlss_pm_project_template(template_code, template_name, category_id, description)
        VALUES (N'ISO_IMPLEMENTATION_PROJECT', N'ISO Implementation Project', @IsoCategoryId, N'Standard implementation project activity template.');

    IF NOT EXISTS (SELECT 1 FROM dbo.qlss_pm_project_template WHERE template_code = N'AUDIT_PROJECT')
        INSERT dbo.qlss_pm_project_template(template_code, template_name, category_id, description)
        VALUES (N'AUDIT_PROJECT', N'Audit Project', @AuditCategoryId, N'Standard audit project activity template.');

    DECLARE @TrainingTemplateId bigint = (SELECT project_template_id FROM dbo.qlss_pm_project_template WHERE template_code = N'TRAINING_PROJECT');
    DECLARE @AuditTemplateId bigint = (SELECT project_template_id FROM dbo.qlss_pm_project_template WHERE template_code = N'AUDIT_PROJECT');

    IF NOT EXISTS (SELECT 1 FROM dbo.qlss_pm_project_template_activity WHERE project_template_id = @TrainingTemplateId)
    BEGIN
        INSERT dbo.qlss_pm_project_template_activity(project_template_id, sequence_no, activity_name, is_required) VALUES
        (@TrainingTemplateId, 10, N'Training confirmation', 1),
        (@TrainingTemplateId, 20, N'Trainer assignment', 1),
        (@TrainingTemplateId, 30, N'Training material preparation', 1),
        (@TrainingTemplateId, 40, N'Training delivery', 1),
        (@TrainingTemplateId, 50, N'Assessment', 0),
        (@TrainingTemplateId, 60, N'Certificate generation', 0),
        (@TrainingTemplateId, 70, N'Feedback', 0),
        (@TrainingTemplateId, 80, N'Invoice', 0),
        (@TrainingTemplateId, 90, N'Closure', 1);
    END;

    IF NOT EXISTS (SELECT 1 FROM dbo.qlss_pm_project_template_activity WHERE project_template_id = @AuditTemplateId)
    BEGIN
        INSERT dbo.qlss_pm_project_template_activity(project_template_id, sequence_no, activity_name, is_required) VALUES
        (@AuditTemplateId, 10, N'Audit confirmation', 1),
        (@AuditTemplateId, 20, N'Auditor assignment', 1),
        (@AuditTemplateId, 30, N'Audit plan', 1),
        (@AuditTemplateId, 40, N'Audit checklist', 1),
        (@AuditTemplateId, 50, N'Audit execution', 1),
        (@AuditTemplateId, 60, N'Findings', 1),
        (@AuditTemplateId, 70, N'Audit report', 1),
        (@AuditTemplateId, 80, N'Corrective action follow-up', 0),
        (@AuditTemplateId, 90, N'Closure', 1);
    END;

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
    THROW;
END CATCH;
GO

/* ============================================================
   11. Concurrency-safe number generator
   ============================================================ */
CREATE OR ALTER PROCEDURE dbo.qlss_sp_pm_next_number
    @SequenceType nvarchar(30),
    @NextNumber nvarchar(60) OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON;

    DECLARE @PeriodKey char(4) = RIGHT(CONVERT(char(4), YEAR(GETDATE())), 2) + RIGHT('0' + CONVERT(varchar(2), MONTH(GETDATE())), 2);
    DECLARE @Next int;
    DECLARE @OwnTran bit = CASE WHEN @@TRANCOUNT = 0 THEN 1 ELSE 0 END;
    DECLARE @LockResource nvarchar(255);
    DECLARE @AppLockResult int;

    SET @LockResource = N'QLSS_PM_NUMBER_' + UPPER(@SequenceType) + N'_' + @PeriodKey;

    IF @OwnTran = 1 BEGIN TRANSACTION;

    EXEC @AppLockResult = sys.sp_getapplock
        @Resource = @LockResource,
        @LockMode = N'Exclusive',
        @LockOwner = N'Transaction',
        @LockTimeout = 10000;

    IF @AppLockResult < 0
    BEGIN
        IF @OwnTran = 1 AND @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW 51001, 'Unable to acquire Project Management number sequence lock.', 1;
    END;

    IF EXISTS (SELECT 1 FROM dbo.qlss_pm_number_sequence WITH (UPDLOCK, HOLDLOCK) WHERE sequence_type = @SequenceType AND period_key = @PeriodKey)
    BEGIN
        UPDATE dbo.qlss_pm_number_sequence
           SET last_number = last_number + 1,
               updated_on_utc = SYSUTCDATETIME()
         WHERE sequence_type = @SequenceType
           AND period_key = @PeriodKey;
    END
    ELSE
    BEGIN
        INSERT dbo.qlss_pm_number_sequence(sequence_type, period_key, last_number, updated_on_utc)
        VALUES (@SequenceType, @PeriodKey, 1, SYSUTCDATETIME());
    END;

    SELECT @Next = last_number
      FROM dbo.qlss_pm_number_sequence
     WHERE sequence_type = @SequenceType AND period_key = @PeriodKey;

    SET @NextNumber = CASE UPPER(@SequenceType)
        WHEN N'QUOTATION' THEN @PeriodKey + CASE WHEN @Next < 100 THEN RIGHT('00' + CONVERT(varchar(10), @Next), 2) ELSE CONVERT(varchar(10), @Next) END
        WHEN N'PROJECT'   THEN N'QLSS-PRJ-' + @PeriodKey + CASE WHEN @Next < 100 THEN RIGHT('00' + CONVERT(varchar(10), @Next), 2) ELSE CONVERT(varchar(10), @Next) END
        WHEN N'ENQUIRY'   THEN N'QLSS-ENQ-' + @PeriodKey + CASE WHEN @Next < 1000 THEN RIGHT('000' + CONVERT(varchar(10), @Next), 3) ELSE CONVERT(varchar(10), @Next) END
        ELSE UPPER(@SequenceType) + N'-' + @PeriodKey + CASE WHEN @Next < 1000 THEN RIGHT('000' + CONVERT(varchar(10), @Next), 3) ELSE CONVERT(varchar(10), @Next) END
    END;

    IF @OwnTran = 1 COMMIT TRANSACTION;
END;
GO

/*
    COMPLETE FLOW V2 MASTER DATA
    This section inserts only missing quotation/project templates and activities.
    Existing rows are preserved.
*/
SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
SET ANSI_PADDING ON;
SET ANSI_WARNINGS ON;
SET CONCAT_NULL_YIELDS_NULL ON;
SET ARITHABORT ON;
SET NUMERIC_ROUNDABORT OFF;
SET NOCOUNT ON;
SET XACT_ABORT ON;

BEGIN TRY
    BEGIN TRANSACTION;

    IF OBJECT_ID(N'dbo.qlss_pm_enquiry_category', N'U') IS NULL
       OR OBJECT_ID(N'dbo.qlss_pm_quotation_template', N'U') IS NULL
       OR OBJECT_ID(N'dbo.qlss_pm_project_template', N'U') IS NULL
       OR OBJECT_ID(N'dbo.qlss_pm_project_template_activity', N'U') IS NULL
    BEGIN
        THROW 51100, 'Required Project Management base objects are missing. Final migration cannot continue.', 1;
    END;

    /* ============================================================
       1. Ready quotation templates from the approved workflow
       ============================================================ */
    DECLARE @QuotationTemplates TABLE
    (
        template_code nvarchar(60) NOT NULL,
        template_name nvarchar(200) NOT NULL,
        category_code nvarchar(50) NOT NULL,
        scope_template nvarchar(max) NULL
    );

    INSERT @QuotationTemplates(template_code,template_name,category_code,scope_template) VALUES
    (N'TRN_ISO9001', N'ISO 9001 Training', N'TRAINING', N'ISO 9001 training covering applicable requirements, interpretation, practical examples and participant interaction.'),
    (N'TRN_ISO14001', N'ISO 14001 Training', N'TRAINING', N'ISO 14001 environmental management system training covering requirements, aspects/impacts and implementation practices.'),
    (N'TRN_ISO45001', N'ISO 45001 Training', N'TRAINING', N'ISO 45001 occupational health and safety management system training covering requirements, hazards, risks and controls.'),
    (N'TRN_IMS_IA', N'IMS Internal Auditor Training', N'TRAINING', N'Integrated Management System internal auditor training including audit planning, execution, reporting and follow-up.'),
    (N'TRN_IATF16949', N'IATF 16949 Training', N'TRAINING', N'IATF 16949 automotive quality management system training including process approach, CSR awareness and implementation.'),
    (N'TRN_CORETOOLS', N'Core Tools Training', N'TRAINING', N'Automotive Core Tools training covering APQP, PPAP, FMEA, SPC and MSA with practical examples.'),
    (N'TRN_APQP', N'APQP Training', N'TRAINING', N'Advanced Product Quality Planning training covering phases, deliverables, timing and cross-functional responsibilities.'),
    (N'TRN_PPAP', N'PPAP Training', N'TRAINING', N'Production Part Approval Process training covering submission levels, records, evidence and customer requirements.'),
    (N'TRN_FMEA', N'FMEA Training', N'TRAINING', N'Failure Mode and Effects Analysis training covering structure/function, failure analysis, risk evaluation and action optimization.'),
    (N'TRN_SPC', N'SPC Training', N'TRAINING', N'Statistical Process Control training covering process variation, control charts, capability and reaction plans.'),
    (N'TRN_MSA', N'MSA Training', N'TRAINING', N'Measurement System Analysis training covering GRR, bias, linearity, stability and attribute MSA.'),
    (N'TRN_8D', N'8D Training', N'TRAINING', N'8D problem solving training covering containment, root cause, corrective action, verification and prevention.'),
    (N'TRN_VDA', N'VDA Training', N'TRAINING', N'VDA based automotive quality training as agreed with the customer scope.'),
    (N'TRN_CUSTOM', N'Customized Training', N'TRAINING', N'Customized training program prepared as per the agreed customer requirement, participants and duration.'),

    (N'IMP_ISO9001', N'ISO 9001 Implementation', N'ISO_IMPLEMENTATION', N'ISO 9001 implementation support including gap assessment, documentation, implementation guidance, internal audit and certification readiness.'),
    (N'IMP_ISO14001', N'ISO 14001 Implementation', N'ISO_IMPLEMENTATION', N'ISO 14001 implementation support including environmental aspects/impacts, compliance controls, documentation and audit readiness.'),
    (N'IMP_ISO45001', N'ISO 45001 Implementation', N'ISO_IMPLEMENTATION', N'ISO 45001 implementation support including HIRA, legal/compliance controls, documentation and audit readiness.'),
    (N'IMP_IMS', N'IMS Implementation', N'IMS_IMPLEMENTATION', N'Integrated Management System implementation support covering agreed Quality, Environment and OH&S management system requirements.'),
    (N'IMP_IATF16949', N'IATF 16949 Implementation', N'ISO_IMPLEMENTATION', N'IATF 16949 implementation support including automotive process approach, core tools, CSR and certification readiness.'),
    (N'IMP_OTHER', N'Other Management System Implementation', N'OTHER', N'Management system implementation support as per the mutually agreed scope and applicable standard.'),

    (N'AUD_INTERNAL', N'Internal Audit', N'INTERNAL_AUDIT', N'Internal audit including planning, checklist preparation, execution, findings, reporting and agreed follow-up.'),
    (N'AUD_SUPPLIER', N'Supplier Audit', N'SUPPLIER_AUDIT', N'Supplier audit including planning, execution, findings, report and corrective action follow-up as applicable.'),
    (N'AUD_PROCESS', N'Process Audit', N'PROCESS_AUDIT', N'Process audit covering agreed processes, controls, evidence, findings and final report.'),
    (N'AUD_PRODUCT', N'Product Audit', N'PRODUCT_AUDIT', N'Product audit covering agreed product requirements, sampling/evidence, findings and report.'),
    (N'AUD_GAP', N'Gap Audit / Gap Assessment', N'GAP_ASSESSMENT', N'Gap assessment against the agreed standard/customer requirements with findings and implementation recommendations.'),
    (N'AUD_SECOND_PARTY', N'Second Party Audit', N'SUPPLIER_AUDIT', N'Second party audit conducted as per agreed customer/supplier criteria with findings and report.'),
    (N'AUD_COMPLIANCE', N'Compliance Audit', N'INTERNAL_AUDIT', N'Compliance audit against agreed legal, statutory, customer or management system requirements.');

    INSERT dbo.qlss_pm_quotation_template
    (template_code,template_name,category_id,scope_template,payment_terms,special_conditions,default_tax_percent,default_validity_days,is_active)
    SELECT t.template_code,t.template_name,c.category_id,t.scope_template,
           N'Payment terms as mutually agreed in the approved quotation.',
           N'Taxes extra as applicable. Travel/stay and other reimbursable expenses are applicable only when stated in the quotation.',
           18.00,30,1
    FROM @QuotationTemplates t
    JOIN dbo.qlss_pm_enquiry_category c ON c.category_code=t.category_code
    WHERE NOT EXISTS
    (
        SELECT 1 FROM dbo.qlss_pm_quotation_template q WHERE q.template_code=t.template_code
    );

    /* ============================================================
       2. Project templates for every enquiry category
       ============================================================ */
    DECLARE @ProjectTemplates TABLE
    (
        template_code nvarchar(60) NOT NULL,
        template_name nvarchar(200) NOT NULL,
        category_code nvarchar(50) NOT NULL,
        description nvarchar(1000) NULL
    );

    INSERT @ProjectTemplates VALUES
    (N'TRAINING_PROJECT',N'Training Project',N'TRAINING',N'Standard training delivery activity plan.'),
    (N'ISO_IMPLEMENTATION_PROJECT',N'ISO Implementation Project',N'ISO_IMPLEMENTATION',N'Standard ISO implementation activity plan.'),
    (N'IMS_IMPLEMENTATION_PROJECT',N'IMS Implementation Project',N'IMS_IMPLEMENTATION',N'Standard integrated management system implementation activity plan.'),
    (N'INTERNAL_AUDIT_PROJECT',N'Internal Audit Project',N'INTERNAL_AUDIT',N'Standard internal audit activity plan.'),
    (N'SUPPLIER_AUDIT_PROJECT',N'Supplier Audit Project',N'SUPPLIER_AUDIT',N'Standard supplier audit activity plan.'),
    (N'PROCESS_AUDIT_PROJECT',N'Process Audit Project',N'PROCESS_AUDIT',N'Standard process audit activity plan.'),
    (N'PRODUCT_AUDIT_PROJECT',N'Product Audit Project',N'PRODUCT_AUDIT',N'Standard product audit activity plan.'),
    (N'GAP_ASSESSMENT_PROJECT',N'Gap Assessment Project',N'GAP_ASSESSMENT',N'Standard gap assessment activity plan.'),
    (N'DOCUMENTATION_PROJECT',N'Documentation Support Project',N'DOCUMENTATION_SUPPORT',N'Standard documentation support activity plan.'),
    (N'CERTIFICATION_SUPPORT_PROJECT',N'Certification Support Project',N'CERTIFICATION_SUPPORT',N'Standard certification support activity plan.'),
    (N'CONSULTANCY_PROJECT',N'Consultancy Project',N'CONSULTANCY',N'Standard consultancy activity plan.'),
    (N'OTHER_SERVICES_PROJECT',N'Other Services Project',N'OTHER',N'Standard activity plan for other services.');

    INSERT dbo.qlss_pm_project_template(template_code,template_name,category_id,description,is_active)
    SELECT t.template_code,t.template_name,c.category_id,t.description,1
    FROM @ProjectTemplates t
    JOIN dbo.qlss_pm_enquiry_category c ON c.category_code=t.category_code
    WHERE NOT EXISTS(SELECT 1 FROM dbo.qlss_pm_project_template p WHERE p.template_code=t.template_code);

    /* ============================================================
       3. Required activity plans
       ============================================================ */
    DECLARE @TemplateId bigint;

    /* Training */
    SET @TemplateId=(SELECT project_template_id FROM dbo.qlss_pm_project_template WHERE template_code=N'TRAINING_PROJECT');
    IF @TemplateId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM dbo.qlss_pm_project_template_activity WHERE project_template_id=@TemplateId)
    BEGIN
        INSERT dbo.qlss_pm_project_template_activity(project_template_id,sequence_no,activity_name,description,default_duration_days,is_required,is_active) VALUES
        (@TemplateId,10,N'Training confirmation',N'Confirm scope, date, participant profile and customer expectations.',2,1,1),
        (@TemplateId,20,N'Trainer assignment',N'Assign trainer / subject matter expert.',2,1,1),
        (@TemplateId,30,N'Training material preparation',N'Prepare or confirm applicable presentation, exercises and handouts.',3,1,1),
        (@TemplateId,40,N'Training delivery',N'Deliver the approved training program.',1,1,1),
        (@TemplateId,50,N'Assessment',N'Conduct assessment where applicable.',1,0,1),
        (@TemplateId,60,N'Certificate generation',N'Generate certificates where applicable.',2,0,1),
        (@TemplateId,70,N'Feedback',N'Collect and record participant/customer feedback.',1,0,1),
        (@TemplateId,80,N'Invoice',N'Coordinate invoice as applicable.',2,0,1),
        (@TemplateId,90,N'Closure',N'Confirm completion and close the project workflow.',1,1,1);
    END;

    /* ISO / IMS implementation */
    DECLARE @ImplementationTemplates TABLE(code nvarchar(60));
    INSERT @ImplementationTemplates VALUES(N'ISO_IMPLEMENTATION_PROJECT'),(N'IMS_IMPLEMENTATION_PROJECT');
    DECLARE implementation_cursor CURSOR LOCAL FAST_FORWARD FOR
        SELECT project_template_id FROM dbo.qlss_pm_project_template WHERE template_code IN (SELECT code FROM @ImplementationTemplates);
    OPEN implementation_cursor;
    FETCH NEXT FROM implementation_cursor INTO @TemplateId;
    WHILE @@FETCH_STATUS=0
    BEGIN
        IF NOT EXISTS(SELECT 1 FROM dbo.qlss_pm_project_template_activity WHERE project_template_id=@TemplateId)
        BEGIN
            INSERT dbo.qlss_pm_project_template_activity(project_template_id,sequence_no,activity_name,description,default_duration_days,is_required,is_active) VALUES
            (@TemplateId,10,N'Project kickoff and scope confirmation',N'Confirm scope, locations, functions, responsibilities and project plan.',3,1,1),
            (@TemplateId,20,N'Gap assessment',N'Assess current system against applicable requirements.',5,1,1),
            (@TemplateId,30,N'Implementation action plan',N'Prepare actions, responsibilities and target dates.',3,1,1),
            (@TemplateId,40,N'Documentation development / update',N'Develop or update required policies, procedures, formats and records.',15,1,1),
            (@TemplateId,50,N'Implementation support',N'Support deployment, awareness and operational controls.',20,1,1),
            (@TemplateId,60,N'Training / awareness',N'Conduct agreed employee/management training.',5,0,1),
            (@TemplateId,70,N'Internal audit',N'Conduct internal audit and record findings.',5,1,1),
            (@TemplateId,80,N'Corrective action follow-up',N'Follow up audit findings and implementation gaps.',7,1,1),
            (@TemplateId,90,N'Management review support',N'Support management review readiness as applicable.',3,0,1),
            (@TemplateId,100,N'Certification readiness / final review',N'Perform final readiness review and certification support.',5,1,1),
            (@TemplateId,110,N'Closure',N'Confirm agreed implementation activities are complete.',2,1,1);
        END;
        FETCH NEXT FROM implementation_cursor INTO @TemplateId;
    END;
    CLOSE implementation_cursor;
    DEALLOCATE implementation_cursor;

    /* Audit templates: same approved lifecycle for every audit category. */
    DECLARE audit_cursor CURSOR LOCAL FAST_FORWARD FOR
        SELECT project_template_id FROM dbo.qlss_pm_project_template
        WHERE template_code IN(N'AUDIT_PROJECT',N'INTERNAL_AUDIT_PROJECT',N'SUPPLIER_AUDIT_PROJECT',N'PROCESS_AUDIT_PROJECT',N'PRODUCT_AUDIT_PROJECT');
    OPEN audit_cursor;
    FETCH NEXT FROM audit_cursor INTO @TemplateId;
    WHILE @@FETCH_STATUS=0
    BEGIN
        IF NOT EXISTS(SELECT 1 FROM dbo.qlss_pm_project_template_activity WHERE project_template_id=@TemplateId)
        BEGIN
            INSERT dbo.qlss_pm_project_template_activity(project_template_id,sequence_no,activity_name,description,default_duration_days,is_required,is_active) VALUES
            (@TemplateId,10,N'Audit confirmation',N'Confirm audit scope, criteria, date and customer requirements.',2,1,1),
            (@TemplateId,20,N'Auditor assignment',N'Assign competent auditor(s).',1,1,1),
            (@TemplateId,30,N'Audit plan',N'Prepare and communicate audit plan.',2,1,1),
            (@TemplateId,40,N'Audit checklist',N'Prepare applicable checklist / audit trails.',2,1,1),
            (@TemplateId,50,N'Audit execution',N'Conduct audit and collect objective evidence.',2,1,1),
            (@TemplateId,60,N'Findings',N'Record nonconformities, observations and opportunities.',1,1,1),
            (@TemplateId,70,N'Audit report',N'Prepare and issue audit report.',2,1,1),
            (@TemplateId,80,N'Corrective action follow-up',N'Follow up corrective action when required.',7,0,1),
            (@TemplateId,90,N'Closure',N'Close audit project after agreed actions.',1,1,1);
        END;
        FETCH NEXT FROM audit_cursor INTO @TemplateId;
    END;
    CLOSE audit_cursor;
    DEALLOCATE audit_cursor;

    /* Gap assessment */
    SET @TemplateId=(SELECT project_template_id FROM dbo.qlss_pm_project_template WHERE template_code=N'GAP_ASSESSMENT_PROJECT');
    IF @TemplateId IS NOT NULL AND NOT EXISTS(SELECT 1 FROM dbo.qlss_pm_project_template_activity WHERE project_template_id=@TemplateId)
        INSERT dbo.qlss_pm_project_template_activity(project_template_id,sequence_no,activity_name,description,default_duration_days,is_required,is_active) VALUES
        (@TemplateId,10,N'Scope confirmation',N'Confirm standard, sites and functions.',1,1,1),(@TemplateId,20,N'Gap assessment plan',N'Prepare assessment plan/checklist.',2,1,1),
        (@TemplateId,30,N'Assessment execution',N'Assess current practices and evidence.',3,1,1),(@TemplateId,40,N'Gap report',N'Issue gap report and priority recommendations.',2,1,1),
        (@TemplateId,50,N'Action review',N'Review agreed improvement action plan.',3,0,1),(@TemplateId,60,N'Closure',N'Confirm delivery and close.',1,1,1);

    /* Generic support / consultancy / other */
    DECLARE generic_cursor CURSOR LOCAL FAST_FORWARD FOR
        SELECT project_template_id FROM dbo.qlss_pm_project_template
        WHERE template_code IN(N'DOCUMENTATION_PROJECT',N'CERTIFICATION_SUPPORT_PROJECT',N'CONSULTANCY_PROJECT',N'OTHER_SERVICES_PROJECT');
    OPEN generic_cursor;
    FETCH NEXT FROM generic_cursor INTO @TemplateId;
    WHILE @@FETCH_STATUS=0
    BEGIN
        IF NOT EXISTS(SELECT 1 FROM dbo.qlss_pm_project_template_activity WHERE project_template_id=@TemplateId)
            INSERT dbo.qlss_pm_project_template_activity(project_template_id,sequence_no,activity_name,description,default_duration_days,is_required,is_active) VALUES
            (@TemplateId,10,N'Scope confirmation',N'Confirm agreed requirement, deliverables and responsibility.',2,1,1),
            (@TemplateId,20,N'Planning',N'Prepare activity plan and required inputs.',3,1,1),
            (@TemplateId,30,N'Execution / support',N'Perform the agreed consulting/support activities.',10,1,1),
            (@TemplateId,40,N'Review with customer',N'Review outputs, observations and pending points.',3,1,1),
            (@TemplateId,50,N'Final deliverables',N'Complete and issue agreed deliverables.',3,1,1),
            (@TemplateId,60,N'Closure',N'Confirm agreed work is complete.',1,1,1);
        FETCH NEXT FROM generic_cursor INTO @TemplateId;
    END;
    CLOSE generic_cursor;
    DEALLOCATE generic_cursor;

    COMMIT TRANSACTION;

    SELECT 'PASS' AS Result,
           (SELECT COUNT(1) FROM dbo.qlss_pm_quotation_template WHERE is_active=1) AS ActiveQuotationTemplates,
           (SELECT COUNT(1) FROM dbo.qlss_pm_project_template WHERE is_active=1) AS ActiveProjectTemplates,
           (SELECT COUNT(1) FROM dbo.qlss_pm_project_template_activity WHERE is_active=1) AS ActiveTemplateActivities;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT>0 ROLLBACK TRANSACTION;
    THROW;
END CATCH;

/* Workspace users are intentionally not seeded by this production-safe migration.
   Provision named accounts separately with unique temporary passwords. */
GO

/* ============================================================
   FINAL PRODUCTION VERIFICATION - READ ONLY
   ============================================================ */
SET NOCOUNT ON;

DECLARE @Required TABLE(object_name sysname, object_type varchar(20));
INSERT @Required VALUES
('qlss_pm_role','TABLE'),('qlss_pm_enquiry_category','TABLE'),('qlss_pm_number_sequence','TABLE'),
('qlss_pm_enquiry','TABLE'),('qlss_pm_enquiry_assignee','TABLE'),('qlss_pm_quotation_template','TABLE'),
('qlss_pm_quotation','TABLE'),('qlss_pm_quotation_approval_history','TABLE'),('qlss_pm_follow_up','TABLE'),
('qlss_pm_project_template','TABLE'),('qlss_pm_project_template_activity','TABLE'),('qlss_pm_project','TABLE'),
('qlss_pm_project_member','TABLE'),('qlss_pm_project_activity','TABLE'),('qlss_pm_notification','TABLE'),
('qlss_pm_email_log','TABLE'),('qlss_pm_attachment','TABLE'),('qlss_pm_project_acknowledgement','TABLE'),
('qlss_pm_module_link','TABLE'),('qlss_pm_audit_log','TABLE'),('qlss_sp_pm_next_number','PROCEDURE');

SELECT r.object_name AS ObjectName,
       r.object_type AS ObjectType,
       CASE WHEN (r.object_type='TABLE' AND OBJECT_ID(N'dbo.'+r.object_name,N'U') IS NOT NULL)
                  OR (r.object_type='PROCEDURE' AND OBJECT_ID(N'dbo.'+r.object_name,N'P') IS NOT NULL)
            THEN 'PASS' ELSE 'MISSING' END AS Result
FROM @Required r
ORDER BY CASE r.object_type WHEN 'TABLE' THEN 1 ELSE 2 END,r.object_name;

IF EXISTS
(
    SELECT 1 FROM @Required r
    WHERE (r.object_type='TABLE' AND OBJECT_ID(N'dbo.'+r.object_name,N'U') IS NULL)
       OR (r.object_type='PROCEDURE' AND OBJECT_ID(N'dbo.'+r.object_name,N'P') IS NULL)
)
    THROW 51990,'FINAL VERIFICATION FAILED: one or more required QLSS Project Management SQL objects are missing.',1;

SELECT COUNT(*) AS ActiveEnquiryCategories
FROM dbo.qlss_pm_enquiry_category WHERE is_active=1;

SELECT COUNT(*) AS ActiveQuotationTemplates
FROM dbo.qlss_pm_quotation_template WHERE is_active=1;

SELECT COUNT(*) AS ActiveProjectTemplates
FROM dbo.qlss_pm_project_template WHERE is_active=1;

SELECT COUNT(*) AS ActiveTemplateActivities
FROM dbo.qlss_pm_project_template_activity WHERE is_active=1;

SELECT Role,COUNT(*) AS ExistingUserCount
FROM dbo.Users
WHERE Role IN(N'SuperAdmin',N'Admin',N'Manager',N'Employee')
GROUP BY Role
ORDER BY Role;

/* Non-consuming procedure smoke test: transaction is rolled back. */
DECLARE @SmokeNumber nvarchar(60);
BEGIN TRANSACTION;
BEGIN TRY
    EXEC dbo.qlss_sp_pm_next_number @SequenceType=N'ENQUIRY', @NextNumber=@SmokeNumber OUTPUT;
    SELECT N'PASS' AS NumberGeneratorResult, @SmokeNumber AS GeneratedTestNumber;
    ROLLBACK TRANSACTION;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
    THROW;
END CATCH;

PRINT N'PASS - QLSS Project Management production-safe migration and verification completed successfully.';
PRINT N'Existing rows were preserved. Only missing PM objects and missing PM master rows were added.';
GO
