/*
    Exam Details Excel Export - verification and test query
    Safe to run: read-only, no schema or data changes.
*/
SET NOCOUNT ON;

-- 1. Verify required tables.
SELECT required.TableName,
       CASE WHEN OBJECT_ID(N'dbo.' + required.TableName, N'U') IS NULL THEN 'MISSING' ELSE 'OK' END AS VerificationStatus
FROM (VALUES
    (N'Certifications_Data'), (N'Test'), (N'TestSubmission'),
    (N'TestResultSummary'), (N'QuestionResult'), (N'QuestionOption')
) required(TableName);

-- 2. Verify the columns used by the report query.
SELECT c.TABLE_NAME, c.COLUMN_NAME, c.DATA_TYPE
FROM INFORMATION_SCHEMA.COLUMNS c
WHERE c.TABLE_SCHEMA = 'dbo'
  AND (
       (c.TABLE_NAME = 'Certifications_Data' AND c.COLUMN_NAME IN ('CertificationDataId', 'Name', 'Email', 'TrainingId', 'Location', 'Date'))
    OR (c.TABLE_NAME = 'Test' AND c.COLUMN_NAME IN ('TestId', 'TrainingId', 'TrainingName', 'IsDeleted'))
    OR (c.TABLE_NAME = 'TestSubmission' AND c.COLUMN_NAME IN ('SubmissionId', 'Username', 'TestId', 'TestName', 'TestTitle', 'SubmittedAt', 'IsDeleted'))
    OR (c.TABLE_NAME = 'TestResultSummary' AND c.COLUMN_NAME IN ('SubmissionId', 'ObtainedMarks', 'TotalMarks', 'IsDeleted'))
    OR (c.TABLE_NAME = 'QuestionResult' AND c.COLUMN_NAME IN ('QuestionResultId', 'SubmissionId', 'QuestionId', 'QuestionNo', 'QuestionText', 'SelectedOptionId', 'CorrectOptionId', 'EssayAnswer', 'EvaluationStatus', 'IsDeleted'))
    OR (c.TABLE_NAME = 'QuestionOption' AND c.COLUMN_NAME IN ('QuestionOptionId', 'QuestionId', 'OptionKey', 'Text', 'DisplayOrder', 'IsDeleted'))
  )
ORDER BY c.TABLE_NAME, c.ORDINAL_POSITION;

-- 3. Find real filter combinations that can produce a report.
-- Copy CompanyId, TrainingId, TestId and TrainingDate from one returned row
-- into the variables in section 4 below.
SELECT TOP (50)
    TRY_CONVERT(BIGINT, cd.Location) AS CompanyId,
    cd.TrainingId,
    t.TrainingName,
    ts.TestId,
    COALESCE(NULLIF(ts.TestTitle, ''), ts.TestName) AS TestName,
    CAST(cd.[Date] AS date) AS TrainingDate,
    COUNT(DISTINCT ts.SubmissionId) AS MatchingUsers,
    COUNT(qr.QuestionResultId) AS ReportRows
FROM dbo.Certifications_Data cd
INNER JOIN dbo.TestSubmission ts
    ON LOWER(LTRIM(RTRIM(ts.Username))) = LOWER(LTRIM(RTRIM(cd.Email)))
   AND ts.IsDeleted = 0
INNER JOIN dbo.[Test] t
    ON t.TestId = ts.TestId
   AND t.TrainingId = cd.TrainingId
   AND t.IsDeleted = 0
INNER JOIN dbo.QuestionResult qr
    ON qr.SubmissionId = ts.SubmissionId
   AND qr.IsDeleted = 0
WHERE TRY_CONVERT(BIGINT, cd.Location) IS NOT NULL
GROUP BY TRY_CONVERT(BIGINT, cd.Location), cd.TrainingId, t.TrainingName,
         ts.TestId, COALESCE(NULLIF(ts.TestTitle, ''), ts.TestName), CAST(cd.[Date] AS date)
ORDER BY CAST(cd.[Date] AS date) DESC, MatchingUsers DESC;

-- 4. Test the exact report dataset. Set these values from section 3.
DECLARE @CompanyId BIGINT = 0;
DECLARE @TrainingId BIGINT = 0;
DECLARE @TestId BIGINT = 0;
DECLARE @TrainingDate DATE = '2000-01-01';

SELECT
    cohort.Name AS UserName,
    t.TrainingId,
    COALESCE(NULLIF(t.TrainingName, ''), ts.TestTitle, ts.TestName) AS TrainingName,
    ts.TestId,
    COALESCE(NULLIF(ts.TestTitle, ''), ts.TestName) AS TestName,
    CAST(@TrainingDate AS date) AS TrainingDate,
    COALESCE(summary.ObtainedMarks, 0) AS ObtainedMarks,
    COALESCE(summary.TotalMarks, 0) AS TotalMarks,
    qr.QuestionId,
    qr.QuestionNo,
    qr.QuestionText,
    COALESCE(options.Option1, '') AS Option1,
    COALESCE(options.Option2, '') AS Option2,
    COALESCE(options.Option3, '') AS Option3,
    COALESCE(options.Option4, '') AS Option4,
    qr.SelectedOptionId AS GivenAnswerOptionKey,
    qr.CorrectOptionId AS CorrectAnswerOptionKey,
    qr.EvaluationStatus
FROM dbo.TestSubmission ts
INNER JOIN dbo.[Test] t
    ON t.TestId = ts.TestId AND t.IsDeleted = 0 AND t.TrainingId = @TrainingId
INNER JOIN dbo.QuestionResult qr
    ON qr.SubmissionId = ts.SubmissionId AND qr.IsDeleted = 0
LEFT JOIN dbo.TestResultSummary summary
    ON summary.SubmissionId = ts.SubmissionId AND summary.IsDeleted = 0
CROSS APPLY
(
    SELECT TOP (1) cd.Name
    FROM dbo.Certifications_Data cd
    WHERE cd.TrainingId = @TrainingId
      AND TRY_CONVERT(BIGINT, cd.Location) = @CompanyId
      AND COALESCE(TRY_CONVERT(date, cd.[Date]), TRY_CONVERT(date, cd.[Date], 103), TRY_CONVERT(date, cd.[Date], 105)) = @TrainingDate
      AND LOWER(LTRIM(RTRIM(cd.Email))) = LOWER(LTRIM(RTRIM(ts.Username)))
    ORDER BY cd.CertificationDataId DESC
) cohort
OUTER APPLY
(
    SELECT
        MAX(CASE WHEN ranked.DisplayOrder = 1 THEN ranked.[Text] END) AS Option1,
        MAX(CASE WHEN ranked.DisplayOrder = 2 THEN ranked.[Text] END) AS Option2,
        MAX(CASE WHEN ranked.DisplayOrder = 3 THEN ranked.[Text] END) AS Option3,
        MAX(CASE WHEN ranked.DisplayOrder = 4 THEN ranked.[Text] END) AS Option4
    FROM
    (
        SELECT qo.[Text], ROW_NUMBER() OVER (ORDER BY qo.DisplayOrder, qo.QuestionOptionId) AS DisplayOrder
        FROM dbo.QuestionOption qo
        WHERE qo.QuestionId = TRY_CONVERT(BIGINT, qr.QuestionId) AND qo.IsDeleted = 0
    ) ranked
) options
WHERE ts.TestId = @TestId AND ts.IsDeleted = 0
ORDER BY cohort.Name, ts.SubmittedAt, qr.QuestionNo, qr.QuestionResultId;
