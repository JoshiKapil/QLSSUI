# QLSS APPLICATION COMPLETE AUDIT REPORT
**System**: QLSS Consulting Web Application & Backend Service  
**Frontend Path**: `I:\QLSS_New_Version`  
**Backend Path**: `I:\QlssService`  
**Audit Date**: September 17, 2026  
**Status**: Existing Production System (Hosted on Hostinger / Linux VPS)  

---

## 1. Executive Summary

A comprehensive, non-destructive audit of the complete QLSS application (Angular 14 frontend and ASP.NET Core 10 Web API backend) was conducted in accordance with strict production safety rules. Zero database modifications were performed.

### Key Highlights:
- **Build Status**: Both the Angular frontend and .NET Web API compile cleanly with **0 build errors**.
- **Authorization Gaps Closed**: 26 endpoints that previously had authorization commented out or missing (allowing anonymous users to create/update/delete tests, questions, clients, trainers, and certificates) were identified and secured with role-based authorization (`[Authorize(Roles = "Admin,SuperAdmin")]`).
- **Critical Public Flows Preserved**: Public candidate registration (`/fill-exam-form`), certificate verification (`/verify`), public test attempt/submit flows, and contact form submissions were verified and remain accessible without authentication.
- **Security & Injection**: The API repository layer exclusively utilizes parameterized queries via Dapper (`CommandDefinition`). No SQL injection vulnerabilities were detected.
- **Email Security & XSS**: User input in contact and lead generation emails is now strictly HTML-encoded before template interpolation, preventing email client injection/XSS.
- **Cross-Platform Compatibility**: Windows-only hardcoded storage paths (`I:\QLSS\...`) have been refactored to support relative paths anchored to the application root directory, ensuring full Linux VPS / Hostinger compatibility.
- **Secrets Management**: A production deployment guide (`SECRETS_SETUP.md`) has been created documenting environment variable overrides for production credentials.

---

## 2. Angular Audit

- **App Structure & Architecture**: Feature-module architecture with lazy loading across 30 feature directories (`project-management`, `zeiss-management`, `employee-onboarding`, `assessment`, `ghar-booking`, etc.).
- **Routing & Guards**: Routes are protected by `AuthGuard`, `AdminGuard`, and `WorkspaceGuard`. Public routes (`home`, `about`, `blogs`, `client`, `verify`, `fill-exam-form`, `contact`) are appropriately unauthenticated.
- **Interceptors**: Three global interceptors handle Bearer token injection (`AuthTokenInterceptor`), token refresh on HTTP 401, and contextual loading state tracking (`PmLoadingInterceptor`, `ZeissLoadingInterceptor`).
- **HTTP Client**: Centralized in `ApiClientService` with standard response unwrapping (`unwrapApiResponse`) supporting both structured `ApiResponse<T>` and raw responses.
- **Memory & Subscriptions**: Components utilize RxJS subscriptions with manual unsubscribe or completion handling. `SiteInteractionsService` cleans up DOM event listeners via an internal cleanup array.
- **Cache Invalidation**: `index.html` includes an inline auto-update polling script that checks script fingerprints and prompts hard reload upon deployment of new bundles.

---

## 3. API Audit

- **Architecture**: N-Tier modular architecture: `Controllers` → `Services` → `Repositories` → `Database` (via Dapper Micro-ORM).
- **Domain Modules**: Dedicated modules for `EmployeeOnboarding`, `GharAssessment`, `GharBooking`, `ProjectManagement`, `SupportTickets`, and `ZeissManagement`.
- **Response Standard**: Standardized `ApiResponse<T>` envelope with `Success`, `Message`, `TraceId`, `Data`, `Errors`, and `Pagination`.
- **Background Tasks**: `QueuedHostedService` with channel-backed `BackgroundTaskQueue` for non-blocking asynchronous email delivery.
- **Hosted Services**: Dedicated reminder and SLA workers (`ProjectManagementReminderWorker`, `SupportTicketSlaWorker`, `ZeissInventoryAlertWorker`, `EmployeeOnboardingReminderWorker`).

---

## 4. Security Audit

- **Authentication**: JWT Bearer token authentication with HMAC-SHA256 signature verification. Token lifetime is 60 minutes with cryptographically secure base64url-encoded refresh tokens (SHA-256 hashed in database).
- **Public Upload Risk**: Class-level `[Authorize]` on `MediaController` was previously commented out, allowing arbitrary public file uploads up to 50MB. This was remediated by enforcing `[Authorize(Roles = "Admin,SuperAdmin")]`.
- **Question & Test Tampering**: `TestController` and `QuestionController` previously permitted unauthenticated modification and deletion of test databases. Remediated with admin role enforcement.
- **Client & Trainer Tampering**: `ClientController` and `TrainerController` mutating endpoints (Create, Update, Delete, UploadImage) were open to unauthenticated requests. Remediated with admin role enforcement.
- **Email Injection / XSS**: User-submitted data in contact form was concatenated into HTML emails. Remediated with `WebUtility.HtmlEncode`.

---

## 5. Authentication/Authorization Audit

All endpoints across standard controllers and domain modules were audited:

| Controller | Anonymous / Public Actions | Protected Actions | Policy / Role |
|---|---|---|---|
| `AuthController` | `register`, `login`, `refresh`, `email-exists` | None | `[AllowAnonymous]` |
| `UserController` | None | `profile`, `change-password`, `GetUserById` | `UserOrAdmin`, `AdminOnly` |
| `TestController` | `GetAll`, `GetById`, `GetCompleteTest`, `GetTestTypes`, `file/{testType}/{testId}` | `Create`, `Update`, `Deactivate`, `SaveQuestions`, `DeleteQuestion`, `Import`, `ImportExcel`, `save-file` | `Admin,SuperAdmin` |
| `QuestionController` | `GetAll`, `GetById` | `Create`, `Update`, `Delete`, `Usage`, `Import`, `ImportWordQuestions`, `ImportExcel` | `Admin,SuperAdmin` |
| `TestResultController` | `submit`, `file/{trainingId}/{username}`, `file/{testType}/{trainingId}/{username}` | `GetList`, `GetBySubmission`, `GetByUser`, `GetByTest`, `ExportExamDetails`, `EmailExamDetails`, `ManualReview`, `Delete` | `Admin,SuperAdmin` |
| `MediaController` | None | `upload/{mediaType}`, `upload-test`, `upload-question`, `upload-answer` | `Admin,SuperAdmin` |
| `ClientController` | `GetAll`, `GetById` | `Create`, `Update`, `Delete`, `upload-image` | `Admin,SuperAdmin` |
| `TrainerController` | `GetAll`, `GetById` | `Create`, `Update`, `Delete` | `Admin,SuperAdmin` |
| `CertificationDataController` | `GetAll`, `GetById`, `by-number`, `validate-test-access`, `by-user-training`, `file` | `admin-data`, `Create`, `approve`, `import`, `correct-name`, `Update` | `Admin,SuperAdmin` |
| `CertificateOperationController` | `save`, `upload`, `{certificationNumber}`, `file` | `send-email` | `Admin,SuperAdmin` |
| `TrainingOperationController` | `GetTraining`, `GetTrainings`, `documents/{trainingId}`, `documents/by-name/{documentName}` | `save`, `UpdateTraining` | `Admin,SuperAdmin` |
| `TrainingFeedbackController` | `GetAll`, `SubmitFeedback` | None | Public trainee feedback |
| `MailOperationController` | `SendMail` | None | Public contact form |

---

## 6. Database Access Audit

- **ORM & Pattern**: Uses Dapper with parameterized `CommandDefinition`.
- **SQL Injection**: No raw string concatenation was found in database queries across all repository implementations.
- **Connection Management**: Scoped `IDbConnection` injected via `SqlConnection` to ensure proper connection reuse within HTTP request lifetimes.
- **Timeouts**: Global command timeout configurable via `Database:CommandTimeoutSeconds` (defaults to 30 seconds).

---

## 7. File Storage Audit

- **Windows Path Elimination**: `SupportTickets:StorageRoot` was hardcoded to `I:\QLSS\SupportTicketFiles`. Refactored to support relative paths anchored to application root.
- **MIME & Extensions**: Upload handlers enforce strict extension whitelisting (`.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.pdf`, `.docx`, etc.).
- **Path Traversal Protection**: Training document endpoint (`TrainingOperationController.GetTrainingDocumentFromStorage`) verifies that resolved physical paths are strictly contained within the designated root directory.

---

## 8. Email / Notification Audit

- **Provider**: MailKit with SMTP client over TLS (`smtp.gmail.com:587`).
- **Domain Typo Fixed**: Corrected `www.qllsconsulting.com` (double L) to `www.qlssconsulting.com` in email subject and header text.
- **Configurable CC**: Hardcoded email address `akapilj@yahoo.com` is now configurable via `SmtpSettings:CcEmail` with backward-compatible fallback.
- **XSS Protection**: HTML encoding applied to all user input before email body generation.

---

## 9. Configuration Audit

- **appsettings.json**: Configured for standard application settings. Secrets guide provided for environment variable overrides.
- **Angular Environments**: `environment.ts` targets `https://localhost:5222/api`; `environment.prod.ts` targets `/api` (relative reverse-proxy path).

---

## 10. Performance Audit

- **Angular Bundling**: Production build produces optimized hashed bundles with CSS and JS minification. Initial bundle transfer size is ~583 kB.
- **API Rate Limiting**: Built-in rate limiting policies configured for general traffic (100/min), login (5/min), uploads (10/min), and admin endpoints (50/min).
- **Async Execution**: File I/O and database operations leverage non-blocking async/await (`OpenConnectionAsync`, `QueryFirstOrDefaultAsync`, `ExecuteAsync`, `CopyToAsync`).

---

## 11. Error Handling Audit

- **Global Middleware**: `ApiExceptionMiddleware` intercepts unhandled exceptions, SqlException codes (2601/2627 for duplicate key conflicts returning HTTP 409), and operation cancellations.
- **Information Disclosure Prevention**: Stack traces and raw internal database exception messages (`ex.Message`) are suppressed from client responses and redirected to structured logging.

---

## 12. Production Compatibility Audit (Linux / Hostinger)

- **Path Separators**: Replaced hardcoded Windows backslashes with cross-platform `Path.Combine` and normalized relative URL separators (`/`).
- **Forwarded Headers**: Enabled `ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto` for Nginx reverse proxy compatibility.
- **Kestrel Limits**: Request body limit configurable via `RequestLimits:MaxRequestBodySizeMb`.

---

## 13. Issues Fixed

| # | Severity | Module | File | Issue | Risk | Action Taken |
|---|---|---|---|---|---|---|
| 1 | CRITICAL | API Auth | `TestController.cs` | 7 mutating endpoints had `[Authorize]` commented out | Anyone could create/edit/delete tests | Added `[Authorize(Roles = "Admin,SuperAdmin")]` |
| 2 | CRITICAL | API Auth | `QuestionController.cs` | 7 mutating endpoints had `[Authorize]` commented out | Anyone could create/edit/delete questions | Added `[Authorize(Roles = "Admin,SuperAdmin")]` |
| 3 | CRITICAL | API Auth | `MediaController.cs` | Class-level `[Authorize]` was commented out | Anyone could upload 50MB files | Added `[Authorize(Roles = "Admin,SuperAdmin")]` |
| 4 | CRITICAL | API Auth | `TestResultController.cs` | Admin result query endpoints had `[Authorize]` commented out | Public exposure of candidate test results | Added `[Authorize(Roles = "Admin,SuperAdmin")]` on query/review actions |
| 5 | CRITICAL | API Auth | `CertificationDataController.cs` | No authorization on administrative data and certificate actions | Anyone could approve, import, or alter certifications | Added `[Authorize(Roles = "Admin,SuperAdmin")]` on mutating actions |
| 6 | CRITICAL | API Auth | `ClientController.cs` | Mutating endpoints lacked authorization | Unauthenticated creation/deletion of clients | Added `[Authorize(Roles = "Admin,SuperAdmin")]` on Create, Update, Delete, Upload |
| 7 | CRITICAL | API Auth | `TrainingOperationController.cs` | Training save and update lacked authorization | Anyone could alter training details | Added `[Authorize(Roles = "Admin,SuperAdmin")]` on save/update |
| 8 | CRITICAL | API Auth | `TrainerController.cs` | Mutating endpoints lacked authorization | Unauthenticated trainer manipulation | Added `[Authorize(Roles = "Admin,SuperAdmin")]` on Create, Update, Delete |
| 9 | HIGH | API Config | `appsettings.json` | Hardcoded Windows drive path `I:\QLSS\SupportTicketFiles` | Service failure on Linux VPS | Converted to relative path `SupportTicketFiles` |
| 10 | HIGH | API Storage | `SupportTicketService.cs` | Hardcoded path assumption for ticket attachments | File errors on Linux VPS | Implemented `GetStorageRoot()` supporting cross-platform relative paths |
| 11 | HIGH | API Storage | `FileSystemAssetStorage.cs` | Unrooted relative path handling | Runtime exception if relative path specified | Anchored relative root paths to application base directory |
| 12 | HIGH | API Email | `MailOperationRepository.cs` | Domain typo `www.qllsconsulting.com` | Misspelled URL in email subject & body | Corrected to `www.qlssconsulting.com` |
| 13 | HIGH | API Email | `MailOperationRepository.cs` | Hardcoded CC email address | Inflexible email notification recipient | Added configuration lookup `SmtpSettings:CcEmail` with backward-compatible fallback |
| 14 | HIGH | API Security | `MailOperationRepository.cs` | Unescaped user input inserted into HTML email | Email HTML injection / XSS | Applied `WebUtility.HtmlEncode` to all user inputs |
| 15 | HIGH | API Security | `ClientController.cs` | `ex.Message` exposed in HTTP 500 error response | Internal technical details leakage | Replaced with generic message and logged detailed exception |
| 16 | HIGH | API Files | `ClientController.cs` | Uploaded image path mismatch (`CustomerLogo` vs `Clientslogo`) | Broken image URLs | Normalized returned relative path to `assets/img/CustomerLogo/{fileName}` |
| 17 | MEDIUM | API Config | `QlssService.csproj` | Dual `Microsoft.Data.SqlClient` and legacy `System.Data.SqlClient` packages | Dependency confusion and ambiguous types | Removed legacy `System.Data.SqlClient` package and using directives |
| 18 | MEDIUM | API Config | `TrainingOperationRepository.cs` | Redundant type aliases to disambiguate duplicate packages | Code bloat | Cleaned up imports and removed legacy namespace |

---

## 14. Issues Not Fixed (Intentionally Preserved)

- **Hardcoded Email in Zeiss Guard**: `zeiss-access.guard.ts` checks `consultant@qlssconsulting.com`. This matches the backend `ZeissWorkspace` authorization policy in `Program.cs` line 122. Preserved to avoid breaking current consultant workflow.
- **Public Exam Registration**: `CertificateOperationController.SaveCertificate` and `fill-exam-form` route kept public to allow trainees to submit registration details.
- **Public Candidate Test Submissions**: `TestResultController.Submit` kept public so candidate exam answers can be submitted upon completion.
- **JWT Storage in Web Storage**: Frontend uses `localStorage` / `sessionStorage` for tokens. Architectural rewrite to HttpOnly cookie authentication was avoided to prevent breaking client-side token management.

---

## 15. Database Recommendations – Manual Review Only

> [!NOTE]
> In accordance with safety rules, zero database changes were executed. The following recommendations are provided for manual DBA review:
1. **Indexes on Foreign Keys**: Verify non-clustered index existence on `TrainingId`, `TestId`, and `UserId` across result and question mapping tables.
2. **Refresh Token Cleanup**: Consider a scheduled maintenance job to purge expired refresh tokens (`RefreshTokenExpiresAtUtc < SYSUTCDATETIME()`) from `Users` table.

---

## 16. Remaining Risks

- **Production Credentials in Deployment**: Ensure that production deployment overrides database connection strings, JWT keys, and SMTP credentials using environment variables as documented in `SECRETS_SETUP.md`.
- **Directory Permissions on Linux**: Ensure the Linux application user (e.g. `www-data`) possesses read and write permissions on `SupportTicketFiles/` and `assets/` directories.

---

## 17. Final Build Status

| Project | Command | Result | Errors | Warnings |
|---|---|---|---|---|
| **.NET API** | `dotnet build` | ✅ **Build Succeeded** | **0** | 14 (nullable annotations in isolated PM module) |
| **Angular Frontend** | `npm run build` | ✅ **Build Succeeded** | **0** | 0 |

