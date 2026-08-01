import { __awaiter } from "tslib";
import { HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { toNumberId, toStringId, unwrapApiResponse } from '../../../core/models/api-response.model';
import { environment } from '../../../../environments/environment';
import { isServerNumericId, normalizeServerId } from './server-id.util';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
export class TestStorageService {
    constructor(http) {
        this.http = http;
        this.apiBaseUrl = environment.apiBaseUrl;
        this.apiDebugEnabled = !environment.production;
        this.fallbackAssessmentName = 'Untitled';
        this.encryptionKey = 'QLSS_ASSESSMENT_LOCAL_KEY';
        this.questionBankKey = 'question-bank';
        this.questionBankCleanupKey = 'question-bank:trimmed-after-20';
        this.questionBankCleanupKeepCount = 20;
        this.assessmentPrefix = 'assessment:';
        this.legacyTestPrefix = 'test:';
        this.draftPrefix = 'draft:';
        this.submittedPrefix = 'submitted:';
        this.browserDbName = 'qlss-test-storage';
        this.browserDbStoreName = 'encrypted-items';
        this.questionBankServerPath = 'assets/test/Questions/QuestionBank.json';
        this.assessmentServerPath = 'assets/test/assessments';
        this.assessmentManifestPath = 'assets/test/assessments/index.json';
        this.submittedServerPath = 'assets/test/submitted';
    }
    getAuthHeaders() {
        const token = localStorage.getItem('qlss_auth_token') ||
            sessionStorage.getItem('qlss_auth_token') ||
            localStorage.getItem('token') ||
            sessionStorage.getItem('token');
        return token && !token.startsWith('local-')
            ? new HttpHeaders({ Authorization: `Bearer ${token}` })
            : undefined;
    }
    apiUrl(endpoint) {
        return `${this.apiBaseUrl}/${endpoint.replace(/^\/+/, '')}`;
    }
    apiGet(endpoint, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield firstValueFrom(this.http.get(this.apiUrl(endpoint), {
                params,
                headers: this.getAuthHeaders()
            }));
            return unwrapApiResponse(response);
        });
    }
    apiPost(endpoint, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield firstValueFrom(this.http.post(this.apiUrl(endpoint), body, {
                headers: this.getAuthHeaders()
            }));
            return unwrapApiResponse(response);
        });
    }
    apiPut(endpoint, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield firstValueFrom(this.http.put(this.apiUrl(endpoint), body, {
                headers: this.getAuthHeaders()
            }));
            return unwrapApiResponse(response);
        });
    }
    apiDelete(endpoint, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield firstValueFrom(this.http.delete(this.apiUrl(endpoint), {
                body,
                headers: this.getAuthHeaders()
            }));
            return unwrapApiResponse(response);
        });
    }
    canUseLocalFallback(error) {
        var _a;
        if (error instanceof HttpErrorResponse) {
            return error.status === 0 || ((_a = error.message) === null || _a === void 0 ? void 0 : _a.includes('Timeout')) || error.name === 'TimeoutError';
        }
        return error instanceof Error && (error.message.includes('Timeout') || error.name === 'TimeoutError');
    }
    getApiErrorMessage(error) {
        if (error instanceof HttpErrorResponse) {
            const body = error.error;
            if (typeof body === 'string') {
                return body;
            }
            if (body === null || body === void 0 ? void 0 : body.message) {
                return body.message;
            }
            if (body === null || body === void 0 ? void 0 : body.title) {
                return body.title;
            }
            if (body === null || body === void 0 ? void 0 : body.errors) {
                const validationMessages = Object.values(body.errors).flat().filter(Boolean);
                if (validationMessages.length) {
                    return validationMessages.join(' ');
                }
            }
            return `Request failed with status ${error.status}.`;
        }
        return error instanceof Error ? error.message : String(error || 'Unknown API error');
    }
    logApiError(action, error) {
        if (!this.apiDebugEnabled) {
            return;
        }
        const responseBody = error instanceof HttpErrorResponse ? error.error : undefined;
        console.error(`[TestStorageService] ${action} API failed.`, { error, responseBody });
    }
    logApiFallback(action, error) {
        if (!this.apiDebugEnabled) {
            return;
        }
        const responseBody = error instanceof HttpErrorResponse ? error.error : undefined;
        const message = this.getApiErrorMessage(error);
        console.warn(`[TestStorageService] ${action} API failed; using local encrypted fallback.`, {
            message,
            error,
            responseBody
        });
    }
    toTestDto(test) {
        var _a;
        const mappedQuestionIds = ((_a = test.questionOrder) === null || _a === void 0 ? void 0 : _a.length) ? test.questionOrder : test.mappedQuestionIds;
        return Object.assign(Object.assign({}, test), { id: test.testId, testId: toStringId(test.testId), trainingId: toStringId(test.trainingId), title: test.testTitle, testTitle: test.testTitle, mappedQuestionIds: mappedQuestionIds.map((id) => toStringId(id)), questionOrder: mappedQuestionIds.map((id) => toStringId(id)), 
            // Questions are saved separately and linked through mappedQuestionIds.
            // Do not send UI question objects to Test/create because their field
            // types differ from the API QuestionDto model.
            questions: [], status: test.status, metadataJson: JSON.stringify({ testFileType: test.testFileType || 'assessment' }), metadata: { fileName: test.fileName, displayName: test.displayName, testFileType: test.testFileType } });
    }
    loadTestsFromServer() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tests = yield this.apiGet('Test');
                return (tests || []).map((test) => this.mapApiTest(test));
            }
            catch (_a) {
                try {
                    const tests = yield this.apiGet('Test/all');
                    return (tests || []).map((test) => this.mapApiTest(test));
                }
                catch (_b) {
                    return [];
                }
            }
        });
    }
    resolveServerTest(testName) {
        return __awaiter(this, void 0, void 0, function* () {
            const serverTestId = normalizeServerId(testName);
            if (serverTestId) {
                try {
                    const direct = yield this.apiGet(`Test/${encodeURIComponent(serverTestId)}`);
                    if (direct) {
                        return this.mapApiTest(direct);
                    }
                }
                catch (_a) {
                    // fall through
                }
            }
            const tests = yield this.loadTestsFromServer();
            const normalizedName = this.normalizeFileName(testName).toLowerCase();
            return (tests.find((test) => test.testId === testName ||
                this.normalizeFileName(test.testName).toLowerCase() === normalizedName ||
                this.normalizeFileName(test.displayName || '').toLowerCase() === normalizedName ||
                this.normalizeFileName(test.fileName || '').toLowerCase() === normalizedName) || null);
        });
    }
    loadAssessmentFromServer(testName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const completeTest = yield this.loadCompleteTestFromServer(testName);
                if (completeTest === null || completeTest === void 0 ? void 0 : completeTest.testDefinition) {
                    return completeTest.testDefinition;
                }
                const test = yield this.resolveServerTest(testName);
                return test || null;
            }
            catch (error) {
                this.logApiFallback('Load assessment', error);
                return null;
            }
        });
    }
    loadCompleteTestFromServer(testName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const test = yield this.resolveServerTest(testName);
                const serverTestId = normalizeServerId(test === null || test === void 0 ? void 0 : test.testId);
                if (!serverTestId) {
                    return null;
                }
                const paths = [
                    `Test/${encodeURIComponent(serverTestId)}/attempt`,
                    `Test/${encodeURIComponent(serverTestId)}/complete`,
                    `Test/attempt/${encodeURIComponent(serverTestId)}`
                ];
                let complete = null;
                for (const path of paths) {
                    try {
                        complete = yield this.apiGet(path);
                        break;
                    }
                    catch (error) {
                        if (!(error instanceof HttpErrorResponse) || error.status !== 404) {
                            throw error;
                        }
                    }
                }
                if (!complete && !test) {
                    return null;
                }
                const definition = this.mapApiTest(complete || test);
                const rawQuestions = this.pickArray(complete, ['questions', 'mappedQuestions', 'testQuestions', 'questionList']);
                const questions = this.normalizeQuestionBank(rawQuestions.map((question, index) => this.mapApiQuestion(question, index)));
                const mappedIds = questions.length ? questions.map((question) => this.getQuestionKey(question)) : definition.questionOrder;
                const testDefinition = this.normalizeAssessment(Object.assign(Object.assign({}, definition), { mappedQuestionIds: mappedIds, questionOrder: mappedIds, totalQuestions: definition.totalQuestions || mappedIds.length, questions }), definition.displayName);
                return {
                    testDefinition,
                    questions,
                    missingQuestionIds: [],
                    inactiveQuestionIds: questions
                        .filter((question) => question.isActive === false)
                        .map((question) => this.getQuestionKey(question))
                };
            }
            catch (error) {
                this.logApiFallback('Load complete test', error);
                return null;
            }
        });
    }
    loadMappedQuestionsFromServer(testId) {
        return __awaiter(this, void 0, void 0, function* () {
            const serverTestId = normalizeServerId(testId);
            if (!serverTestId) {
                return [];
            }
            try {
                const response = yield this.apiGet(`TestQuestion/by-test/${encodeURIComponent(serverTestId)}`);
                return this.normalizeQuestionBank((response || []).map((question, index) => this.mapApiQuestion(question, index)));
            }
            catch (error) {
                this.logApiFallback('Load mapped questions', error);
                return [];
            }
        });
    }
    loadAvailableQuestionsFromServer(testId) {
        return __awaiter(this, void 0, void 0, function* () {
            const serverTestId = normalizeServerId(testId);
            if (!serverTestId) {
                return [];
            }
            try {
                const response = yield this.apiGet(`TestQuestion/available-questions/${encodeURIComponent(serverTestId)}`);
                return this.normalizeQuestionBank((response || []).map((question, index) => this.mapApiQuestion(question, index)));
            }
            catch (error) {
                this.logApiFallback('Load available questions', error);
                return [];
            }
        });
    }
    saveAssessment(test) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveAssessmentAndGet(test);
        });
    }
    saveAssessmentAndGet(test) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const normalized = this.normalizeAssessment(test, this.getAssessmentDisplayName(test));
            try {
                const saved = yield this.saveAssessmentToServer(normalized);
                const savedTestId = normalizeServerId((saved === null || saved === void 0 ? void 0 : saved.testId) || normalized.testId);
                const merged = this.normalizeAssessment(Object.assign(Object.assign(Object.assign({}, normalized), saved), { testId: savedTestId || normalized.testId }), this.getAssessmentDisplayName(normalized));
                if (savedTestId) {
                    const questionIds = ((_a = merged.questionOrder) === null || _a === void 0 ? void 0 : _a.length) ? merged.questionOrder : merged.mappedQuestionIds;
                    yield this.saveTestQuestionMappings(savedTestId, questionIds);
                }
                yield this.saveAssessmentLocally(merged);
                return merged;
            }
            catch (error) {
                if (this.canUseLocalFallback(error)) {
                    this.logApiFallback('Save assessment', error);
                    yield this.saveAssessmentLocally(normalized);
                    return normalized;
                }
                this.logApiError('Save assessment', error);
                throw error;
            }
        });
    }
    saveAssessmentToServer(test) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = this.toTestDto(this.normalizeAssessment(test, this.getAssessmentDisplayName(test)));
            if (!isServerNumericId(dto.testId)) {
                dto.testId = '';
                dto.id = '';
                const created = yield this.apiPost('Test/create', dto);
                return this.mapApiTest(created || dto);
            }
            const updated = yield this.apiPut(`Test/update/${encodeURIComponent(dto.testId)}`, dto);
            return this.mapApiTest(updated || dto);
        });
    }
    saveTestQuestionMappings(testId, questionIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const serverTestId = normalizeServerId(testId);
            if (!serverTestId) {
                return;
            }
            const cleanedQuestionIds = (questionIds || []).map((id) => String(id !== null && id !== void 0 ? id : '').trim()).filter(Boolean);
            if (!cleanedQuestionIds.length) {
                return;
            }
            yield this.apiPost(`Test/${encodeURIComponent(serverTestId)}/questions`, cleanedQuestionIds);
        });
    }
    deleteTestDefinitionFromServer(testName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const test = yield this.resolveServerTest(testName);
                const serverTestId = normalizeServerId(test === null || test === void 0 ? void 0 : test.testId);
                if (serverTestId) {
                    yield this.apiDelete(`Test/${encodeURIComponent(serverTestId)}`);
                }
            }
            catch (error) {
                this.logApiFallback('Delete assessment', error);
            }
        });
    }
    //old one
    normalizeFileName(name) {
        const normalized = (name || '')
            .trim()
            .replace(/#/g, 'Sharp')
            .replace(/&/g, 'And')
            .replace(/\s+/g, '')
            .replace(/[^a-zA-Z0-9_-]/g, '');
        return normalized || 'Untitled';
    }
    getAssessmentKey(testName) {
        return `${this.assessmentPrefix}${this.normalizeFileName(testName)}`;
    }
    getSubmissionKey(username, testName) {
        return `${this.submittedPrefix}${this.normalizeFileName(username)}:${this.normalizeFileName(testName)}`;
    }
    getAssessmentPath(testName) {
        return `${this.assessmentServerPath}/${this.normalizeFileName(testName)}.json`;
    }
    getSubmissionPath(username, testName) {
        return `${this.submittedServerPath}/${this.normalizeFileName(username)}/${this.normalizeFileName(testName)}.json`;
    }
    // Frontend encryption is demo-level only. Real secure save/read should be handled by .NET backend.
    encryptData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = JSON.stringify(data);
            let encrypted = '';
            for (let index = 0; index < text.length; index += 1) {
                encrypted += String.fromCharCode(text.charCodeAt(index) ^ this.encryptionKey.charCodeAt(index % this.encryptionKey.length));
            }
            return btoa(unescape(encodeURIComponent(encrypted)));
        });
    }
    decryptData(encryptedText) {
        return __awaiter(this, void 0, void 0, function* () {
            const encrypted = decodeURIComponent(escape(atob(encryptedText)));
            let decrypted = '';
            for (let index = 0; index < encrypted.length; index += 1) {
                decrypted += String.fromCharCode(encrypted.charCodeAt(index) ^ this.encryptionKey.charCodeAt(index % this.encryptionKey.length));
            }
            return JSON.parse(decrypted);
        });
    }
    getStoredValue(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getIndexedDbValue(key)) || localStorage.getItem(key);
        });
    }
    setStoredValue(key, encryptedValue) {
        return __awaiter(this, void 0, void 0, function* () {
            localStorage.setItem(key, encryptedValue);
            yield this.setIndexedDbValue(key, encryptedValue);
        });
    }
    removeStoredValue(key) {
        return __awaiter(this, void 0, void 0, function* () {
            localStorage.removeItem(key);
            yield this.removeIndexedDbValue(key);
        });
    }
    getStoredKeys() {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = new Set();
            for (let index = 0; index < localStorage.length; index += 1) {
                const key = localStorage.key(index);
                if (key) {
                    keys.add(key);
                }
            }
            const indexedDbKeys = yield this.getIndexedDbKeys();
            indexedDbKeys.forEach((key) => keys.add(key));
            return Array.from(keys);
        });
    }
    openBrowserDb() {
        if (!('indexedDB' in window)) {
            return Promise.resolve(null);
        }
        return new Promise((resolve) => {
            const request = indexedDB.open(this.browserDbName, 1);
            request.onupgradeneeded = () => {
                const db = request.result;
                if (!db.objectStoreNames.contains(this.browserDbStoreName)) {
                    db.createObjectStore(this.browserDbStoreName);
                }
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => resolve(null);
            request.onblocked = () => resolve(null);
        });
    }
    getIndexedDbValue(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.openBrowserDb();
            if (!db) {
                return null;
            }
            return new Promise((resolve) => {
                const transaction = db.transaction(this.browserDbStoreName, 'readonly');
                const request = transaction.objectStore(this.browserDbStoreName).get(key);
                request.onsuccess = () => resolve(request.result || null);
                request.onerror = () => resolve(null);
                transaction.oncomplete = () => db.close();
                transaction.onerror = () => db.close();
            });
        });
    }
    setIndexedDbValue(key, encryptedValue) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.openBrowserDb();
            if (!db) {
                return;
            }
            return new Promise((resolve) => {
                const transaction = db.transaction(this.browserDbStoreName, 'readwrite');
                transaction.objectStore(this.browserDbStoreName).put(encryptedValue, key);
                transaction.oncomplete = () => {
                    db.close();
                    resolve();
                };
                transaction.onerror = () => {
                    db.close();
                    resolve();
                };
            });
        });
    }
    removeIndexedDbValue(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.openBrowserDb();
            if (!db) {
                return;
            }
            return new Promise((resolve) => {
                const transaction = db.transaction(this.browserDbStoreName, 'readwrite');
                transaction.objectStore(this.browserDbStoreName).delete(key);
                transaction.oncomplete = () => {
                    db.close();
                    resolve();
                };
                transaction.onerror = () => {
                    db.close();
                    resolve();
                };
            });
        });
    }
    getIndexedDbKeys() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = yield this.openBrowserDb();
            if (!db) {
                return [];
            }
            return new Promise((resolve) => {
                const transaction = db.transaction(this.browserDbStoreName, 'readonly');
                const request = transaction.objectStore(this.browserDbStoreName).getAllKeys();
                request.onsuccess = () => resolve(request.result.map((key) => String(key)));
                request.onerror = () => resolve([]);
                transaction.oncomplete = () => db.close();
                transaction.onerror = () => db.close();
            });
        });
    }
    loadQuestionBank(fallbackQuestions = []) {
        return __awaiter(this, void 0, void 0, function* () {
            const serverQuestions = yield this.loadQuestionBankFromServer();
            if (serverQuestions.length) {
                yield this.saveQuestionBankLocally(serverQuestions);
                return serverQuestions;
            }
            const encrypted = yield this.getStoredValue(this.questionBankKey);
            if (encrypted) {
                return this.cleanStoredQuestionBankAfterTwentyOnce(this.normalizeQuestionBank(yield this.decryptData(encrypted)));
            }
            const assetQuestions = yield this.readEncryptedAsset(this.questionBankServerPath);
            if (assetQuestions === null || assetQuestions === void 0 ? void 0 : assetQuestions.length) {
                const questions = this.normalizeQuestionBank(assetQuestions);
                yield this.saveQuestionBank(questions);
                return questions;
            }
            const fallback = this.normalizeQuestionBank(fallbackQuestions);
            if (fallback.length) {
                yield this.saveQuestionBank(fallback);
            }
            return fallback;
        });
    }
    saveQuestionBank(questions) {
        return __awaiter(this, void 0, void 0, function* () {
            const normalized = this.normalizeQuestionBank(questions);
            yield this.saveQuestionBankToServer(normalized);
            yield this.saveQuestionBankLocally(normalized);
        });
    }
    saveQuestionBankLocallyOnly(questions) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.saveQuestionBankLocally(questions);
        });
    }
    saveQuestionBankLocally(questions) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setStoredValue(this.questionBankKey, yield this.encryptData(this.normalizeQuestionBank(questions)));
        });
    }
    cleanStoredQuestionBankAfterTwentyOnce(questions) {
        return __awaiter(this, void 0, void 0, function* () {
            const alreadyCleaned = yield this.getStoredValue(this.questionBankCleanupKey);
            if (alreadyCleaned || questions.length <= this.questionBankCleanupKeepCount) {
                return questions;
            }
            const cleanedQuestions = questions.slice(0, this.questionBankCleanupKeepCount);
            yield this.saveQuestionBankLocally(cleanedQuestions);
            yield this.setStoredValue(this.questionBankCleanupKey, yield this.encryptData({ cleanedAt: new Date().toISOString(), kept: cleanedQuestions.length }));
            return cleanedQuestions;
        });
    }
    exportQuestionBank() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createEncryptedBlob('qlss-encrypted-question-bank', yield this.loadQuestionBank([]));
        });
    }
    importQuestionBank(file) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.importQuestionBankToServer(file);
            const questions = this.normalizeQuestionBank(yield this.readEncryptedFile(file));
            yield this.saveQuestionBank(questions);
            return questions;
        });
    }
    loadAssessment(testName) {
        return __awaiter(this, void 0, void 0, function* () {
            const serverAssessment = yield this.loadAssessmentFromServer(testName);
            if (serverAssessment) {
                yield this.saveAssessmentLocally(serverAssessment);
                return serverAssessment;
            }
            const encrypted = yield this.loadStoredAssessmentPayload(testName);
            if (encrypted) {
                return this.normalizeAssessment(yield this.decryptData(encrypted), testName);
            }
            const assetAssessment = yield this.readEncryptedAsset(this.getAssessmentPath(testName));
            return assetAssessment ? this.normalizeAssessment(assetAssessment, testName) : null;
        });
    }
    //   await this.saveAssessmentToServer(normalized);
    //   await this.saveAssessmentLocally(normalized);
    saveAssessmentLocally(test) {
        return __awaiter(this, void 0, void 0, function* () {
            const normalized = this.normalizeAssessment(test, this.getAssessmentDisplayName(test));
            const storageKey = this.getAssessmentKey(this.getAssessmentDisplayName(normalized));
            yield this.setStoredValue(storageKey, yield this.encryptData(normalized));
        });
    }
    listAssessments() {
        return __awaiter(this, void 0, void 0, function* () {
            const tests = [];
            const keys = yield this.getStoredKeys();
            for (const key of keys) {
                if (!key.startsWith(this.assessmentPrefix) && !key.startsWith(this.legacyTestPrefix)) {
                    continue;
                }
                const encrypted = yield this.getStoredValue(key);
                if (encrypted) {
                    tests.push(this.normalizeAssessment(yield this.decryptData(encrypted), key.replace(/^.*:/, '')));
                }
            }
            return tests;
        });
    }
    deleteTestDefinition(testName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.deleteTestDefinitionFromServer(testName);
            yield this.removeStoredValue(this.getAssessmentKey(testName));
            yield this.removeStoredValue(`${this.legacyTestPrefix}${this.normalizeFileName(testName)}`);
        });
    }
    exportAssessment(testName) {
        return __awaiter(this, void 0, void 0, function* () {
            const test = yield this.loadAssessment(testName);
            if (!test) {
                throw new Error('Assessment not found.');
            }
            return this.createEncryptedBlob('qlss-encrypted-assessment', test);
        });
    }
    saveAssessmentFileToServer(test, testType) {
        return __awaiter(this, void 0, void 0, function* () {
            const normalized = this.normalizeAssessment(test, this.getAssessmentDisplayName(test));
            const envelope = yield this.createEncryptedEnvelope('qlss-encrypted-assessment', normalized);
            const testId = normalizeServerId(normalized.testId);
            if (!testId) {
                throw new Error('A database test ID is required to save the assessment file.');
            }
            // Previous name-based endpoint: Test/save-file/{testType}/{testName}
            yield this.apiPost(`Test/save-file/${encodeURIComponent(testType)}/${encodeURIComponent(testId)}`, envelope);
        });
    }
    resolveAssessmentFileQuestions(testName, testType) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const serverTest = yield this.resolveServerTest(testName);
            let testId = normalizeServerId(serverTest === null || serverTest === void 0 ? void 0 : serverTest.testId);
            if (!testId) {
                throw new Error(`No database test ID was found for ${testName}.`);
            }
            // Previous name-based endpoint: Test/file/{testType}/{testName}
            const envelope = yield this.apiGet(`Test/file/${encodeURIComponent(testType)}/${encodeURIComponent(testId)}`);
            const payload = yield this.decryptData(envelope.encryptedPayload);
            const testDefinition = this.normalizeAssessment(payload, testName);
            const questions = this.normalizeQuestionBank(testDefinition.questions || []);
            const mappedIds = ((_a = testDefinition.questionOrder) === null || _a === void 0 ? void 0 : _a.length)
                ? testDefinition.questionOrder
                : testDefinition.mappedQuestionIds;
            const questionById = new Map(questions.map((question) => [this.getQuestionKey(question), question]));
            const orderedQuestions = mappedIds.length
                ? mappedIds
                    .map((questionId) => questionById.get(String(questionId)))
                    .filter((question) => !!question)
                : questions;
            return {
                testDefinition,
                questions: orderedQuestions.map((question, index) => (Object.assign(Object.assign({}, question), { questionNo: index + 1 }))),
                missingQuestionIds: mappedIds.filter((questionId) => !questionById.has(String(questionId))),
                inactiveQuestionIds: orderedQuestions
                    .filter((question) => question.isActive === false)
                    .map((question) => this.getQuestionKey(question))
            };
        });
    }
    loadStoredAssessmentPayload(testName) {
        return __awaiter(this, void 0, void 0, function* () {
            const storageKeys = this.getAssessmentStorageKeys(testName);
            for (const storageKey of storageKeys) {
                const encrypted = yield this.getStoredValue(storageKey);
                if (encrypted) {
                    return encrypted;
                }
            }
            return null;
        });
    }
    getAssessmentStorageKeys(testName) {
        const normalizedName = this.normalizeFileName(testName);
        return [
            this.getAssessmentKey(normalizedName),
            `${this.legacyTestPrefix}${normalizedName}`,
            `${this.draftPrefix}${normalizedName}`
        ];
    }
    getAssessmentDisplayName(test) {
        return (test === null || test === void 0 ? void 0 : test.displayName) || (test === null || test === void 0 ? void 0 : test.testName) || (test === null || test === void 0 ? void 0 : test.testTitle) || this.fallbackAssessmentName;
    }
    importAssessment(file) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.importAssessmentToServer(file);
            const test = this.normalizeAssessment(yield this.readEncryptedFile(file));
            yield this.saveAssessment(test);
            return test;
        });
    }
    resolveAssessmentQuestions(testName, assetFileName) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const serverAttempt = yield this.loadCompleteTestFromServer(testName);
            if (serverAttempt) {
                yield this.saveAssessmentLocally(serverAttempt.testDefinition);
                if (serverAttempt.questions.length) {
                    const questionBank = yield this.loadQuestionBank([]);
                    yield this.saveQuestionBankLocally(this.mergeQuestions(questionBank, serverAttempt.questions));
                }
                return serverAttempt;
            }
            let testDefinition = null;
            if (assetFileName) {
                testDefinition = yield this.loadAssessment(assetFileName);
            }
            if (!testDefinition) {
                testDefinition = yield this.loadAssessment(testName);
            }
            if (!testDefinition) {
                throw new Error('Assessment not found.');
            }
            const questionBank = yield this.loadQuestionBank([]);
            const questions = this.resolveMappedQuestions(testDefinition, questionBank);
            const resolvedIds = questions.map((question) => this.getQuestionKey(question));
            const mappedIds = ((_a = testDefinition.questionOrder) === null || _a === void 0 ? void 0 : _a.length) ? testDefinition.questionOrder : testDefinition.mappedQuestionIds;
            return {
                testDefinition,
                questions,
                missingQuestionIds: mappedIds.filter((questionId) => !resolvedIds.includes(questionId)),
                inactiveQuestionIds: questions.filter((question) => question.isActive === false).map((question) => this.getQuestionKey(question))
            };
        });
    }
    saveTestDefinition(test) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.saveAssessment(test);
        });
    }
    loadTestDefinition(testName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.loadAssessment(testName);
        });
    }
    listTestDefinitions() {
        return __awaiter(this, void 0, void 0, function* () {
            const serverTests = yield this.loadTestsFromServer();
            const localTests = yield this.listAssessments();
            const assetTests = yield this.loadAssetTestDefinitions();
            const tests = new Map();
            assetTests.forEach((test) => {
                tests.set(test.testName, test);
            });
            localTests.forEach((test) => {
                tests.set(test.testName, test);
            });
            serverTests.forEach((test) => {
                tests.set(test.testName, test);
            });
            return Array.from(tests.values());
        });
    }
    listTrainingsForTest() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = new HttpParams().set('pageNumber', '1').set('pageSize', '1000');
            const response = yield this.apiGet('training', params);
            const items = (response === null || response === void 0 ? void 0 : response.items) || (response === null || response === void 0 ? void 0 : response.Items) || (Array.isArray(response) ? response : []);
            return items
                .map((item) => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                return ({
                    trainingId: String((_b = (_a = item.trainingId) !== null && _a !== void 0 ? _a : item.TrainingId) !== null && _b !== void 0 ? _b : ''),
                    trainingName: (_d = (_c = item.trainingName) !== null && _c !== void 0 ? _c : item.TrainingName) !== null && _d !== void 0 ? _d : '',
                    displayName: (_h = (_g = (_f = (_e = item.displayName) !== null && _e !== void 0 ? _e : item.DisplayName) !== null && _f !== void 0 ? _f : item.trainingName) !== null && _g !== void 0 ? _g : item.TrainingName) !== null && _h !== void 0 ? _h : ''
                });
            })
                .filter((item) => item.trainingId && item.displayName);
        });
    }
    validatePostTestAccess(email, trainingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = new HttpParams()
                .set('email', email.trim())
                .set('trainingId', trainingId.trim());
            const response = yield this.apiGet('certification-data/validate-test-access', params);
            return (response === null || response === void 0 ? void 0 : response.isValid) === true;
        });
    }
    exportTestDefinition(testName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.exportAssessment(testName);
        });
    }
    loadAssetTestDefinitions() {
        return __awaiter(this, void 0, void 0, function* () {
            const fileNames = yield this.loadAssessmentManifest();
            const results = [];
            for (const fileName of fileNames) {
                const assetPath = `${this.assessmentServerPath}/${fileName}`;
                const test = yield this.readEncryptedAsset(assetPath);
                if (!test) {
                    continue;
                }
                const normalizedFileName = fileName.replace(/\.json$/i, '');
                const normalized = this.normalizeAssessment(test, normalizedFileName);
                normalized.assetFileName = normalizedFileName;
                results.push(normalized);
            }
            return results;
        });
    }
    loadAssessmentManifest() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield firstValueFrom(this.http.get(this.assessmentManifestPath));
            }
            catch (_a) {
                return [];
            }
        });
    }
    importTestDefinition(file) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.importAssessment(file);
        });
    }
    saveTestDraft(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.saveAssessment(payload);
        });
    }
    loadTestDraft(testName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.loadAssessment(testName);
        });
    }
    exportTestDraft(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createEncryptedBlob('qlss-encrypted-assessment', this.normalizeAssessment(payload));
        });
    }
    loadTestForAttempt(testName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.resolveAssessmentQuestions(testName);
        });
    }
    resolveMappedQuestions(testDefinition, questionBank) {
        var _a;
        const mappedIds = ((_a = testDefinition.questionOrder) === null || _a === void 0 ? void 0 : _a.length) ? testDefinition.questionOrder : testDefinition.mappedQuestionIds;
        return mappedIds
            .map((questionId, index) => {
            const question = questionBank.find((item) => this.getQuestionKey(item) === questionId && item.isActive !== false);
            return question ? Object.assign(Object.assign({}, question), { questionNo: index + 1 }) : null;
        })
            .filter((question) => !!question);
    }
    getQuestionUsage(questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const affectedTests = yield this.getAffectedTests(questionId);
            return { questionId, usageCount: affectedTests.length, affectedTests };
        });
    }
    getAffectedTests(questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tests = yield this.listAssessments();
            return tests.filter((test) => test.mappedQuestionIds.includes(questionId));
        });
    }
    saveSubmissionResult(submission) {
        return __awaiter(this, void 0, void 0, function* () {
            const normalized = this.normalizeSubmission(submission);
            const savedSubmissionId = yield this.saveSubmissionToServer(normalized);
            if (savedSubmissionId) {
                normalized.submissionId = savedSubmissionId;
                submission.submissionId = savedSubmissionId;
            }
            yield this.saveSubmissionFileToServer(normalized);
            yield this.setStoredValue(this.getSubmissionKey(normalized.username, normalized.testName), yield this.encryptData(normalized));
        });
    }
    saveSubmissionFileToServer(submission) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const username = String(submission.username || '').trim();
            const trainingId = String(((_a = submission.testDetailsSnapshot) === null || _a === void 0 ? void 0 : _a.trainingId)
                || ((_b = submission.questions.find((question) => question.trainingId)) === null || _b === void 0 ? void 0 : _b.trainingId)
                || '').trim();
            const testType = String(((_c = submission.testDetailsSnapshot) === null || _c === void 0 ? void 0 : _c.testFileType) || '').trim().toLowerCase();
            if (!username) {
                throw new Error('Username is required to save the result file.');
            }
            if (!trainingId) {
                throw new Error('Training ID is required to save the result file.');
            }
            if (!['pre', 'post', 'assessment', 'chalange', 'nor'].includes(testType)) {
                throw new Error('Test type must be pre, post, assessment, chalange, or NOR.');
            }
            const envelope = yield this.createEncryptedEnvelope('qlss-encrypted-test-submission', this.normalizeSubmission(submission));
            yield this.apiPost(`results/save-file/${encodeURIComponent(testType)}/${encodeURIComponent(trainingId)}/${encodeURIComponent(username)}`, envelope);
        });
    }
    loadSubmissionFileFromServer(testType, trainingId, username) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!testType || !trainingId.trim() || !username.trim()) {
                throw new Error('Test type, training ID, and username are required to read the result file.');
            }
            const envelope = yield this.apiGet(`results/file/${encodeURIComponent(testType)}/${encodeURIComponent(trainingId)}/${encodeURIComponent(username)}`);
            if (!(envelope === null || envelope === void 0 ? void 0 : envelope.encryptedPayload)) {
                return null;
            }
            return this.normalizeSubmission(yield this.decryptData(envelope.encryptedPayload));
        });
    }
    loadSavedSubmission(username, testName) {
        return __awaiter(this, void 0, void 0, function* () {
            const serverSubmission = yield this.loadSubmissionFromServer(username, testName);
            if (serverSubmission) {
                yield this.setStoredValue(this.getSubmissionKey(serverSubmission.username, serverSubmission.testName), yield this.encryptData(serverSubmission));
                return serverSubmission;
            }
            const encrypted = yield this.getStoredValue(this.getSubmissionKey(username, testName));
            return encrypted ? this.decryptData(encrypted) : null;
        });
    }
    listSavedResults() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = [];
            const keys = yield this.getStoredKeys();
            for (const key of keys) {
                if (!key.startsWith(this.submittedPrefix)) {
                    continue;
                }
                try {
                    const encrypted = yield this.getStoredValue(key);
                    if (!encrypted) {
                        continue;
                    }
                    const submission = yield this.decryptData(encrypted);
                    items.push(this.buildSavedResultListItem(key, submission));
                }
                catch (_a) {
                    const parts = key.replace(this.submittedPrefix, '').split(':');
                    items.push({ key, username: parts[0] || '', normalizedUsername: parts[0] || '', testName: parts[1] || '', fileName: parts[1] || '', submittedAt: '', percentage: 0, score: 0, passed: false, isAutoSubmitted: false });
                }
            }
            return items;
        });
    }
    listResultUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = new Set();
            try {
                const response = yield this.apiGet('results');
                const resultItems = Array.isArray(response) ? response : [response];
                for (const item of resultItems) {
                    const source = (item === null || item === void 0 ? void 0 : item.userResult) || item || {};
                    const directUsername = String(source.username || source.userName || source.normalizedUsername || '').trim();
                    if (directUsername) {
                        users.add(directUsername);
                        continue;
                    }
                    const submission = yield this.mapApiSubmission(item);
                    if (submission === null || submission === void 0 ? void 0 : submission.username) {
                        users.add(submission.username);
                    }
                }
            }
            catch (error) {
                this.logApiFallback('Load result users', error);
            }
            const savedResults = yield this.listSavedResults();
            savedResults.forEach((item) => {
                const username = (item.username || item.normalizedUsername || '').trim();
                if (username) {
                    users.add(username);
                }
            });
            return Array.from(users).sort((a, b) => a.localeCompare(b));
        });
    }
    getSavedResultList() {
        const items = [];
        for (let index = 0; index < localStorage.length; index += 1) {
            const key = localStorage.key(index) || '';
            if (!key.startsWith(this.submittedPrefix)) {
                continue;
            }
            const parts = key.replace(this.submittedPrefix, '').split(':');
            items.push({ key, username: parts[0] || '', normalizedUsername: parts[0] || '', testName: parts[1] || '', fileName: parts[1] || '', submittedAt: '', percentage: 0, score: 0, passed: false, isAutoSubmitted: false });
        }
        return items;
    }
    exportSubmissionResult(usernameOrSubmission, testName) {
        return __awaiter(this, void 0, void 0, function* () {
            const submission = typeof usernameOrSubmission === 'string'
                ? yield this.loadSavedSubmission(usernameOrSubmission, testName || '')
                : usernameOrSubmission;
            if (!submission) {
                throw new Error('Saved submission not found.');
            }
            return this.createEncryptedBlob('qlss-encrypted-test-submission', this.normalizeSubmission(submission));
        });
    }
    deleteSavedSubmission(username, testName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.removeStoredValue(testName ? this.getSubmissionKey(username, testName) : username);
        });
    }
    buildSubmissionKey(username, testName) {
        return this.getSubmissionKey(username, testName);
    }
    buildSubmittedServerPath(username, testName) {
        return this.getSubmissionPath(username, testName);
    }
    buildAssessmentFileName(testName) {
        return `${this.normalizeFileName(testName || 'Assessment')}.json`;
    }
    buildTestKey(testName) {
        return this.getAssessmentKey(testName);
    }
    getQuestionKey(question) {
        return question.questionId || `${question.id}`;
    }
    downloadBlob(blob, fileName) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        URL.revokeObjectURL(link.href);
    }
    loadQuestionBankFromServer() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.apiGet('Question');
                const questions = response || [];
                return this.normalizeQuestionBank(questions.map((question, index) => this.mapApiQuestion(question, index)));
            }
            catch (error) {
                this.logApiFallback('Load question bank', error);
                return [];
            }
        });
    }
    saveQuestionToServer(question, _isUpdate = false) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const normalized = this.normalizeQuestionBank([question])[0];
            const dto = this.toQuestionDto(normalized);
            try {
                if (!isServerNumericId(dto.questionId)) {
                    dto.questionId = '';
                    dto.id = (_a = dto.id) !== null && _a !== void 0 ? _a : '';
                    const createResponse = yield this.apiPost('Question/create', dto);
                    return this.mapApiQuestion(createResponse || dto, 0);
                }
                const updateResponse = yield this.apiPut(`Question/update/${dto.questionId}`, dto);
                return this.mapApiQuestion(updateResponse || dto, 0);
            }
            catch (error) {
                if (!this.canUseLocalFallback(error)) {
                    this.logApiError('Save question', error);
                    throw new Error(this.getApiErrorMessage(error));
                }
                this.logApiFallback('Save question', error);
                return null;
            }
        });
    }
    saveQuestionBankToServer(questions) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (const question of this.normalizeQuestionBank(questions)) {
                    yield this.saveQuestionToServer(question);
                }
            }
            catch (error) {
                this.logApiFallback('Save question bank', error);
            }
        });
    }
    //   try {
    //   try {
    //       dto.testId = '';
    //       dto.id = '';
    //       savedResponse = await this.apiPost<any>('Test/create', dto);
    //       savedResponse = await this.apiPut<any>(`Test/update/${dto.testId}`, dto);
    //     await this.saveTestQuestionMappings(savedTest.testId || normalizedTest.testId, normalizedTest.questionOrder);
    loadSubmissionFromServer(username, testName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.apiGet('results/user/' + encodeURIComponent(username));
                const resultItems = Array.isArray(response) ? response : [response];
                const submissions = yield Promise.all(resultItems.map((item) => this.mapApiSubmission(item)));
                const normalizedTestName = this.normalizeFileName(testName).toLowerCase();
                return submissions.find((submission) => !!submission && this.normalizeFileName(submission.testName).toLowerCase() === normalizedTestName) || null;
            }
            catch (error) {
                this.logApiFallback('Load saved submission', error);
                return null;
            }
        });
    }
    saveSubmissionToServer(submission) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const normalizedSubmission = this.normalizeSubmission(submission);
                const saved = yield this.apiPost('results/submit', yield this.toUserResultDto(normalizedSubmission));
                return String((saved === null || saved === void 0 ? void 0 : saved.submissionId) || (saved === null || saved === void 0 ? void 0 : saved.SubmissionId) || '').trim() || null;
            }
            catch (error) {
                this.logApiError('Save submission result', error);
                throw new Error(this.getApiErrorMessage(error));
            }
        });
    }
    loadTestDefinitionFromServer(testName) {
        return this.loadAssessmentFromServer(testName);
    }
    loadTestDraftFromServer(testName) {
        return this.loadAssessmentFromServer(testName);
    }
    importQuestionExcelToServer(file) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.postFileToServer('Question/import-excel', file, 'Import question Excel');
        });
    }
    importAssessmentExcelToServer(file) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.postFileToServer('Test/import-excel', file, 'Import assessment Excel');
        });
    }
    //   try {
    //   try {
    mapQuestionToTestOnServer(testId, questionId, questionNo) {
        return __awaiter(this, void 0, void 0, function* () {
            const serverTestId = normalizeServerId(testId);
            const serverQuestionId = normalizeServerId(questionId);
            if (!serverTestId || !serverQuestionId) {
                return;
            }
            try {
                yield this.apiPost('TestQuestion/map', { testId: Number(serverTestId), questionId: serverQuestionId, order: questionNo, questionNo });
            }
            catch (error) {
                this.logApiFallback('Map question to test', error);
            }
        });
    }
    unmapQuestionFromTestOnServer(testId, questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const serverTestId = normalizeServerId(testId);
            const serverQuestionId = normalizeServerId(questionId);
            if (!serverTestId || !serverQuestionId) {
                return;
            }
            try {
                yield this.apiDelete('TestQuestion/unmap', { testId: Number(serverTestId), questionId: serverQuestionId });
            }
            catch (error) {
                this.logApiFallback('Unmap question from test', error);
            }
        });
    }
    deleteQuestionFromServer(questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const serverQuestionId = normalizeServerId(questionId);
            if (!serverQuestionId) {
                return;
            }
            try {
                yield this.apiDelete(`Question/${encodeURIComponent(serverQuestionId)}`);
            }
            catch (error) {
                this.logApiFallback('Delete question', error);
            }
        });
    }
    uploadMediaFile(mediaType, file, scope = 'generic') {
        return __awaiter(this, void 0, void 0, function* () {
            const endpoint = scope === 'test'
                ? `Media/upload-test/${mediaType}`
                : scope === 'question'
                    ? `Media/upload-question/${mediaType}`
                    : scope === 'answer'
                        ? `Media/upload-answer/${mediaType}`
                        : `Media/upload/${mediaType}`;
            const formData = new FormData();
            formData.append('file', file);
            try {
                const response = yield this.apiPost(endpoint, formData);
                return this.extractMediaPath(response);
            }
            catch (_a) {
                return null;
            }
        });
    }
    importQuestionBankToServer(file) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.postFileToServer('Question/import', file, 'Import question bank');
        });
    }
    importAssessmentToServer(file) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.postFileToServer('Test/import', file, 'Import assessment');
        });
    }
    postFileToServer(endpoint, file, action) {
        return __awaiter(this, void 0, void 0, function* () {
            const formData = new FormData();
            formData.append('file', file);
            try {
                yield this.apiPost(endpoint, formData);
            }
            catch (error) {
                this.logApiFallback(action, error);
            }
        });
    }
    //   try {
    //       await this.apiDelete(`Test/${encodeURIComponent(serverTestId)}`);
    //   try {
    //   try {
    //     try {
    //     test.testId === testName ||
    mapApiTest(value) {
        const source = (value === null || value === void 0 ? void 0 : value.test) || (value === null || value === void 0 ? void 0 : value.testDefinition) || value || {};
        const rawQuestionIds = this.pickArray(source, ['mappedQuestionIds', 'questionOrder', 'questionIds']);
        const questions = this.pickArray(source, ['questions', 'mappedQuestions', 'testQuestions']).map((question, index) => this.mapApiQuestion(question, index));
        const mappedQuestionIds = rawQuestionIds.length ? rawQuestionIds.map((id) => String(id)) : questions.map((question) => this.getQuestionKey(question));
        const displayName = source.displayName || source.testName || source.name || source.title || source.testTitle || 'Test 1';
        return this.normalizeAssessment(Object.assign(Object.assign({}, source), { testId: String(source.testId || source.id || `test-${this.normalizeFileName(displayName)}`), testName: displayName, displayName, fileName: source.fileName || this.normalizeFileName(displayName), testTitle: source.testTitle || source.title || displayName, description: source.description || '', trainingId: source.trainingId || '', trainingName: source.trainingName || '', subject: source.subject || '', topic: source.topic || '', durationMinutes: Number(source.durationMinutes || source.duration || 30), passingPercentage: Number(source.passingPercentage || source.passPercentage || 60), instructions: source.instructions || '', status: source.status || 'Active', mappedQuestionIds, questionOrder: mappedQuestionIds, totalQuestions: Number(source.totalQuestions || mappedQuestionIds.length || questions.length), totalMarks: Number(source.totalMarks || questions.reduce((sum, question) => sum + (question.marks || 1), 0)), createdAt: source.createdAt || source.createdOn || new Date().toISOString(), updatedAt: source.updatedAt || source.updatedOn || new Date().toISOString(), version: Number(source.version || 1), questions }));
    }
    mapApiQuestion(value, index) {
        var _a, _b, _c, _d, _e;
        const source = (value === null || value === void 0 ? void 0 : value.question) || value || {};
        const options = this.pickArray(source, ['options', 'answerOptions', 'answers']).map((option, optionIndex) => {
            var _a, _b, _c, _d;
            return ({
                id: toStringId((_d = (_c = (_b = (_a = option.id) !== null && _a !== void 0 ? _a : option.optionId) !== null && _b !== void 0 ? _b : option.optionKey) !== null && _c !== void 0 ? _c : option.key) !== null && _d !== void 0 ? _d : optionIndex + 1),
                text: option.text || option.optionText || option.answerText || '',
                imageUrl: option.imageUrl || option.mediaUrl || option.imagePath || '',
                imageAlt: option.imageAlt || ''
            });
        });
        const explicitCorrectOptionIds = this.pickArray(source, ['correctOptionIds', 'correctAnswerIds']).map((id) => toStringId(id));
        const optionCorrectIds = this.pickArray(source, ['options', 'answerOptions', 'answers'])
            .filter((option) => option.isCorrect === true || option.isCorrect === 1 || option.isCorrect === '1')
            .map((option, optionIndex) => { var _a, _b, _c, _d; return toStringId((_d = (_c = (_b = (_a = option.id) !== null && _a !== void 0 ? _a : option.optionId) !== null && _b !== void 0 ? _b : option.optionKey) !== null && _c !== void 0 ? _c : option.key) !== null && _d !== void 0 ? _d : optionIndex + 1); });
        const correctOptionIds = explicitCorrectOptionIds.length ? explicitCorrectOptionIds : optionCorrectIds;
        const externalQuestionId = toStringId((_b = (_a = source.externalQuestionId) !== null && _a !== void 0 ? _a : source.questionId) !== null && _b !== void 0 ? _b : source.id) || `q-${Date.now()}-${index}`;
        return Object.assign(Object.assign({}, source), { id: toNumberId((_d = (_c = source.localId) !== null && _c !== void 0 ? _c : source.questionNumericId) !== null && _d !== void 0 ? _d : source.numericId), questionId: externalQuestionId, questionNo: toNumberId((_e = source.questionNo) !== null && _e !== void 0 ? _e : source.order) || index + 1, trainingId: toStringId(source.trainingId), trainingName: source.trainingName || '', questionType: this.normalizeQuestionType(source.questionType || source.type), subject: source.subject || '', topic: source.topic || '', difficulty: source.difficulty || 'Easy', questionText: source.questionText || source.text || '', questionImageUrl: source.questionImageUrl || source.imageUrl || '', questionImageAlt: source.questionImageAlt || '', audioUrl: source.audioUrl || '', videoUrl: source.videoUrl || source.videoPath || '', options: source.questionType === 'ESSAY' ? undefined : options, correctOptionId: source.correctOptionId || source.correctAnswerId || correctOptionIds[0] || '', correctOptionIds: correctOptionIds.length ? correctOptionIds : (source.correctOptionId || source.correctAnswerId ? [toStringId(source.correctOptionId || source.correctAnswerId)] : []), expectedAnswer: source.expectedAnswer || '', sampleAnswer: source.sampleAnswer || '', explanation: source.explanation || '', explanationImageUrl: source.explanationImageUrl || '', explanationImageAlt: source.explanationImageAlt || '', marks: Number(source.marks || 1), negativeMarks: Number(source.negativeMarks || 0), estimatedTimeSeconds: Number(source.estimatedTimeSeconds || source.timeSeconds || 60), isActive: source.isActive !== false && source.active !== false, version: Number(source.version || 1), createdAt: source.createdAt || source.createdOn || new Date().toISOString(), updatedAt: source.updatedAt || source.updatedOn || new Date().toISOString() });
    }
    loadSubmissionByResultIdFromServer(usersResultId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.mapApiSubmission(yield this.apiGet(`results/${encodeURIComponent(usersResultId)}`));
            }
            catch (_a) {
                return null;
            }
        });
    }
    loadSubmissionBySubmissionIdFromServer(submissionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.mapApiSubmission(yield this.apiGet(`results/${encodeURIComponent(submissionId)}`));
            }
            catch (_a) {
                return null;
            }
        });
    }
    loadSubmissionsByUserIdFromServer(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.apiGet('results/user/' + encodeURIComponent(userId));
                const resultItems = Array.isArray(response) ? response : [response];
                const submissions = yield Promise.all(resultItems.map((item) => this.mapApiSubmission(item)));
                return submissions.filter((submission) => !!submission);
            }
            catch (error) {
                this.logApiFallback('Load submissions by user id', error);
                return [];
            }
        });
    }
    mapApiSubmission(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const source = (value === null || value === void 0 ? void 0 : value.userResult) || value || {};
            if (source.encryptedResultPayload) {
                try {
                    return this.normalizeSubmission(yield this.decryptData(source.encryptedResultPayload));
                }
                catch (_a) { }
            }
            const rawPayload = source.resultPayloadJson || source.jsonResultPayload || source.payload;
            if (!rawPayload) {
                return null;
            }
            try {
                const parsed = typeof rawPayload === 'string' ? JSON.parse(rawPayload) : rawPayload;
                return this.normalizeSubmission(parsed);
            }
            catch (_b) {
                return null;
            }
        });
    }
    //     id: test.testId,
    //     testId: toStringId(test.testId),
    //     trainingId: toStringId(test.trainingId),
    //     title: test.testTitle,
    //     testTitle: test.testTitle,
    //     mappedQuestionIds: mappedQuestionIds.map((id) => toStringId(id)),
    //     questionOrder: mappedQuestionIds.map((id) => toStringId(id)),
    //     questions: test.questions,
    //     status: test.status,
    //     metadata: { fileName: test.fileName, displayName: test.displayName }
    toQuestionDto(question) {
        var _a;
        const questionId = question.questionId || toStringId(question.id);
        const trainingId = toStringId(question.trainingId).trim();
        const selectedOptionIds = (((_a = question.correctOptionIds) === null || _a === void 0 ? void 0 : _a.length)
            ? question.correctOptionIds
            : (question.correctOptionId ? [question.correctOptionId] : [])).map((optionId) => toStringId(optionId));
        const correctOptionIds = question.questionType === 'MCSA' || question.questionType === 'TRUE_FALSE'
            ? selectedOptionIds.slice(0, 1)
            : selectedOptionIds;
        const correctOptionId = correctOptionIds[0] || '';
        return {
            id: questionId,
            questionId,
            trainingId,
            trainingName: question.trainingName || '',
            questionNo: question.questionNo || 0,
            questionType: question.questionType,
            subject: question.subject || '',
            topic: question.topic || '',
            difficulty: question.difficulty || 'Easy',
            questionText: question.questionText || '',
            questionImageUrl: question.questionImageUrl || '',
            questionImageAlt: question.questionImageAlt || '',
            audioUrl: question.audioUrl || '',
            videoUrl: question.videoUrl || '',
            options: (question.options || []).map((option, index) => {
                const optionId = toStringId(option.id);
                return {
                    id: optionId,
                    text: option.text || '',
                    imageUrl: option.imageUrl || '',
                    audioUrl: option.audioUrl || '',
                    videoUrl: option.videoUrl || '',
                    imageAlt: option.imageAlt || '',
                    displayOrder: index + 1,
                    isCorrect: correctOptionIds.includes(optionId)
                };
            }),
            correctOptionId,
            correctOptionIds,
            expectedAnswer: question.expectedAnswer || '',
            sampleAnswer: question.sampleAnswer || '',
            manualReviewRequired: question.manualReviewRequired === true,
            explanation: question.explanation || '',
            explanationImageUrl: question.explanationImageUrl || '',
            explanationImageAlt: question.explanationImageAlt || '',
            marks: question.marks || 1,
            negativeMarks: question.negativeMarks || 0,
            estimatedTimeSeconds: question.estimatedTimeSeconds || 60,
            isActive: question.isActive !== false,
            version: question.version || 1,
            createdAt: question.createdAt || new Date().toISOString(),
            updatedAt: question.updatedAt || new Date().toISOString()
        };
    }
    findTestByNameOrId(tests, testName) {
        const normalizedName = this.normalizeFileName(testName).toLowerCase();
        return tests.find((test) => test.testId === testName ||
            this.normalizeFileName(test.testName).toLowerCase() === normalizedName ||
            this.normalizeFileName(test.displayName || '').toLowerCase() === normalizedName ||
            this.normalizeFileName(test.fileName || '').toLowerCase() === normalizedName ||
            this.normalizeFileName(test.testTitle || '').toLowerCase() === normalizedName) || null;
    }
    //     testId: Number(serverTestId),
    //     questionId,
    //     order: index + 1,
    //     questionNo: index + 1
    //   await this.apiPost('Test/' + encodeURIComponent(serverTestId) + '/questions', {
    //     testId: serverTestId,
    //     questionIds: serverQuestionIds,
    //     mappedQuestionIds: serverQuestionIds,
    //     questionOrder: serverQuestionIds,
    //     mappings
    toUserResultDto(submission) {
        return __awaiter(this, void 0, void 0, function* () {
            const normalizedSubmission = this.normalizeSubmission(submission);
            const summary = normalizedSubmission.resultSummary;
            const toBreakdowns = (breakdownType, items) => items.map((item) => ({
                breakdownType, label: item.label, total: item.total, correct: item.correct || 0,
                marks: item.marks || 0, obtainedMarks: item.obtainedMarks || 0
            }));
            return {
                submissionId: normalizedSubmission.submissionId,
                username: normalizedSubmission.username,
                normalizedUsername: normalizedSubmission.normalizedUsername,
                testId: normalizedSubmission.testId,
                testName: normalizedSubmission.testName,
                displayName: normalizedSubmission.displayName,
                fileName: normalizedSubmission.fileName,
                testTitle: normalizedSubmission.testTitle,
                submittedAt: normalizedSubmission.submittedAt,
                isAutoSubmitted: normalizedSubmission.isAutoSubmitted,
                resultSource: normalizedSubmission.resultSource,
                totalDurationSeconds: normalizedSubmission.totalDurationSeconds,
                totalTimeUsedSeconds: normalizedSubmission.totalTimeUsedSeconds,
                testSnapshotJson: JSON.stringify(normalizedSubmission.testDetailsSnapshot || {}),
                questionSnapshotsJson: JSON.stringify(normalizedSubmission.questionSnapshots || normalizedSubmission.questions),
                summary: Object.assign(Object.assign({}, summary), { breakdownType: 'total', label: 'Total', total: summary.totalQuestions, marks: summary.totalMarks }),
                userAnswers: normalizedSubmission.userAnswers.map((answer) => (Object.assign(Object.assign({}, answer), { submissionId: normalizedSubmission.submissionId, questionId: String(answer.questionId), selectedOptionId: answer.selectedOptionId || '', firstVisitedAt: answer.firstVisitedAt ? new Date(answer.firstVisitedAt).toISOString() : null, lastVisitedAt: answer.lastVisitedAt ? new Date(answer.lastVisitedAt).toISOString() : null }))),
                questionResults: (normalizedSubmission.questionResults || normalizedSubmission.solutionReview).map((item) => (Object.assign(Object.assign({}, item), { submissionId: normalizedSubmission.submissionId, questionId: String(item.questionId), selectedOptionId: item.selectedOptionId || '', correctOptionId: item.correctOptionId || '', mediaUrlsJson: JSON.stringify(item.mediaUrls || {}), isManualReview: item.evaluationStatus === 'manualReview' }))),
                breakdowns: [
                    ...toBreakdowns('questionType', normalizedSubmission.questionTypeBreakdown),
                    ...toBreakdowns('difficulty', normalizedSubmission.difficultyBreakdown),
                    ...toBreakdowns('subject', normalizedSubmission.subjectWiseSummary),
                    ...toBreakdowns('topic', normalizedSubmission.topicWiseSummary)
                ]
            };
        });
    }
    normalizeQuestionType(value) {
        const type = String(value || 'MCSA').trim().toUpperCase();
        return (type === 'MSCA' ? 'MCSA' : type);
    }
    extractMediaPath(response) {
        if (!response) {
            return null;
        }
        if (typeof response === 'string') {
            return response;
        }
        return response.relativePath || response.path || response.url || response.mediaUrl || response.filePath || null;
    }
    pickArray(source, keys) {
        for (const key of keys) {
            if (Array.isArray(source === null || source === void 0 ? void 0 : source[key])) {
                return source[key];
            }
        }
        return [];
    }
    mergeQuestions(existing, incoming) {
        const questions = new Map();
        existing.forEach((question) => questions.set(this.getQuestionKey(question), question));
        incoming.forEach((question) => questions.set(this.getQuestionKey(question), question));
        return Array.from(questions.values());
    }
    readEncryptedAsset(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const parsed = yield firstValueFrom(this.http.get(path));
                return this.decryptWrappedPayload(parsed);
            }
            catch (_a) {
                return null;
            }
        });
    }
    createEncryptedBlob(fileType, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.createJsonBlob(yield this.createEncryptedEnvelope(fileType, payload));
        });
    }
    createEncryptedEnvelope(fileType, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                fileType,
                version: 1,
                createdAt: new Date().toISOString(),
                encryptedPayload: yield this.encryptData(payload)
            };
        });
    }
    readEncryptedFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileText = yield file.text();
            const parsed = JSON.parse(fileText);
            return parsed.encryptedPayload ? this.decryptData(parsed.encryptedPayload) : this.decryptData(fileText);
        });
    }
    decryptWrappedPayload(value) {
        if (value === null || value === void 0 ? void 0 : value.encryptedPayload) {
            return this.decryptData(value.encryptedPayload);
        }
        if (typeof value === 'string') {
            return this.decryptData(value);
        }
        return Promise.resolve(value);
    }
    normalizeQuestionBank(questions) {
        const now = new Date().toISOString();
        return (questions || []).map((question, index) => (Object.assign(Object.assign({}, question), { id: question.id || Date.now() + index, questionId: question.questionId || `q-${question.id || Date.now() + index}`, questionNo: index + 1, trainingId: question.trainingId || '', trainingName: question.trainingName || '', marks: question.marks && question.marks > 0 ? question.marks : 1, estimatedTimeSeconds: question.estimatedTimeSeconds && question.estimatedTimeSeconds > 0 ? question.estimatedTimeSeconds : 60, isActive: question.isActive !== false, version: question.version || 1, createdAt: question.createdAt || now, updatedAt: question.updatedAt || now })));
    }
    normalizeAssessment(test, fallbackName = 'Test 1') {
        var _a;
        const displayName = test.displayName || test.testTitle || test.testName || fallbackName || 'Test 1';
        const fileName = this.normalizeFileName(test.fileName || displayName);
        const now = new Date().toISOString();
        return Object.assign(Object.assign({}, test), { testId: test.testId || `test-${fileName}`, testName: displayName, displayName,
            fileName, testTitle: test.testTitle || displayName, mappedQuestionIds: test.mappedQuestionIds || [], questionOrder: ((_a = test.questionOrder) === null || _a === void 0 ? void 0 : _a.length) ? test.questionOrder : (test.mappedQuestionIds || []), totalQuestions: test.totalQuestions || (test.mappedQuestionIds || []).length, totalMarks: test.totalMarks || 0, createdAt: test.createdAt || now, updatedAt: now, version: test.version || 1 });
    }
    normalizeSubmission(submission) {
        const displayName = submission.displayName || submission.testTitle || submission.testName || 'Test 1';
        const fileName = this.normalizeFileName(submission.fileName || displayName);
        const username = submission.username || 'demo-user';
        return Object.assign(Object.assign({}, submission), { username, normalizedUsername: this.normalizeFileName(submission.normalizedUsername || username), displayName,
            fileName, testName: displayName });
    }
    buildSavedResultListItem(key, submission) {
        return {
            key,
            username: submission.username,
            normalizedUsername: submission.normalizedUsername || this.normalizeFileName(submission.username),
            testName: submission.displayName || submission.testName,
            fileName: submission.fileName || this.normalizeFileName(submission.testName),
            submittedAt: submission.submittedAt,
            percentage: submission.resultSummary.percentage,
            score: submission.resultSummary.obtainedMarks,
            passed: submission.resultSummary.passed,
            isAutoSubmitted: submission.isAutoSubmitted
        };
    }
    createJsonBlob(value) {
        return new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' });
    }
}
TestStorageService.ɵfac = function TestStorageService_Factory(t) { return new (t || TestStorageService)(i0.ɵɵinject(i1.HttpClient)); };
TestStorageService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: TestStorageService, factory: TestStorageService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TestStorageService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.HttpClient }]; }, null); })();
//# sourceMappingURL=test-storage.service.js.map