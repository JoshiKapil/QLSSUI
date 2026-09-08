-- Supporting indexes for PM access checks and onboarding page/detail queries.
-- Run after the base PM and onboarding migrations. Run in a maintenance window.
-- Each index commits separately; rerun resumes after an interrupted index build.
-- Review disk/log capacity on a restored production-sized database first.
USE [QLSS];
GO
SET XACT_ABORT ON;
SET LOCK_TIMEOUT 15000;
GO
IF OBJECT_ID(N'dbo.qlss_pm_enquiry_assignee',N'U') IS NULL
    THROW 50001, 'Missing qlss_pm_enquiry_assignee: apply the base migration first.', 1;
IF NOT EXISTS (
    SELECT 1 FROM sys.indexes i
    WHERE i.object_id=OBJECT_ID(N'dbo.qlss_pm_enquiry_assignee') AND i.is_disabled=0 AND i.is_hypothetical=0 AND i.has_filter=0
      AND EXISTS (SELECT 1 FROM sys.index_columns ic JOIN sys.columns c ON c.object_id=ic.object_id AND c.column_id=ic.column_id WHERE ic.object_id=i.object_id AND ic.index_id=i.index_id AND ic.key_ordinal=1 AND c.name=N'enquiry_id')
      AND EXISTS (SELECT 1 FROM sys.index_columns ic JOIN sys.columns c ON c.object_id=ic.object_id AND c.column_id=ic.column_id WHERE ic.object_id=i.object_id AND ic.index_id=i.index_id AND ic.key_ordinal=2 AND c.name=N'user_id')
      AND EXISTS (SELECT 1 FROM sys.index_columns ic JOIN sys.columns c ON c.object_id=ic.object_id AND c.column_id=ic.column_id WHERE ic.object_id=i.object_id AND ic.index_id=i.index_id AND ic.key_ordinal=3 AND c.name=N'is_active')
)
BEGIN
    IF EXISTS(SELECT 1 FROM sys.indexes WHERE object_id=OBJECT_ID(N'dbo.qlss_pm_enquiry_assignee') AND name=N'IX_PM_assignee_access')
        THROW 50002, 'An incompatible IX_PM_assignee_access already exists; review its definition.', 1;
    CREATE INDEX [IX_PM_assignee_access] ON dbo.[qlss_pm_enquiry_assignee]([enquiry_id],[user_id],[is_active]) WITH (MAXDOP=2);
END;
GO
IF OBJECT_ID(N'dbo.qlss_pm_project_member',N'U') IS NULL
    THROW 50001, 'Missing qlss_pm_project_member: apply the base migration first.', 1;
IF NOT EXISTS (
    SELECT 1 FROM sys.indexes i
    WHERE i.object_id=OBJECT_ID(N'dbo.qlss_pm_project_member') AND i.is_disabled=0 AND i.is_hypothetical=0 AND i.has_filter=0
      AND EXISTS (SELECT 1 FROM sys.index_columns ic JOIN sys.columns c ON c.object_id=ic.object_id AND c.column_id=ic.column_id WHERE ic.object_id=i.object_id AND ic.index_id=i.index_id AND ic.key_ordinal=1 AND c.name=N'project_id')
      AND EXISTS (SELECT 1 FROM sys.index_columns ic JOIN sys.columns c ON c.object_id=ic.object_id AND c.column_id=ic.column_id WHERE ic.object_id=i.object_id AND ic.index_id=i.index_id AND ic.key_ordinal=2 AND c.name=N'user_id')
      AND EXISTS (SELECT 1 FROM sys.index_columns ic JOIN sys.columns c ON c.object_id=ic.object_id AND c.column_id=ic.column_id WHERE ic.object_id=i.object_id AND ic.index_id=i.index_id AND ic.key_ordinal=3 AND c.name=N'is_active')
)
BEGIN
    IF EXISTS(SELECT 1 FROM sys.indexes WHERE object_id=OBJECT_ID(N'dbo.qlss_pm_project_member') AND name=N'IX_PM_member_access')
        THROW 50002, 'An incompatible IX_PM_member_access already exists; review its definition.', 1;
    CREATE INDEX [IX_PM_member_access] ON dbo.[qlss_pm_project_member]([project_id],[user_id],[is_active]) WITH (MAXDOP=2);
END;
GO
IF OBJECT_ID(N'dbo.qlss_pm_project_activity',N'U') IS NULL
    THROW 50001, 'Missing qlss_pm_project_activity: apply the base migration first.', 1;
IF NOT EXISTS (
    SELECT 1 FROM sys.indexes i
    WHERE i.object_id=OBJECT_ID(N'dbo.qlss_pm_project_activity') AND i.is_disabled=0 AND i.is_hypothetical=0 AND i.has_filter=0
      AND EXISTS (SELECT 1 FROM sys.index_columns ic JOIN sys.columns c ON c.object_id=ic.object_id AND c.column_id=ic.column_id WHERE ic.object_id=i.object_id AND ic.index_id=i.index_id AND ic.key_ordinal=1 AND c.name=N'project_id')
      AND EXISTS (SELECT 1 FROM sys.index_columns ic JOIN sys.columns c ON c.object_id=ic.object_id AND c.column_id=ic.column_id WHERE ic.object_id=i.object_id AND ic.index_id=i.index_id AND ic.key_ordinal=2 AND c.name=N'responsible_user_id')
      AND EXISTS (SELECT 1 FROM sys.index_columns ic JOIN sys.columns c ON c.object_id=ic.object_id AND c.column_id=ic.column_id WHERE ic.object_id=i.object_id AND ic.index_id=i.index_id AND ic.key_ordinal=3 AND c.name=N'is_deleted')
)
BEGIN
    IF EXISTS(SELECT 1 FROM sys.indexes WHERE object_id=OBJECT_ID(N'dbo.qlss_pm_project_activity') AND name=N'IX_PM_activity_access')
        THROW 50002, 'An incompatible IX_PM_activity_access already exists; review its definition.', 1;
    CREATE INDEX [IX_PM_activity_access] ON dbo.[qlss_pm_project_activity]([project_id],[responsible_user_id],[is_deleted]) WITH (MAXDOP=2);
END;
GO
IF OBJECT_ID(N'dbo.qlss_onb_enrollment',N'U') IS NULL
    THROW 50001, 'Missing qlss_onb_enrollment: apply the base migration first.', 1;
IF NOT EXISTS (
    SELECT 1 FROM sys.indexes i
    WHERE i.object_id=OBJECT_ID(N'dbo.qlss_onb_enrollment') AND i.is_disabled=0 AND i.is_hypothetical=0 AND i.has_filter=0
      AND EXISTS (SELECT 1 FROM sys.index_columns ic JOIN sys.columns c ON c.object_id=ic.object_id AND c.column_id=ic.column_id WHERE ic.object_id=i.object_id AND ic.index_id=i.index_id AND ic.key_ordinal=1 AND c.name=N'user_id')
      AND EXISTS (SELECT 1 FROM sys.index_columns ic JOIN sys.columns c ON c.object_id=ic.object_id AND c.column_id=ic.column_id WHERE ic.object_id=i.object_id AND ic.index_id=i.index_id AND ic.key_ordinal=2 AND c.name=N'is_active')
      AND EXISTS (SELECT 1 FROM sys.index_columns ic JOIN sys.columns c ON c.object_id=ic.object_id AND c.column_id=ic.column_id WHERE ic.object_id=i.object_id AND ic.index_id=i.index_id AND ic.key_ordinal=3 AND c.name=N'enrollment_id')
)
BEGIN
    IF EXISTS(SELECT 1 FROM sys.indexes WHERE object_id=OBJECT_ID(N'dbo.qlss_onb_enrollment') AND name=N'IX_ONB_user_enrollment_page')
        THROW 50002, 'An incompatible IX_ONB_user_enrollment_page already exists; review its definition.', 1;
    CREATE INDEX [IX_ONB_user_enrollment_page] ON dbo.[qlss_onb_enrollment]([user_id],[is_active],[enrollment_id]) WITH (MAXDOP=2);
END;
GO
IF OBJECT_ID(N'dbo.qlss_onb_enrollment_item',N'U') IS NULL
    THROW 50001, 'Missing qlss_onb_enrollment_item: apply the base migration first.', 1;
IF NOT EXISTS (
    SELECT 1 FROM sys.indexes i
    WHERE i.object_id=OBJECT_ID(N'dbo.qlss_onb_enrollment_item') AND i.is_disabled=0 AND i.is_hypothetical=0 AND i.has_filter=0
      AND EXISTS (SELECT 1 FROM sys.index_columns ic JOIN sys.columns c ON c.object_id=ic.object_id AND c.column_id=ic.column_id WHERE ic.object_id=i.object_id AND ic.index_id=i.index_id AND ic.key_ordinal=1 AND c.name=N'enrollment_id')
      AND EXISTS (SELECT 1 FROM sys.index_columns ic JOIN sys.columns c ON c.object_id=ic.object_id AND c.column_id=ic.column_id WHERE ic.object_id=i.object_id AND ic.index_id=i.index_id AND ic.key_ordinal=2 AND c.name=N'status')
)
BEGIN
    IF EXISTS(SELECT 1 FROM sys.indexes WHERE object_id=OBJECT_ID(N'dbo.qlss_onb_enrollment_item') AND name=N'IX_ONB_enrollment_item_status')
        THROW 50002, 'An incompatible IX_ONB_enrollment_item_status already exists; review its definition.', 1;
    CREATE INDEX [IX_ONB_enrollment_item_status] ON dbo.[qlss_onb_enrollment_item]([enrollment_id],[status]) WITH (MAXDOP=2);
END;
GO
SET LOCK_TIMEOUT -1;
GO
