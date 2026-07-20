IF OBJECT_ID('dbo.Trainer', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.Trainer
    (
        TrainerId BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        Name VARCHAR(200) NOT NULL,
        Mobile VARCHAR(20) NOT NULL,
        Email VARCHAR(200) NOT NULL,
        Address VARCHAR(1000) NULL,
        Company VARCHAR(1000) NULL,
        IsActive BIT NOT NULL CONSTRAINT DF_Trainer_IsActive DEFAULT 1,
        CreatedDate DATETIME NOT NULL CONSTRAINT DF_Trainer_CreatedDate DEFAULT GETDATE(),
        UpdatedDate DATETIME NULL
    );
END
GO

IF OBJECT_ID('dbo.CertificationForm', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.CertificationForm
    (
        CertificationFormId BIGINT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        Name VARCHAR(200) NOT NULL,
        Mobile VARCHAR(20) NOT NULL,
        Email VARCHAR(200) NOT NULL,
        Days INT NOT NULL,
        TrainerId BIGINT NOT NULL,
        CertificationDate DATE NOT NULL,
        IsComplete BIT NOT NULL CONSTRAINT DF_CertificationForm_IsComplete DEFAULT 0,
        IsPaid BIT NOT NULL CONSTRAINT DF_CertificationForm_IsPaid DEFAULT 0,
        RazorpayPaymentId VARCHAR(200) NULL,
        RazorpayOrderId VARCHAR(200) NULL,
        RazorpaySignature VARCHAR(500) NULL,
        CreatedDate DATETIME NOT NULL CONSTRAINT DF_CertificationForm_CreatedDate DEFAULT GETDATE(),
        UpdatedDate DATETIME NULL,

        CONSTRAINT FK_CertificationForm_Trainer
        FOREIGN KEY (TrainerId) REFERENCES dbo.Trainer(TrainerId)
    );
END
GO

IF NOT EXISTS 
(
    SELECT 1 
    FROM sys.indexes 
    WHERE name = 'IX_Trainer_Email' 
    AND object_id = OBJECT_ID('dbo.Trainer')
)
BEGIN
    CREATE INDEX IX_Trainer_Email ON dbo.Trainer(Email);
END
GO

IF NOT EXISTS 
(
    SELECT 1 
    FROM sys.indexes 
    WHERE name = 'IX_CertificationForm_TrainerId' 
    AND object_id = OBJECT_ID('dbo.CertificationForm')
)
BEGIN
    CREATE INDEX IX_CertificationForm_TrainerId ON dbo.CertificationForm(TrainerId);
END
GO

IF NOT EXISTS 
(
    SELECT 1 
    FROM dbo.Trainer 
    WHERE Email = 'dummytrainer@qlss.com'
)
BEGIN
    INSERT INTO dbo.Trainer
    (
        Name,
        Mobile,
        Email,
        Address,
        Company
    )
    VALUES
    (
        'Dummy Trainer',
        '9999999999',
        'dummytrainer@qlss.com',
        'Pune',
        'QLSS'
    );
END
GO
