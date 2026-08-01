SET XACT_ABORT ON;
SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
SET ANSI_PADDING ON;
SET ANSI_WARNINGS ON;
SET ARITHABORT ON;
SET CONCAT_NULL_YIELDS_NULL ON;
SET NUMERIC_ROUNDABORT OFF;
GO

/*
  Certificate approval workflow
  - Only one form is allowed for each normalized name + email + training + year.
  - The same user may repeat the same training in a later calendar year.
  - [Date] is currently text, so CertificateYear is maintained as a normal INT
    column using safe, explicit date conversions.
*/

IF OBJECT_ID(N'dbo.Certifications_Data', N'U') IS NULL
    THROW 50001, 'dbo.Certifications_Data does not exist.', 1;
GO

IF EXISTS
(
    SELECT 1
    FROM sys.columns
    WHERE object_id = OBJECT_ID(N'dbo.Certifications_Data')
      AND name = N'CertificationNumber'
      AND is_nullable = 0
)
BEGIN
    ALTER TABLE dbo.Certifications_Data
        ALTER COLUMN CertificationNumber NVARCHAR(100) NULL;
END;
GO

-- Remove the old rule, which incorrectly prevented retraining in later years.
IF EXISTS
(
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID(N'dbo.Certifications_Data')
      AND name = N'UX_Certifications_Data_Email_Training'
)
BEGIN
    DROP INDEX UX_Certifications_Data_Email_Training
        ON dbo.Certifications_Data;
END;
GO

-- Remove the failed/old computed version if it exists, then use a normal INT column.
IF EXISTS
(
    SELECT 1
    FROM sys.computed_columns
    WHERE object_id = OBJECT_ID(N'dbo.Certifications_Data')
      AND name = N'CertificateYear'
)
BEGIN
    IF EXISTS
    (
        SELECT 1
        FROM sys.indexes
        WHERE object_id = OBJECT_ID(N'dbo.Certifications_Data')
          AND name = N'UX_Certifications_Data_User_Training_Year'
    )
        DROP INDEX UX_Certifications_Data_User_Training_Year
            ON dbo.Certifications_Data;

    ALTER TABLE dbo.Certifications_Data DROP COLUMN CertificateYear;
END;
GO

IF COL_LENGTH(N'dbo.Certifications_Data', N'CertificateYear') IS NULL
BEGIN
    ALTER TABLE dbo.Certifications_Data ADD CertificateYear INT NULL;
END;
GO

/*
  Supported text formats:
    yyyy-MM-dd, yyyy-MM-dd HH:mm:ss, ISO-8601,
    dd/MM/yyyy, dd-MM-yyyy, MM/dd/yyyy, dd mon yyyy.
  Ambiguous slash dates are interpreted as dd/MM/yyyy first.
*/
UPDATE CD
SET CertificateYear = DATEPART(YEAR, Parsed.ParsedDate)
FROM dbo.Certifications_Data CD
CROSS APPLY
(
    VALUES
    (
        COALESCE
        (
            TRY_CONVERT(date, NULLIF(LTRIM(RTRIM(CONVERT(nvarchar(100), CD.[Date]))), N''), 23),
            TRY_CONVERT(date, NULLIF(LTRIM(RTRIM(CONVERT(nvarchar(100), CD.[Date]))), N''), 120),
            TRY_CONVERT(date, NULLIF(LTRIM(RTRIM(CONVERT(nvarchar(100), CD.[Date]))), N''), 126),
            TRY_CONVERT(date, NULLIF(LTRIM(RTRIM(CONVERT(nvarchar(100), CD.[Date]))), N''), 103),
            TRY_CONVERT(date, NULLIF(LTRIM(RTRIM(CONVERT(nvarchar(100), CD.[Date]))), N''), 105),
            TRY_CONVERT(date, NULLIF(LTRIM(RTRIM(CONVERT(nvarchar(100), CD.[Date]))), N''), 101),
            TRY_CONVERT(date, NULLIF(LTRIM(RTRIM(CONVERT(nvarchar(100), CD.[Date]))), N''), 106)
        )
    )
) Parsed(ParsedDate);
GO

/*
  Back up duplicates before removing extras. The retained row preference is:
  certificate already assigned, most recently updated, then highest ID.
*/
IF OBJECT_ID(N'dbo.Certifications_Data_DuplicateBackup_UserTrainingYear_20260728', N'U') IS NULL
BEGIN
    ;WITH DuplicateGroups AS
    (
        SELECT
            LOWER(LTRIM(RTRIM(Name))) AS NormalizedName,
            LOWER(LTRIM(RTRIM(Email))) AS NormalizedEmail,
            TrainingId,
            CertificateYear
        FROM dbo.Certifications_Data
        WHERE NULLIF(LTRIM(RTRIM(Name)), N'') IS NOT NULL
          AND NULLIF(LTRIM(RTRIM(Email)), N'') IS NOT NULL
          AND CertificateYear IS NOT NULL
        GROUP BY
            LOWER(LTRIM(RTRIM(Name))),
            LOWER(LTRIM(RTRIM(Email))),
            TrainingId,
            CertificateYear
        HAVING COUNT_BIG(*) > 1
    )
    SELECT CD.*, SYSUTCDATETIME() AS DuplicateBackupAt
    INTO dbo.Certifications_Data_DuplicateBackup_UserTrainingYear_20260728
    FROM dbo.Certifications_Data CD
    INNER JOIN DuplicateGroups DG
        ON DG.NormalizedName = LOWER(LTRIM(RTRIM(CD.Name)))
       AND DG.NormalizedEmail = LOWER(LTRIM(RTRIM(CD.Email)))
       AND DG.TrainingId = CD.TrainingId
       AND DG.CertificateYear = CD.CertificateYear;
END;
GO

;WITH RankedRows AS
(
    SELECT
        CertificationDataId,
        ROW_NUMBER() OVER
        (
            PARTITION BY
                LOWER(LTRIM(RTRIM(Name))),
                LOWER(LTRIM(RTRIM(Email))),
                TrainingId,
                CertificateYear
            ORDER BY
                CASE
                    WHEN NULLIF(LTRIM(RTRIM(CertificationNumber)), N'') IS NOT NULL THEN 0
                    ELSE 1
                END,
                UpdatedAt DESC,
                CertificationDataId DESC
        ) AS RowNumber
    FROM dbo.Certifications_Data
    WHERE NULLIF(LTRIM(RTRIM(Name)), N'') IS NOT NULL
      AND NULLIF(LTRIM(RTRIM(Email)), N'') IS NOT NULL
      AND CertificateYear IS NOT NULL
)
DELETE CD
FROM dbo.Certifications_Data CD
INNER JOIN RankedRows RR
    ON RR.CertificationDataId = CD.CertificationDataId
WHERE RR.RowNumber > 1;
GO

UPDATE dbo.Certifications_Data
SET
    Name = CASE
        WHEN NULLIF(LTRIM(RTRIM(Name)), N'') IS NULL THEN NULL
        ELSE LTRIM(RTRIM(Name))
    END,
    Email = CASE
        WHEN NULLIF(LTRIM(RTRIM(Email)), N'') IS NULL THEN NULL
        ELSE LOWER(LTRIM(RTRIM(Email)))
    END;
GO

IF COL_LENGTH(N'dbo.Certifications_Data', N'NormalizedName') IS NULL
BEGIN
    ALTER TABLE dbo.Certifications_Data
        ADD NormalizedName AS LOWER(LTRIM(RTRIM(Name))) PERSISTED;
END;
GO

IF COL_LENGTH(N'dbo.Certifications_Data', N'NormalizedEmail') IS NULL
BEGIN
    ALTER TABLE dbo.Certifications_Data
        ADD NormalizedEmail AS LOWER(LTRIM(RTRIM(Email))) PERSISTED;
END;
GO

IF NOT EXISTS
(
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID(N'dbo.Certifications_Data')
      AND name = N'UX_Certifications_Data_User_Training_Year'
)
BEGIN
    CREATE UNIQUE INDEX UX_Certifications_Data_User_Training_Year
        ON dbo.Certifications_Data
            (NormalizedName, NormalizedEmail, TrainingId, CertificateYear)
        WHERE Name IS NOT NULL
          AND Email IS NOT NULL
          AND CertificateYear IS NOT NULL;
END;
GO

/* Keep CertificateYear synchronized for all future inserts and date changes. */
CREATE OR ALTER TRIGGER dbo.TR_Certifications_Data_SetCertificateYear
ON dbo.Certifications_Data
AFTER INSERT, UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF TRIGGER_NESTLEVEL() > 1 RETURN;
    IF NOT (UPDATE([Date]) OR UPDATE(CertificateYear)) RETURN;

    UPDATE CD
    SET CertificateYear = DATEPART(YEAR, Parsed.ParsedDate)
    FROM dbo.Certifications_Data CD
    INNER JOIN inserted I
        ON I.CertificationDataId = CD.CertificationDataId
    CROSS APPLY
    (
        VALUES
        (
            COALESCE
            (
                TRY_CONVERT(date, NULLIF(LTRIM(RTRIM(CONVERT(nvarchar(100), I.[Date]))), N''), 23),
                TRY_CONVERT(date, NULLIF(LTRIM(RTRIM(CONVERT(nvarchar(100), I.[Date]))), N''), 120),
                TRY_CONVERT(date, NULLIF(LTRIM(RTRIM(CONVERT(nvarchar(100), I.[Date]))), N''), 126),
                TRY_CONVERT(date, NULLIF(LTRIM(RTRIM(CONVERT(nvarchar(100), I.[Date]))), N''), 103),
                TRY_CONVERT(date, NULLIF(LTRIM(RTRIM(CONVERT(nvarchar(100), I.[Date]))), N''), 105),
                TRY_CONVERT(date, NULLIF(LTRIM(RTRIM(CONVERT(nvarchar(100), I.[Date]))), N''), 101),
                TRY_CONVERT(date, NULLIF(LTRIM(RTRIM(CONVERT(nvarchar(100), I.[Date]))), N''), 106)
            )
        )
    ) Parsed(ParsedDate);
END;
GO

IF NOT EXISTS
(
    SELECT 1
    FROM sys.indexes
    WHERE object_id = OBJECT_ID(N'dbo.Certifications_Data')
      AND name = N'IX_Certifications_Data_Location_Pending'
)
BEGIN
    CREATE INDEX IX_Certifications_Data_Location_Pending
        ON dbo.Certifications_Data (Location, CertificationNumber)
        INCLUDE (Name, Email, TrainingId);
END;
GO

-- Review these rows: invalid/unsupported dates cannot participate in year uniqueness.
SELECT CertificationDataId, Name, Email, TrainingId, [Date]
FROM dbo.Certifications_Data
WHERE NULLIF(LTRIM(RTRIM(CONVERT(nvarchar(100), [Date]))), N'') IS NOT NULL
  AND CertificateYear IS NULL;
GO
