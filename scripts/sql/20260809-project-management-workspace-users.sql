/*
    QLSS PROJECT MANAGEMENT - WORKSPACE USER PROVISIONING
    Run only after 20260809-project-management-production-safe.sql.

    Creates only these missing users:
      - superadmin@qlssconsulting.com / SuperAdmin
      - employee@qlssconsulting.com   / Employee

    Existing Users rows are never updated or deleted.
    The password hash is copied from quality@qlssconsulting.com so both new
    accounts initially use that Admin account's current password. Change each
    new account password immediately after its first successful login.
*/

SET NOCOUNT ON;
SET XACT_ABORT ON;

IF OBJECT_ID(N'dbo.Users', N'U') IS NULL
    THROW 52000, 'Required table dbo.Users was not found. No changes were made.', 1;

IF OBJECT_ID(N'dbo.qlss_pm_role', N'U') IS NULL
    THROW 52001, 'Project Management migration is not installed. Run the PM migration first.', 1;

IF NOT EXISTS
(
    SELECT 1 FROM dbo.qlss_pm_role
    WHERE role_code = N'SuperAdmin' AND is_workspace_role = 1 AND is_active = 1
)
    THROW 52002, 'Active SuperAdmin workspace role was not found. No changes were made.', 1;

IF NOT EXISTS
(
    SELECT 1 FROM dbo.qlss_pm_role
    WHERE role_code = N'Employee' AND is_workspace_role = 1 AND is_active = 1
)
    THROW 52003, 'Active Employee workspace role was not found. No changes were made.', 1;

DECLARE @SourceAdminEmail nvarchar(255) = N'quality@qlssconsulting.com';
DECLARE @SuperAdminEmail nvarchar(255) = N'superadmin@qlssconsulting.com';
DECLARE @EmployeeEmail nvarchar(255) = N'employee@qlssconsulting.com';
DECLARE @TemporaryPasswordHash nvarchar(500);

SELECT TOP (1) @TemporaryPasswordHash = PasswordHash
FROM dbo.Users
WHERE LOWER(LTRIM(RTRIM(Email))) = LOWER(@SourceAdminEmail)
  AND Role = N'Admin';

IF NULLIF(LTRIM(RTRIM(@TemporaryPasswordHash)), N'') IS NULL
    THROW 52004, 'Source Admin quality@qlssconsulting.com with a valid password hash was not found. No changes were made.', 1;

BEGIN TRY
    BEGIN TRANSACTION;

    IF NOT EXISTS
    (
        SELECT 1 FROM dbo.Users WITH (UPDLOCK, HOLDLOCK)
        WHERE LOWER(LTRIM(RTRIM(Email))) = LOWER(@SuperAdminEmail)
    )
    BEGIN
        INSERT dbo.Users
        (
            Name, Email, PasswordHash, Phone, Address, Role,
            CreatedAt, UpdatedAt, RefreshTokenHash, RefreshTokenExpiresAtUtc
        )
        VALUES
        (
            N'QLSS Super Admin', @SuperAdminEmail, @TemporaryPasswordHash,
            NULL, NULL, N'SuperAdmin', GETDATE(), GETDATE(), NULL, NULL
        );
    END;

    IF NOT EXISTS
    (
        SELECT 1 FROM dbo.Users WITH (UPDLOCK, HOLDLOCK)
        WHERE LOWER(LTRIM(RTRIM(Email))) = LOWER(@EmployeeEmail)
    )
    BEGIN
        INSERT dbo.Users
        (
            Name, Email, PasswordHash, Phone, Address, Role,
            CreatedAt, UpdatedAt, RefreshTokenHash, RefreshTokenExpiresAtUtc
        )
        VALUES
        (
            N'QLSS Employee', @EmployeeEmail, @TemporaryPasswordHash,
            NULL, NULL, N'Employee', GETDATE(), GETDATE(), NULL, NULL
        );
    END;

    COMMIT TRANSACTION;
END TRY
BEGIN CATCH
    IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
    THROW;
END CATCH;

SELECT
    Id,
    Name,
    Email,
    Role,
    CreatedAt,
    CASE
        WHEN LOWER(LTRIM(RTRIM(Email))) IN (LOWER(@SuperAdminEmail), LOWER(@EmployeeEmail))
            THEN N'PASS - account exists; change its password immediately'
        ELSE N'UNEXPECTED'
    END AS Verification
FROM dbo.Users
WHERE LOWER(LTRIM(RTRIM(Email))) IN (LOWER(@SuperAdminEmail), LOWER(@EmployeeEmail))
ORDER BY Email;

IF (SELECT COUNT(*) FROM dbo.Users
    WHERE LOWER(LTRIM(RTRIM(Email))) IN (LOWER(@SuperAdminEmail), LOWER(@EmployeeEmail))) <> 2
    THROW 52005, 'Verification failed: both requested workspace accounts do not exist.', 1;

PRINT N'PASS - SuperAdmin and Employee workspace accounts exist.';
PRINT N'SECURITY ACTION REQUIRED - change both new account passwords immediately.';
GO
