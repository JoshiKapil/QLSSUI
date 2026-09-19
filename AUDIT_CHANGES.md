# QLSS AUDIT CHANGES LOG

This document catalogs all code modifications made during the production audit across both projects.

---

### 1. `I:\QlssService\Controllers\TestController.cs`
- **Reason**: Security hardening against unauthenticated test tampering.
- **Problem**: 7 mutating endpoints had `//[Authorize(Roles = "Admin")]` commented out, allowing any unauthenticated internet user to create, update, delete, map questions, and import tests.
- **Change**: Uncommented authorization and assigned `[Authorize(Roles = "Admin,SuperAdmin")]` to:
  - `Create`
  - `Update`
  - `Deactivate`
  - `SaveQuestions`
  - `DeleteQuestion`
  - `Import`
  - `ImportExcel`
  Read-only endpoints (`GetAll`, `GetById`, `GetCompleteTest`, `GetTestTypes`, `file/{testType}/{testId}`) were left public for candidate test-taking.
- **Impact**: Only authenticated administrators can modify tests. Candidate test-taking remains unaffected.
- **Backward Compatible**: **YES**

---

### 2. `I:\QlssService\Controllers\QuestionController.cs`
- **Reason**: Security hardening against unauthenticated question tampering.
- **Problem**: 7 mutating endpoints had `//[Authorize(Roles = "Admin")]` commented out, allowing arbitrary creation, editing, deletion, and bulk importing of examination questions.
- **Change**: Added `[Authorize(Roles = "Admin,SuperAdmin")]` to:
  - `Create`
  - `Update`
  - `Delete`
  - `Usage`
  - `Import`
  - `ImportWordQuestions`
  - `ImportExcel`
  Read-only question fetch endpoints remained public for candidate test rendering.
- **Impact**: Administrative question endpoints are secured. Test taking flow continues smoothly.
- **Backward Compatible**: **YES**

---

### 3. `I:\QlssService\Controllers\MediaController.cs`
- **Reason**: Vulnerability remediation of open file upload endpoint.
- **Problem**: Class-level `//[Authorize(Roles = "Admin")]` was commented out, allowing unauthenticated file uploads up to 50MB.
- **Change**: Uncommented class-level authorization as `[Authorize(Roles = "Admin,SuperAdmin")]`.
- **Impact**: Prevents unauthenticated users from uploading arbitrary media to the server.
- **Backward Compatible**: **YES**

---

### 4. `I:\QlssService\Controllers\TestResultController.cs`
- **Reason**: Data privacy protection and authorization enforcement.
- **Problem**: Results query endpoints had `[Authorize]` commented out, exposing candidate exam submissions and scores to the public.
- **Change**: Restored `[Authorize(Roles = "Admin,SuperAdmin")]` on:
  - `GetList`
  - `GetBySubmission`
  - `GetByUser`
  - `GetByTest`
  Kept `Submit` unauthenticated to allow candidate exam submission.
- **Impact**: Candidate results are protected from unauthorized public viewing.
- **Backward Compatible**: **YES**

---

### 5. `I:\QlssService\Controllers\CertificationDataController.cs`
- **Reason**: Administrative protection for certification management.
- **Problem**: Mutation and approval endpoints lacked authorization, allowing anyone to approve, import, or alter certifications.
- **Change**: Added `[Authorize(Roles = "Admin,SuperAdmin")]` to:
  - `GetDataTable` (`admin-data`)
  - `Create`
  - `Approve`
  - `Import`
  - `CorrectName`
  - `Update`
  Kept public verification endpoints (`GetAll`, `GetById`, `by-number`, `validate-test-access`, `by-user-training`) open for certificate verification.
- **Impact**: Prevents fraudulent approval or tampering of certification records while preserving candidate verification.
- **Backward Compatible**: **YES**

---

### 6. `I:\QlssService\Controllers\ClientController.cs`
- **Reason**: Authorization enforcement, error leakage prevention, and path normalization.
- **Problem**:
  1. `Create`, `Update`, `Delete`, and `UploadImage` endpoints lacked authorization.
  2. `UploadImage` leaked internal technical details via `error = ex.Message`.
  3. `UploadImage` returned a relative path pointing to `assets/Clientslogo/` while writing to `assets/img/CustomerLogo/`, causing mismatched URLs.
- **Change**:
  1. Added `[Authorize(Roles = "Admin,SuperAdmin")]` to mutating endpoints.
  2. Integrated structured logging and replaced raw exception exposure with a sanitized client error message.
  3. Aligned `relativePath` to `assets/img/CustomerLogo/{fileName}` matching Angular client-admin consumption.
- **Impact**: Client management is secured, image paths resolve correctly, and error responses are sanitized.
- **Backward Compatible**: **YES**

---

### 7. `I:\QlssService\Controllers\TrainingOperationController.cs`
- **Reason**: Security hardening on training catalog management.
- **Problem**: `save` and `UpdateTraining` had no authorization checks, allowing unauthenticated training catalog manipulation.
- **Change**: Added `[Authorize(Roles = "Admin,SuperAdmin")]` to `SaveTraining` and `UpdateTraining`. Read endpoints (`GetTraining`, `GetTrainings`, `documents/...`) remained accessible.
- **Impact**: Training catalog data is protected from unauthorized changes.
- **Backward Compatible**: **YES**

---

### 8. `I:\QlssService\Controllers\TrainerController.cs`
- **Reason**: Security hardening on trainer catalog management.
- **Problem**: `Create`, `Update`, and `Delete` endpoints lacked authorization.
- **Change**: Added `[Authorize(Roles = "Admin,SuperAdmin")]` to `Create`, `Update`, and `Delete` actions. Read actions remained public.
- **Impact**: Only administrators can add or remove trainers.
- **Backward Compatible**: **YES**

---

### 9. `I:\QlssService\Repositories\Implementation\MailOperationRepository.cs`
- **Reason**: Remediation of email HTML injection (XSS), URL typo correction, and configurable CC.
- **Problem**:
  1. User input (`Username`, `Email`, `Mobile`, `Message`) was directly interpolated into email HTML without encoding.
  2. Typo `www.qllsconsulting.com` (double L) existed in subject and template.
  3. CC recipient `akapilj@yahoo.com` was hardcoded.
- **Change**:
  1. Applied `WebUtility.HtmlEncode` to all user-supplied fields.
  2. Corrected domain typo to `www.qlssconsulting.com`.
  3. Made CC email configurable via `SmtpSettings:CcEmail` with backward-compatible fallback to `akapilj@yahoo.com`.
- **Impact**: Eliminates email injection risks, fixes branding URLs, and enables configuration management.
- **Backward Compatible**: **YES**

---

### 10. `I:\QlssService\Modules\SupportTickets\SupportTicketService.cs`
- **Reason**: Linux production storage compatibility.
- **Problem**: Hardcoded assumption that `StorageRoot` is a Windows drive path.
- **Change**: Added `GetStorageRoot()` resolving relative paths anchored to `env.ContentRootPath`.
- **Impact**: Ticket attachments function correctly on both Windows and Linux hosting environments.
- **Backward Compatible**: **YES**

---

### 11. `I:\QlssService\Infrastructure\Storage\FileSystemAssetStorage.cs`
- **Reason**: Cross-platform path resolution.
- **Problem**: Handled only rooted paths without fallback when given relative paths.
- **Change**: Anchored relative root paths to application base directory.
- **Impact**: Consistent storage behavior regardless of operating system working directory.
- **Backward Compatible**: **YES**

---

### 12. `I:\QlssService\appsettings.json`
- **Reason**: Removal of Windows-only paths and adding email notification config.
- **Problem**: `StorageRoot` was hardcoded to `I:\QLSS\SupportTicketFiles`.
- **Change**:
  1. Changed `SupportTickets:StorageRoot` to relative `SupportTicketFiles`.
  2. Added `SmtpSettings:CcEmail` entry.
- **Impact**: Linux VPS host compatibility.
- **Backward Compatible**: **YES**

---

### 13. `I:\QlssService\QlssService.csproj`
- **Reason**: Package dependency cleanup and ambiguity elimination.
- **Problem**: Referenced both `Microsoft.Data.SqlClient` and legacy `System.Data.SqlClient`.
- **Change**: Removed legacy `System.Data.SqlClient` package reference.
- **Impact**: Eliminates package ambiguity and cleans up build dependencies.
- **Backward Compatible**: **YES**

---

### 14. `I:\QlssService\Repositories\Implementation\TrainingOperationRepository.cs`
- **Reason**: Disambiguation cleanup.
- **Problem**: Included unused `using System.Data.SqlClient;` resulting in redundant type aliases.
- **Change**: Removed redundant `using System.Data.SqlClient;`.
- **Impact**: Cleaner, more maintainable code without duplicate package imports.
- **Backward Compatible**: **YES**

---

### 15. `I:\QlssService\SECRETS_SETUP.md`
- **Reason**: Production deployment documentation.
- **Problem**: Clear instructions needed for production environment variable overrides.
- **Change**: Created comprehensive documentation for systemd, Linux VPS, and Docker production deployments.
- **Impact**: Operational readiness for production deployments without storing secrets in source control.
- **Backward Compatible**: **YES**

