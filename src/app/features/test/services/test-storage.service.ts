import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiResponse, toNumberId, toStringId, unwrapApiResponse } from '../../../core/models/api-response.model';
import { environment } from '../../../../environments/environment';
import { isServerNumericId, normalizeServerId } from './server-id.util';
import {
  QuestionUsageInfo,
  SavedResultListItem,
  TestAttempt,
  TestDefinition,
  TestDraft,
  TestQuestion,
  TestQuestionType,
  TestSubmission,
  TestSummaryItem
} from '../test.model';

@Injectable({ providedIn: 'root' })
export class TestStorageService {
  private readonly apiBaseUrl = environment.apiBaseUrl;
  private readonly apiDebugEnabled = !environment.production;
  private readonly fallbackAssessmentName = 'Untitled';
  private readonly encryptionKey = 'QLSS_ASSESSMENT_LOCAL_KEY';
  private readonly questionBankKey = 'question-bank';
  private readonly questionBankCleanupKey = 'question-bank:trimmed-after-20';
  private readonly questionBankCleanupKeepCount = 20;
  private readonly assessmentPrefix = 'assessment:';
  private readonly legacyTestPrefix = 'test:';
  private readonly draftPrefix = 'draft:';
  private readonly submittedPrefix = 'submitted:';
  private readonly browserDbName = 'qlss-test-storage';
  private readonly browserDbStoreName = 'encrypted-items';

  readonly questionBankServerPath = 'assets/test/Questions/QuestionBank.json';
  readonly assessmentServerPath = 'assets/test/assessments';
  readonly assessmentManifestPath = 'assets/test/assessments/index.json';
  readonly submittedServerPath = 'assets/test/submitted';

  constructor(private readonly http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders | undefined {
    const token =
      localStorage.getItem('qlss_auth_token') ||
      sessionStorage.getItem('qlss_auth_token') ||
      localStorage.getItem('token') ||
      sessionStorage.getItem('token');

    return token && !token.startsWith('local-')
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : undefined;
  }

  private apiUrl(endpoint: string): string {
    return `${this.apiBaseUrl}/${endpoint.replace(/^\/+/, '')}`;
  }

  private async apiGet<T>(endpoint: string, params?: HttpParams): Promise<T> {
    const response = await firstValueFrom(
      this.http.get<ApiResponse<T> | T>(this.apiUrl(endpoint), {
        params,
        headers: this.getAuthHeaders()
      })
    );

    return unwrapApiResponse<T>(response);
  }

  private async apiPost<T>(endpoint: string, body: any): Promise<T> {
    const response = await firstValueFrom(
      this.http.post<ApiResponse<T> | T>(this.apiUrl(endpoint), body, {
        headers: this.getAuthHeaders()
      })
    );

    return unwrapApiResponse<T>(response);
  }

  private async apiPut<T>(endpoint: string, body: any): Promise<T> {
    const response = await firstValueFrom(
      this.http.put<ApiResponse<T> | T>(this.apiUrl(endpoint), body, {
        headers: this.getAuthHeaders()
      })
    );

    return unwrapApiResponse<T>(response);
  }

  private async apiDelete<T>(endpoint: string, body?: any): Promise<T> {
    const response = await firstValueFrom(
      this.http.delete<ApiResponse<T> | T>(this.apiUrl(endpoint), {
        body,
        headers: this.getAuthHeaders()
      })
    );

    return unwrapApiResponse<T>(response);
  }

  private canUseLocalFallback(error: unknown): boolean {
    if (error instanceof HttpErrorResponse) {
      return error.status === 0 || error.message?.includes('Timeout') || (error as any).name === 'TimeoutError';
    }

    return error instanceof Error && (error.message.includes('Timeout') || (error as any).name === 'TimeoutError');
  }

  private getApiErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const body = error.error;

      if (typeof body === 'string') {
        return body;
      }

      if (body?.message) {
        return body.message;
      }

      if (body?.title) {
        return body.title;
      }

      if (body?.errors) {
        const validationMessages = Object.values(body.errors).flat().filter(Boolean);
        if (validationMessages.length) {
          return validationMessages.join(' ');
        }
      }

      return `Request failed with status ${error.status}.`;
    }

    return error instanceof Error ? error.message : String(error || 'Unknown API error');
  }

  private logApiError(action: string, error: unknown): void {
    if (!this.apiDebugEnabled) {
      return;
    }

    const responseBody = error instanceof HttpErrorResponse ? error.error : undefined;
    console.error(`[TestStorageService] ${action} API failed.`, { error, responseBody });
  }

  private logApiFallback(action: string, error: unknown): void {
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

  private toTestDto(test: TestDefinition): any {
    const mappedQuestionIds = test.questionOrder?.length ? test.questionOrder : test.mappedQuestionIds;

    return {
      ...test,
      id: test.testId,
      testId: toStringId(test.testId),
      trainingId: toStringId(test.trainingId),
      title: test.testTitle,
      testTitle: test.testTitle,
      mappedQuestionIds: mappedQuestionIds.map((id) => toStringId(id)),
      questionOrder: mappedQuestionIds.map((id) => toStringId(id)),
      // Questions are saved separately and linked through mappedQuestionIds.
      // Do not send UI question objects to Test/create because their field
      // types differ from the API QuestionDto model.
      questions: [],
      status: test.status,
      metadataJson: JSON.stringify({ testFileType: test.testFileType || 'assessment' }),
      metadata: { fileName: test.fileName, displayName: test.displayName, testFileType: test.testFileType }
    };
  }

  private async loadTestsFromServer(): Promise<TestDefinition[]> {
    try {
      const tests = await this.apiGet<any[]>('Test');
      return (tests || []).map((test) => this.mapApiTest(test));
    } catch {
      try {
        const tests = await this.apiGet<any[]>('Test/all');
        return (tests || []).map((test) => this.mapApiTest(test));
      } catch {
        return [];
      }
    }
  }

  private async resolveServerTest(testName: string): Promise<TestDefinition | null> {
    const serverTestId = normalizeServerId(testName);

    if (serverTestId) {
      try {
        const direct = await this.apiGet<any>(`Test/${encodeURIComponent(serverTestId)}`);
        if (direct) {
          return this.mapApiTest(direct);
        }
      } catch {
        // fall through
      }
    }

    const tests = await this.loadTestsFromServer();
    const normalizedName = this.normalizeFileName(testName).toLowerCase();

    return (
      tests.find((test) =>
        test.testId === testName ||
        this.normalizeFileName(test.testName).toLowerCase() === normalizedName ||
        this.normalizeFileName(test.displayName || '').toLowerCase() === normalizedName ||
        this.normalizeFileName(test.fileName || '').toLowerCase() === normalizedName
      ) || null
    );
  }

  async loadAssessmentFromServer(testName: string): Promise<TestDefinition | null> {
    try {
      const completeTest = await this.loadCompleteTestFromServer(testName);
      if (completeTest?.testDefinition) {
        return completeTest.testDefinition;
      }

      const test = await this.resolveServerTest(testName);
      return test || null;
    } catch (error) {
      this.logApiFallback('Load assessment', error);
      return null;
    }
  }

  async loadCompleteTestFromServer(testName: string): Promise<TestAttempt | null> {
    try {
      const test = await this.resolveServerTest(testName);
      const serverTestId = normalizeServerId(test?.testId);
      if (!serverTestId) {
        return null;
      }

      const paths = [
        `Test/${encodeURIComponent(serverTestId)}/attempt`,
        `Test/${encodeURIComponent(serverTestId)}/complete`,
        `Test/attempt/${encodeURIComponent(serverTestId)}`
      ];

      let complete: any = null;
      for (const path of paths) {
        try {
          complete = await this.apiGet<any>(path);
          break;
        } catch (error) {
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
      const testDefinition = this.normalizeAssessment(
        {
          ...definition,
          mappedQuestionIds: mappedIds,
          questionOrder: mappedIds,
          totalQuestions: definition.totalQuestions || mappedIds.length,
          questions
        },
        definition.displayName
      );

      return {
        testDefinition,
        questions,
        missingQuestionIds: [],
        inactiveQuestionIds: questions
          .filter((question) => question.isActive === false)
          .map((question) => this.getQuestionKey(question))
      };
    } catch (error) {
      this.logApiFallback('Load complete test', error);
      return null;
    }
  }

  async loadMappedQuestionsFromServer(testId: string): Promise<TestQuestion[]> {
    const serverTestId = normalizeServerId(testId);
    if (!serverTestId) {
      return [];
    }

    try {
      const response = await this.apiGet<any[]>(`TestQuestion/by-test/${encodeURIComponent(serverTestId)}`);
      return this.normalizeQuestionBank((response || []).map((question, index) => this.mapApiQuestion(question, index)));
    } catch (error) {
      this.logApiFallback('Load mapped questions', error);
      return [];
    }
  }

  async loadAvailableQuestionsFromServer(testId: string): Promise<TestQuestion[]> {
    const serverTestId = normalizeServerId(testId);
    if (!serverTestId) {
      return [];
    }

    try {
      const response = await this.apiGet<any[]>(`TestQuestion/available-questions/${encodeURIComponent(serverTestId)}`);
      return this.normalizeQuestionBank((response || []).map((question, index) => this.mapApiQuestion(question, index)));
    } catch (error) {
      this.logApiFallback('Load available questions', error);
      return [];
    }
  }

  async saveAssessment(test: TestDefinition): Promise<void> {
    await this.saveAssessmentAndGet(test);
  }

  async saveAssessmentAndGet(test: TestDefinition): Promise<TestDefinition> {
    const normalized = this.normalizeAssessment(test, this.getAssessmentDisplayName(test));

    try {
      const saved = await this.saveAssessmentToServer(normalized);
      const savedTestId = normalizeServerId(saved?.testId || normalized.testId);
      const merged: TestDefinition = this.normalizeAssessment(
        {
          ...normalized,
          ...saved,
          testId: savedTestId || normalized.testId
        },
        this.getAssessmentDisplayName(normalized)
      );

      if (savedTestId) {
        const questionIds = merged.questionOrder?.length ? merged.questionOrder : merged.mappedQuestionIds;
        await this.saveTestQuestionMappings(savedTestId, questionIds);
      }

      await this.saveAssessmentLocally(merged);
      return merged;
    } catch (error) {
      if (this.canUseLocalFallback(error)) {
        this.logApiFallback('Save assessment', error);
        await this.saveAssessmentLocally(normalized);
        return normalized;
      }

      this.logApiError('Save assessment', error);
      throw error;
    }
  }

  private async saveAssessmentToServer(test: TestDefinition): Promise<TestDefinition> {
    const dto = this.toTestDto(this.normalizeAssessment(test, this.getAssessmentDisplayName(test)));

    if (!isServerNumericId(dto.testId)) {
      dto.testId = '';
      dto.id = '';
      const created = await this.apiPost<any>('Test/create', dto);
      return this.mapApiTest(created || dto);
    }

    const updated = await this.apiPut<any>(`Test/update/${encodeURIComponent(dto.testId)}`, dto);
    return this.mapApiTest(updated || dto);
  }

  private async saveTestQuestionMappings(testId: string, questionIds: string[]): Promise<void> {
    const serverTestId = normalizeServerId(testId);
    if (!serverTestId) {
      return;
    }

    const cleanedQuestionIds = (questionIds || []).map((id) => String(id ?? '').trim()).filter(Boolean);
    if (!cleanedQuestionIds.length) {
      return;
    }

    await this.apiPost(`Test/${encodeURIComponent(serverTestId)}/questions`, cleanedQuestionIds);
  }

  private async deleteTestDefinitionFromServer(testName: string): Promise<void> {
    try {
      const test = await this.resolveServerTest(testName);
      const serverTestId = normalizeServerId(test?.testId);
      if (serverTestId) {
        await this.apiDelete(`Test/${encodeURIComponent(serverTestId)}`);
      }
    } catch (error) {
      this.logApiFallback('Delete assessment', error);
    }
  }

  //old one
  normalizeFileName(name: string): string {
    const normalized = (name || '')
      .trim()
      .replace(/#/g, 'Sharp')
      .replace(/&/g, 'And')
      .replace(/\s+/g, '')
      .replace(/[^a-zA-Z0-9_-]/g, '');

    return normalized || 'Untitled';
  }

  getAssessmentKey(testName: string): string {
    return `${this.assessmentPrefix}${this.normalizeFileName(testName)}`;
  }

  getSubmissionKey(username: string, testName: string): string {
    return `${this.submittedPrefix}${this.normalizeFileName(username)}:${this.normalizeFileName(testName)}`;
  }

  getAssessmentPath(testName: string): string {
    return `${this.assessmentServerPath}/${this.normalizeFileName(testName)}.json`;
  }

  getSubmissionPath(username: string, testName: string): string {
    return `${this.submittedServerPath}/${this.normalizeFileName(username)}/${this.normalizeFileName(testName)}.json`;
  }

  // Frontend encryption is demo-level only. Real secure save/read should be handled by .NET backend.
  async encryptData(data: any): Promise<string> {
    const text = JSON.stringify(data);
    let encrypted = '';

    for (let index = 0; index < text.length; index += 1) {
      encrypted += String.fromCharCode(text.charCodeAt(index) ^ this.encryptionKey.charCodeAt(index % this.encryptionKey.length));
    }

    return btoa(unescape(encodeURIComponent(encrypted)));
  }

  async decryptData<T>(encryptedText: string): Promise<T> {
    const encrypted = decodeURIComponent(escape(atob(encryptedText)));
    let decrypted = '';

    for (let index = 0; index < encrypted.length; index += 1) {
      decrypted += String.fromCharCode(encrypted.charCodeAt(index) ^ this.encryptionKey.charCodeAt(index % this.encryptionKey.length));
    }

    return JSON.parse(decrypted) as T;
  }


  private async getStoredValue(key: string): Promise<string | null> {
    return (await this.getIndexedDbValue(key)) || localStorage.getItem(key);
  }

  private async setStoredValue(key: string, encryptedValue: string): Promise<void> {
    localStorage.setItem(key, encryptedValue);
    await this.setIndexedDbValue(key, encryptedValue);
  }

  private async removeStoredValue(key: string): Promise<void> {
    localStorage.removeItem(key);
    await this.removeIndexedDbValue(key);
  }

  private async getStoredKeys(): Promise<string[]> {
    const keys = new Set<string>();

    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key) {
        keys.add(key);
      }
    }

    const indexedDbKeys = await this.getIndexedDbKeys();
    indexedDbKeys.forEach((key) => keys.add(key));

    return Array.from(keys);
  }

  private openBrowserDb(): Promise<IDBDatabase | null> {
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

  private async getIndexedDbValue(key: string): Promise<string | null> {
    const db = await this.openBrowserDb();
    if (!db) {
      return null;
    }

    return new Promise((resolve) => {
      const transaction = db.transaction(this.browserDbStoreName, 'readonly');
      const request = transaction.objectStore(this.browserDbStoreName).get(key);

      request.onsuccess = () => resolve((request.result as string) || null);
      request.onerror = () => resolve(null);
      transaction.oncomplete = () => db.close();
      transaction.onerror = () => db.close();
    });
  }

  private async setIndexedDbValue(key: string, encryptedValue: string): Promise<void> {
    const db = await this.openBrowserDb();
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
  }

  private async removeIndexedDbValue(key: string): Promise<void> {
    const db = await this.openBrowserDb();
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
  }

  private async getIndexedDbKeys(): Promise<string[]> {
    const db = await this.openBrowserDb();
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
  }

  async loadQuestionBank(fallbackQuestions: TestQuestion[] = []): Promise<TestQuestion[]> {
    const serverQuestions = await this.loadQuestionBankFromServer();
    if (serverQuestions.length) {
      await this.saveQuestionBankLocally(serverQuestions);
      return serverQuestions;
    }

    const encrypted = await this.getStoredValue(this.questionBankKey);

    if (encrypted) {
      return this.cleanStoredQuestionBankAfterTwentyOnce(this.normalizeQuestionBank(await this.decryptData<TestQuestion[]>(encrypted)));
    }

    const assetQuestions = await this.readEncryptedAsset<TestQuestion[]>(this.questionBankServerPath);
    if (assetQuestions?.length) {
      const questions = this.normalizeQuestionBank(assetQuestions);
      await this.saveQuestionBank(questions);
      return questions;
    }

    const fallback = this.normalizeQuestionBank(fallbackQuestions);
    if (fallback.length) {
      await this.saveQuestionBank(fallback);
    }

    return fallback;
  }

  async saveQuestionBank(questions: TestQuestion[]): Promise<void> {
    const normalized = this.normalizeQuestionBank(questions);
    await this.saveQuestionBankToServer(normalized);
    await this.saveQuestionBankLocally(normalized);
  }

  async saveQuestionBankLocallyOnly(questions: TestQuestion[]): Promise<void> {
    await this.saveQuestionBankLocally(questions);
  }

  private async saveQuestionBankLocally(questions: TestQuestion[]): Promise<void> {
    await this.setStoredValue(this.questionBankKey, await this.encryptData(this.normalizeQuestionBank(questions)));
  }

  private async cleanStoredQuestionBankAfterTwentyOnce(questions: TestQuestion[]): Promise<TestQuestion[]> {
    const alreadyCleaned = await this.getStoredValue(this.questionBankCleanupKey);
    if (alreadyCleaned || questions.length <= this.questionBankCleanupKeepCount) {
      return questions;
    }

    const cleanedQuestions = questions.slice(0, this.questionBankCleanupKeepCount);
    await this.saveQuestionBankLocally(cleanedQuestions);
    await this.setStoredValue(this.questionBankCleanupKey, await this.encryptData({ cleanedAt: new Date().toISOString(), kept: cleanedQuestions.length }));
    return cleanedQuestions;
  }

  async exportQuestionBank(): Promise<Blob> {
    return this.createEncryptedBlob('qlss-encrypted-question-bank', await this.loadQuestionBank([]));
  }

  async importQuestionBank(file: File): Promise<TestQuestion[]> {
    await this.importQuestionBankToServer(file);
    const questions = this.normalizeQuestionBank(await this.readEncryptedFile<TestQuestion[]>(file));
    await this.saveQuestionBank(questions);
    return questions;
  }

  async loadAssessment(testName: string): Promise<TestDefinition | null> {
    const serverAssessment = await this.loadAssessmentFromServer(testName);
    if (serverAssessment) {
      await this.saveAssessmentLocally(serverAssessment);
      return serverAssessment;
    }

    const encrypted = await this.loadStoredAssessmentPayload(testName);
    if (encrypted) {
      return this.normalizeAssessment(await this.decryptData<TestDefinition>(encrypted), testName);
    }

    const assetAssessment = await this.readEncryptedAsset<TestDefinition>(this.getAssessmentPath(testName));
    return assetAssessment ? this.normalizeAssessment(assetAssessment, testName) : null;
  }

  //   await this.saveAssessmentToServer(normalized);
  //   await this.saveAssessmentLocally(normalized);

  private async saveAssessmentLocally(test: TestDefinition): Promise<void> {
    const normalized = this.normalizeAssessment(test, this.getAssessmentDisplayName(test));
    const storageKey = this.getAssessmentKey(this.getAssessmentDisplayName(normalized));
    await this.setStoredValue(storageKey, await this.encryptData(normalized));
  }

  async listAssessments(): Promise<TestDefinition[]> {
    const tests: TestDefinition[] = [];
    const keys = await this.getStoredKeys();

    for (const key of keys) {
      if (!key.startsWith(this.assessmentPrefix) && !key.startsWith(this.legacyTestPrefix)) {
        continue;
      }

      const encrypted = await this.getStoredValue(key);
      if (encrypted) {
        tests.push(this.normalizeAssessment(await this.decryptData<TestDefinition>(encrypted), key.replace(/^.*:/, '')));
      }
    }

    return tests;
  }

  async deleteTestDefinition(testName: string): Promise<void> {
    await this.deleteTestDefinitionFromServer(testName);
    await this.removeStoredValue(this.getAssessmentKey(testName));
    await this.removeStoredValue(`${this.legacyTestPrefix}${this.normalizeFileName(testName)}`);
  }

  async exportAssessment(testName: string): Promise<Blob> {
    const test = await this.loadAssessment(testName);
    if (!test) {
      throw new Error('Assessment not found.');
    }

    return this.createEncryptedBlob('qlss-encrypted-assessment', test);
  }

  async saveAssessmentFileToServer(
    test: TestDefinition,
    testType: 'pre' | 'post' | 'assessment' | 'chalange'
  ): Promise<void> {
    const normalized = this.normalizeAssessment(test, this.getAssessmentDisplayName(test));
    const envelope = await this.createEncryptedEnvelope('qlss-encrypted-assessment', normalized);
    const testId = normalizeServerId(normalized.testId);

    if (!testId) {
      throw new Error('A database test ID is required to save the assessment file.');
    }

    // Previous name-based endpoint: Test/save-file/{testType}/{testName}
    await this.apiPost(
      `Test/save-file/${encodeURIComponent(testType)}/${encodeURIComponent(testId)}`,
      envelope
    );
  }

  async resolveAssessmentFileQuestions(
    testName: string,
    testType: 'pre' | 'post' | 'assessment' | 'chalange'
  ): Promise<TestAttempt> {
    const serverTest = await this.resolveServerTest(testName);
    let testId = normalizeServerId(serverTest?.testId); 
    if (!testId) {
      throw new Error(`No database test ID was found for ${testName}.`);
    }

    // Previous name-based endpoint: Test/file/{testType}/{testName}
    const envelope = await this.apiGet<any>(
      `Test/file/${encodeURIComponent(testType)}/${encodeURIComponent(testId)}`
    );
    const payload = await this.decryptData<TestDefinition>(envelope.encryptedPayload);
    const testDefinition = this.normalizeAssessment(payload, testName);
    const questions = this.normalizeQuestionBank(testDefinition.questions || []);
    const mappedIds = testDefinition.questionOrder?.length
      ? testDefinition.questionOrder
      : testDefinition.mappedQuestionIds;
    const questionById = new Map(
      questions.map((question) => [this.getQuestionKey(question), question])
    );
    const orderedQuestions = mappedIds.length
      ? mappedIds
        .map((questionId) => questionById.get(String(questionId)))
        .filter((question): question is TestQuestion => !!question)
      : questions;

    return {
      testDefinition,
      questions: orderedQuestions.map((question, index) => ({
        ...question,
        questionNo: index + 1
      })),
      missingQuestionIds: mappedIds.filter((questionId) => !questionById.has(String(questionId))),
      inactiveQuestionIds: orderedQuestions
        .filter((question) => question.isActive === false)
        .map((question) => this.getQuestionKey(question))
    };
  }

  private async loadStoredAssessmentPayload(testName: string): Promise<string | null> {
    const storageKeys = this.getAssessmentStorageKeys(testName);

    for (const storageKey of storageKeys) {
      const encrypted = await this.getStoredValue(storageKey);
      if (encrypted) {
        return encrypted;
      }
    }

    return null;
  }

  private getAssessmentStorageKeys(testName: string): string[] {
    const normalizedName = this.normalizeFileName(testName);
    return [
      this.getAssessmentKey(normalizedName),
      `${this.legacyTestPrefix}${normalizedName}`,
      `${this.draftPrefix}${normalizedName}`
    ];
  }

  private getAssessmentDisplayName(test: Partial<TestDefinition> | null | undefined): string {
    return test?.displayName || test?.testName || test?.testTitle || this.fallbackAssessmentName;
  }

  async importAssessment(file: File): Promise<TestDefinition> {
    await this.importAssessmentToServer(file);
    const test = this.normalizeAssessment(await this.readEncryptedFile<TestDefinition>(file));
    await this.saveAssessment(test);
    return test;
  }

  async resolveAssessmentQuestions(testName: string, assetFileName?: string): Promise<TestAttempt> {
    const serverAttempt = await this.loadCompleteTestFromServer(testName);
    if (serverAttempt) {
      await this.saveAssessmentLocally(serverAttempt.testDefinition);
      if (serverAttempt.questions.length) {
        const questionBank = await this.loadQuestionBank([]);
        await this.saveQuestionBankLocally(this.mergeQuestions(questionBank, serverAttempt.questions));
      }
      return serverAttempt;
    }

    let testDefinition: TestDefinition | null = null;

    if (assetFileName) {
      testDefinition = await this.loadAssessment(assetFileName);
    }

    if (!testDefinition) {
      testDefinition = await this.loadAssessment(testName);
    }

    if (!testDefinition) {
      throw new Error('Assessment not found.');
    }

    const questionBank = await this.loadQuestionBank([]);
    const questions = this.resolveMappedQuestions(testDefinition, questionBank);
    const resolvedIds = questions.map((question) => this.getQuestionKey(question));
    const mappedIds = testDefinition.questionOrder?.length ? testDefinition.questionOrder : testDefinition.mappedQuestionIds;

    return {
      testDefinition,
      questions,
      missingQuestionIds: mappedIds.filter((questionId) => !resolvedIds.includes(questionId)),
      inactiveQuestionIds: questions.filter((question) => question.isActive === false).map((question) => this.getQuestionKey(question))
    };
  }

  async saveTestDefinition(test: TestDefinition): Promise<void> {
    return this.saveAssessment(test);
  }

  async loadTestDefinition(testName: string): Promise<TestDefinition | null> {
    return this.loadAssessment(testName);
  }

  async listTestDefinitions(): Promise<TestDefinition[]> {
    const serverTests = await this.loadTestsFromServer();
    const localTests = await this.listAssessments();
    const assetTests = await this.loadAssetTestDefinitions();
    const tests = new Map<string, TestDefinition>();

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
  }

  async listTrainingsForTest(): Promise<Array<{ trainingId: string; trainingName: string; displayName: string }>> {
    const params = new HttpParams().set('pageNumber', '1').set('pageSize', '1000');
    const response = await this.apiGet<any>('training', params);
    const items = response?.items || response?.Items || (Array.isArray(response) ? response : []);

    return items
      .map((item: any) => ({
        trainingId: String(item.trainingId ?? item.TrainingId ?? ''),
        trainingName: item.trainingName ?? item.TrainingName ?? '',
        displayName: item.displayName ?? item.DisplayName ?? item.trainingName ?? item.TrainingName ?? ''
      }))
      .filter((item: any) => item.trainingId && item.displayName);
  }

  async validatePostTestAccess(email: string, trainingId: string): Promise<boolean> {
    const params = new HttpParams()
      .set('email', email.trim())
      .set('trainingId', trainingId.trim());
    const response = await this.apiGet<any>('certification-data/validate-test-access', params);
    return response?.isValid === true;
  }

  async exportTestDefinition(testName: string): Promise<Blob> {
    return this.exportAssessment(testName);
  }

  private async loadAssetTestDefinitions(): Promise<TestDefinition[]> {
    const fileNames = await this.loadAssessmentManifest();
    const results: TestDefinition[] = [];

    for (const fileName of fileNames) {
      const assetPath = `${this.assessmentServerPath}/${fileName}`;
      const test = await this.readEncryptedAsset<TestDefinition>(assetPath);

      if (!test) {
        continue;
      }

      const normalizedFileName = fileName.replace(/\.json$/i, '');
      const normalized = this.normalizeAssessment(test, normalizedFileName);
      (normalized as any).assetFileName = normalizedFileName;
      results.push(normalized);
    }

    return results;
  }

  private async loadAssessmentManifest(): Promise<string[]> {
    try {
      return await firstValueFrom(this.http.get<string[]>(this.assessmentManifestPath));
    } catch {
      return [];
    }
  }

  async importTestDefinition(file: File): Promise<TestDefinition> {
    return this.importAssessment(file);
  }

  async saveTestDraft(payload: TestDraft): Promise<void> {
    return this.saveAssessment(payload);
  }

  async loadTestDraft(testName: string): Promise<TestDraft | null> {
    return this.loadAssessment(testName) as Promise<TestDraft | null>;
  }

  async exportTestDraft(payload: TestDraft): Promise<Blob> {
    return this.createEncryptedBlob('qlss-encrypted-assessment', this.normalizeAssessment(payload));
  }

  async loadTestForAttempt(testName: string): Promise<TestAttempt> {
    return this.resolveAssessmentQuestions(testName);
  }

  resolveMappedQuestions(testDefinition: TestDefinition, questionBank: TestQuestion[]): TestQuestion[] {
    const mappedIds = testDefinition.questionOrder?.length ? testDefinition.questionOrder : testDefinition.mappedQuestionIds;

    return mappedIds
      .map((questionId, index) => {
        const question = questionBank.find((item) => this.getQuestionKey(item) === questionId && item.isActive !== false);
        return question ? { ...question, questionNo: index + 1 } : null;
      })
      .filter((question): question is TestQuestion => !!question);
  }

  async getQuestionUsage(questionId: string): Promise<QuestionUsageInfo> {
    const affectedTests = await this.getAffectedTests(questionId);
    return { questionId, usageCount: affectedTests.length, affectedTests };
  }

  async getAffectedTests(questionId: string): Promise<TestDefinition[]> {
    const tests = await this.listAssessments();
    return tests.filter((test) => test.mappedQuestionIds.includes(questionId));
  }

  async saveSubmissionResult(submission: TestSubmission): Promise<void> {
    const normalized = this.normalizeSubmission(submission);
    const savedSubmissionId = await this.saveSubmissionToServer(normalized);
    if (savedSubmissionId) {
      normalized.submissionId = savedSubmissionId;
      submission.submissionId = savedSubmissionId;
    }
    await this.saveSubmissionFileToServer(normalized);
    await this.setStoredValue(this.getSubmissionKey(normalized.username, normalized.testName), await this.encryptData(normalized));
  }
  private async saveSubmissionFileToServer(submission: TestSubmission): Promise<void> {
    const username = String(submission.username || '').trim();
    const trainingId = String(
      submission.testDetailsSnapshot?.trainingId
      || submission.questions.find((question) => question.trainingId)?.trainingId
      || ''
    ).trim();
    const testType = String(
      submission.testDetailsSnapshot?.testFileType || ''
    ).trim().toLowerCase();

    if (!username) {
      throw new Error('Username is required to save the result file.');
    }
    if (!trainingId) {
      throw new Error('Training ID is required to save the result file.');
    }
    if (!['pre', 'post', 'assessment', 'chalange', 'nor'].includes(testType)) {
      throw new Error('Test type must be pre, post, assessment, chalange, or NOR.');
    }

    const envelope = await this.createEncryptedEnvelope(
      'qlss-encrypted-test-submission',
      this.normalizeSubmission(submission)
    );

    await this.apiPost(
      `results/save-file/${encodeURIComponent(testType)}/${encodeURIComponent(trainingId)}/${encodeURIComponent(username)}`,
      envelope
    );
  }

  async loadSubmissionFileFromServer(
    testType: 'pre' | 'post' | 'assessment' | 'chalange',
    trainingId: string,
    username: string
  ): Promise<TestSubmission | null> {
    if (!testType || !trainingId.trim() || !username.trim()) {
      throw new Error('Test type, training ID, and username are required to read the result file.');
    }

    const envelope = await this.apiGet<any>(
      `results/file/${encodeURIComponent(testType)}/${encodeURIComponent(trainingId)}/${encodeURIComponent(username)}`
    );

    if (!envelope?.encryptedPayload) {
      return null;
    }

    return this.normalizeSubmission(
      await this.decryptData<TestSubmission>(envelope.encryptedPayload)
    );
  }

  async loadSavedSubmission(username: string, testName: string): Promise<TestSubmission | null> {
    const serverSubmission = await this.loadSubmissionFromServer(username, testName);
    if (serverSubmission) {
      await this.setStoredValue(this.getSubmissionKey(serverSubmission.username, serverSubmission.testName), await this.encryptData(serverSubmission));
      return serverSubmission;
    }

    const encrypted = await this.getStoredValue(this.getSubmissionKey(username, testName));
    return encrypted ? this.decryptData<TestSubmission>(encrypted) : null;
  }

  async listSavedResults(): Promise<SavedResultListItem[]> {
    const items: SavedResultListItem[] = [];
    const keys = await this.getStoredKeys();

    for (const key of keys) {
      if (!key.startsWith(this.submittedPrefix)) {
        continue;
      }

      try {
        const encrypted = await this.getStoredValue(key);
        if (!encrypted) {
          continue;
        }
        const submission = await this.decryptData<TestSubmission>(encrypted);
        items.push(this.buildSavedResultListItem(key, submission));
      } catch {
        const parts = key.replace(this.submittedPrefix, '').split(':');
        items.push({ key, username: parts[0] || '', normalizedUsername: parts[0] || '', testName: parts[1] || '', fileName: parts[1] || '', submittedAt: '', percentage: 0, score: 0, passed: false, isAutoSubmitted: false });
      }
    }

    return items;
  }

  async listResultUsers(): Promise<string[]> {
    const users = new Set<string>();

    try {
      const response = await this.apiGet<any[] | any>('results');
      const resultItems = Array.isArray(response) ? response : [response];

      for (const item of resultItems) {
        const source = item?.userResult || item || {};
        const directUsername = String(source.username || source.userName || source.normalizedUsername || '').trim();

        if (directUsername) {
          users.add(directUsername);
          continue;
        }

        const submission = await this.mapApiSubmission(item);
        if (submission?.username) {
          users.add(submission.username);
        }
      }
    } catch (error) {
      this.logApiFallback('Load result users', error);
    }

    const savedResults = await this.listSavedResults();
    savedResults.forEach((item) => {
      const username = (item.username || item.normalizedUsername || '').trim();
      if (username) {
        users.add(username);
      }
    });

    return Array.from(users).sort((a, b) => a.localeCompare(b));
  }
  getSavedResultList(): SavedResultListItem[] {
    const items: SavedResultListItem[] = [];

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

  async exportSubmissionResult(username: string, testName: string): Promise<Blob>;
  async exportSubmissionResult(submission: TestSubmission): Promise<Blob>;
  async exportSubmissionResult(usernameOrSubmission: string | TestSubmission, testName?: string): Promise<Blob> {
    const submission = typeof usernameOrSubmission === 'string'
      ? await this.loadSavedSubmission(usernameOrSubmission, testName || '')
      : usernameOrSubmission;

    if (!submission) {
      throw new Error('Saved submission not found.');
    }

    return this.createEncryptedBlob('qlss-encrypted-test-submission', this.normalizeSubmission(submission));
  }

  async deleteSavedSubmission(username: string, testName?: string): Promise<void> {
    await this.removeStoredValue(testName ? this.getSubmissionKey(username, testName) : username);
  }

  buildSubmissionKey(username: string, testName: string): string {
    return this.getSubmissionKey(username, testName);
  }

  buildSubmittedServerPath(username: string, testName: string): string {
    return this.getSubmissionPath(username, testName);
  }

  buildAssessmentFileName(testName: string): string {
    return `${this.normalizeFileName(testName || 'Assessment')}.json`;
  }

  buildTestKey(testName: string): string {
    return this.getAssessmentKey(testName);
  }

  getQuestionKey(question: TestQuestion): string {
    return question.questionId || `${question.id}`;
  }

  downloadBlob(blob: Blob, fileName: string): void {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  async loadQuestionBankFromServer(): Promise<TestQuestion[]> {
    try {
      const response = await this.apiGet<any[]>('Question');
      const questions = response || [];
      return this.normalizeQuestionBank(questions.map((question, index) => this.mapApiQuestion(question, index)));
    } catch (error) {
      this.logApiFallback('Load question bank', error);
      return [];
    }
  }

  async saveQuestionToServer(question: TestQuestion, _isUpdate = false): Promise<TestQuestion | null> {
    const normalized = this.normalizeQuestionBank([question])[0];
    const dto = this.toQuestionDto(normalized);

    try {
      if (!isServerNumericId(dto.questionId)) {
        dto.questionId = '';
        dto.id = dto.id ?? '';
        const createResponse = await this.apiPost<any>('Question/create', dto);
        return this.mapApiQuestion(createResponse || dto, 0);
      }

      const updateResponse = await this.apiPut<any>(`Question/update/${dto.questionId}`, dto);
      return this.mapApiQuestion(updateResponse || dto, 0);
    } catch (error) {
      if (!this.canUseLocalFallback(error)) {
        this.logApiError('Save question', error);
        throw new Error(this.getApiErrorMessage(error));
      }

      this.logApiFallback('Save question', error);
      return null;
    }
  }
  async saveQuestionBankToServer(questions: TestQuestion[]): Promise<void> {
    try {
      for (const question of this.normalizeQuestionBank(questions)) {
        await this.saveQuestionToServer(question);
      }
    } catch (error) {
      this.logApiFallback('Save question bank', error);
    }
  }


  //   try {

  //   try {

  //       dto.testId = '';
  //       dto.id = '';
  //       savedResponse = await this.apiPost<any>('Test/create', dto);
  //       savedResponse = await this.apiPut<any>(`Test/update/${dto.testId}`, dto);

  //     await this.saveTestQuestionMappings(savedTest.testId || normalizedTest.testId, normalizedTest.questionOrder);

  async loadSubmissionFromServer(username: string, testName: string): Promise<TestSubmission | null> {
    try {
      const response = await this.apiGet<any[] | any>('results/user/' + encodeURIComponent(username));
      const resultItems = Array.isArray(response) ? response : [response];
      const submissions = await Promise.all(resultItems.map((item) => this.mapApiSubmission(item)));
      const normalizedTestName = this.normalizeFileName(testName).toLowerCase();

      return submissions.find((submission): submission is TestSubmission =>
        !!submission && this.normalizeFileName(submission.testName).toLowerCase() === normalizedTestName
      ) || null;
    } catch (error) {
      this.logApiFallback('Load saved submission', error);
      return null;
    }
  }

  async saveSubmissionToServer(submission: TestSubmission): Promise<string | null> {
    try {
      const normalizedSubmission = this.normalizeSubmission(submission);
      const saved = await this.apiPost<any>('results/submit', await this.toUserResultDto(normalizedSubmission));
      return String(saved?.submissionId || saved?.SubmissionId || '').trim() || null;
    } catch (error) {
      this.logApiFallback('Save submission result', error);
      return null;
    }
  }

  loadTestDefinitionFromServer(testName: string): Promise<TestDefinition | null> {
    return this.loadAssessmentFromServer(testName);
  }


  loadTestDraftFromServer(testName: string): Promise<TestDraft | null> {
    return this.loadAssessmentFromServer(testName) as Promise<TestDraft | null>;
  }
  async importQuestionExcelToServer(file: File): Promise<void> {
    await this.postFileToServer('Question/import-excel', file, 'Import question Excel');
  }

  async importAssessmentExcelToServer(file: File): Promise<void> {
    await this.postFileToServer('Test/import-excel', file, 'Import assessment Excel');
  }


  //   try {


  //   try {

  async mapQuestionToTestOnServer(testId: string, questionId: string, questionNo?: number): Promise<void> {
    const serverTestId = normalizeServerId(testId);
    const serverQuestionId = normalizeServerId(questionId);
    if (!serverTestId || !serverQuestionId) {
      return;
    }

    try {
      await this.apiPost('TestQuestion/map', { testId: Number(serverTestId), questionId: serverQuestionId, order: questionNo, questionNo });
    } catch (error) {
      this.logApiFallback('Map question to test', error);
    }
  }

  async unmapQuestionFromTestOnServer(testId: string, questionId: string): Promise<void> {
    const serverTestId = normalizeServerId(testId);
    const serverQuestionId = normalizeServerId(questionId);
    if (!serverTestId || !serverQuestionId) {
      return;
    }

    try {
      await this.apiDelete('TestQuestion/unmap', { testId: Number(serverTestId), questionId: serverQuestionId });
    } catch (error) {
      this.logApiFallback('Unmap question from test', error);
    }
  }

  async deleteQuestionFromServer(questionId: string): Promise<void> {
    const serverQuestionId = normalizeServerId(questionId);
    if (!serverQuestionId) {
      return;
    }

    try {
      await this.apiDelete(`Question/${encodeURIComponent(serverQuestionId)}`);
    } catch (error) {
      this.logApiFallback('Delete question', error);
    }
  }
  async uploadMediaFile(mediaType: 'image' | 'audio' | 'video', file: File, scope: 'test' | 'question' | 'answer' | 'generic' = 'generic'): Promise<string | null> {
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
      const response = await this.apiPost<any>(endpoint, formData);
      return this.extractMediaPath(response);
    } catch {
      return null;
    }
  }

  private async importQuestionBankToServer(file: File): Promise<void> {
    await this.postFileToServer('Question/import', file, 'Import question bank');
  }

  private async importAssessmentToServer(file: File): Promise<void> {
    await this.postFileToServer('Test/import', file, 'Import assessment');
  }

  private async postFileToServer(endpoint: string, file: File, action: string): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await this.apiPost(endpoint, formData);
    } catch (error) {
      this.logApiFallback(action, error);
    }
  }

  //   try {
  //       await this.apiDelete(`Test/${encodeURIComponent(serverTestId)}`);
  //   try {

  //   try {



  //     try {

  //     test.testId === testName ||








  private mapApiTest(value: any): TestDefinition {
    const source = value?.test || value?.testDefinition || value || {};
    const rawQuestionIds = this.pickArray(source, ['mappedQuestionIds', 'questionOrder', 'questionIds']);
    const questions = this.pickArray(source, ['questions', 'mappedQuestions', 'testQuestions']).map((question, index) => this.mapApiQuestion(question, index));
    const mappedQuestionIds = rawQuestionIds.length ? rawQuestionIds.map((id) => String(id)) : questions.map((question) => this.getQuestionKey(question));
    const displayName = source.displayName || source.testName || source.name || source.title || source.testTitle || 'Test 1';

    return this.normalizeAssessment({
      ...source,
      testId: String(source.testId || source.id || `test-${this.normalizeFileName(displayName)}`),
      testName: displayName,
      displayName,
      fileName: source.fileName || this.normalizeFileName(displayName),
      testTitle: source.testTitle || source.title || displayName,
      description: source.description || '',
      trainingId: source.trainingId || '',
      trainingName: source.trainingName || '',
      subject: source.subject || '',
      topic: source.topic || '',
      durationMinutes: Number(source.durationMinutes || source.duration || 30),
      passingPercentage: Number(source.passingPercentage || source.passPercentage || 60),
      instructions: source.instructions || '',
      status: source.status || 'Active',
      mappedQuestionIds,
      questionOrder: mappedQuestionIds,
      totalQuestions: Number(source.totalQuestions || mappedQuestionIds.length || questions.length),
      totalMarks: Number(source.totalMarks || questions.reduce((sum, question) => sum + (question.marks || 1), 0)),
      createdAt: source.createdAt || source.createdOn || new Date().toISOString(),
      updatedAt: source.updatedAt || source.updatedOn || new Date().toISOString(),
      version: Number(source.version || 1),
      questions
    });
  }

  private mapApiQuestion(value: any, index: number): TestQuestion {
    const source = value?.question || value || {};
    const options = this.pickArray(source, ['options', 'answerOptions', 'answers']).map((option: any, optionIndex: number) => ({
      id: toStringId(option.id ?? option.optionId ?? option.optionKey ?? option.key ?? optionIndex + 1),
      text: option.text || option.optionText || option.answerText || '',
      imageUrl: option.imageUrl || option.mediaUrl || option.imagePath || '',
      imageAlt: option.imageAlt || ''
    }));
    const explicitCorrectOptionIds = this.pickArray(source, ['correctOptionIds', 'correctAnswerIds']).map((id) => toStringId(id));
    const optionCorrectIds = this.pickArray(source, ['options', 'answerOptions', 'answers'])
      .filter((option: any) => option.isCorrect === true || option.isCorrect === 1 || option.isCorrect === '1')
      .map((option: any, optionIndex: number) => toStringId(option.id ?? option.optionId ?? option.optionKey ?? option.key ?? optionIndex + 1));
    const correctOptionIds = explicitCorrectOptionIds.length ? explicitCorrectOptionIds : optionCorrectIds;
    const externalQuestionId = toStringId(source.externalQuestionId ?? source.questionId ?? source.id) || `q-${Date.now()}-${index}`;

    return {
      ...source,
      id: toNumberId(source.localId ?? source.questionNumericId ?? source.numericId),
      questionId: externalQuestionId,
      questionNo: toNumberId(source.questionNo ?? source.order) || index + 1,
      trainingId: toStringId(source.trainingId),
      trainingName: source.trainingName || '',
      questionType: this.normalizeQuestionType(source.questionType || source.type),
      subject: source.subject || '',
      topic: source.topic || '',
      difficulty: source.difficulty || 'Easy',
      questionText: source.questionText || source.text || '',
      questionImageUrl: source.questionImageUrl || source.imageUrl || '',
      questionImageAlt: source.questionImageAlt || '',
      audioUrl: source.audioUrl || '',
      videoUrl: source.videoUrl || source.videoPath || '',
      options: source.questionType === 'ESSAY' ? undefined : options,
      correctOptionId: source.correctOptionId || source.correctAnswerId || correctOptionIds[0] || '',
      correctOptionIds: correctOptionIds.length ? correctOptionIds : (source.correctOptionId || source.correctAnswerId ? [toStringId(source.correctOptionId || source.correctAnswerId)] : []),
      expectedAnswer: source.expectedAnswer || '',
      sampleAnswer: source.sampleAnswer || '',
      explanation: source.explanation || '',
      explanationImageUrl: source.explanationImageUrl || '',
      explanationImageAlt: source.explanationImageAlt || '',
      marks: Number(source.marks || 1),
      negativeMarks: Number(source.negativeMarks || 0),
      estimatedTimeSeconds: Number(source.estimatedTimeSeconds || source.timeSeconds || 60),
      isActive: source.isActive !== false && source.active !== false,
      version: Number(source.version || 1),
      createdAt: source.createdAt || source.createdOn || new Date().toISOString(),
      updatedAt: source.updatedAt || source.updatedOn || new Date().toISOString()
    } as TestQuestion;
  }

  async loadSubmissionByResultIdFromServer(usersResultId: string): Promise<TestSubmission | null> {
    try {
      return await this.mapApiSubmission(await this.apiGet<any>(`results/${encodeURIComponent(usersResultId)}`));
    } catch {
      return null;
    }
  }

  async loadSubmissionBySubmissionIdFromServer(submissionId: string): Promise<TestSubmission | null> {
    try {
      return await this.mapApiSubmission(await this.apiGet<any>(`results/${encodeURIComponent(submissionId)}`));
    } catch {
      return null;
    }
  }
  async loadSubmissionsByUserIdFromServer(userId: string): Promise<TestSubmission[]> {
    try {
      const response = await this.apiGet<any[] | any>('results/user/' + encodeURIComponent(userId));
      const resultItems = Array.isArray(response) ? response : [response];
      const submissions = await Promise.all(resultItems.map((item) => this.mapApiSubmission(item)));
      return submissions.filter((submission): submission is TestSubmission => !!submission);
    } catch (error) {
      this.logApiFallback('Load submissions by user id', error);
      return [];
    }
  }

  private async mapApiSubmission(value: any): Promise<TestSubmission | null> {
    const source = value?.userResult || value || {};

    if (source.encryptedResultPayload) {
      try {
        return this.normalizeSubmission(await this.decryptData<TestSubmission>(source.encryptedResultPayload));
      } catch { }
    }

    const rawPayload = source.resultPayloadJson || source.jsonResultPayload || source.payload;
    if (!rawPayload) {
      return null;
    }

    try {
      const parsed = typeof rawPayload === 'string' ? JSON.parse(rawPayload) : rawPayload;
      return this.normalizeSubmission(parsed as TestSubmission);
    } catch {
      return null;
    }
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

  private toQuestionDto(question: TestQuestion): any {
    const questionId = question.questionId || toStringId(question.id);
    const trainingId = toStringId(question.trainingId).trim();
    const selectedOptionIds = (question.correctOptionIds?.length
      ? question.correctOptionIds
      : (question.correctOptionId ? [question.correctOptionId] : [])
    ).map((optionId) => toStringId(optionId));
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
          audioUrl: (option as any).audioUrl || '',
          videoUrl: (option as any).videoUrl || '',
          imageAlt: option.imageAlt || '',
          displayOrder: index + 1,
          isCorrect: correctOptionIds.includes(optionId)
        };
      }),
      correctOptionId,
      correctOptionIds,
      expectedAnswer: question.expectedAnswer || '',
      sampleAnswer: question.sampleAnswer || '',
      manualReviewRequired: (question as any).manualReviewRequired === true,
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

  private findTestByNameOrId(tests: TestDefinition[], testName: string): TestDefinition | null {
    const normalizedName = this.normalizeFileName(testName).toLowerCase();

    return tests.find((test) =>
      test.testId === testName ||
      this.normalizeFileName(test.testName).toLowerCase() === normalizedName ||
      this.normalizeFileName(test.displayName || '').toLowerCase() === normalizedName ||
      this.normalizeFileName(test.fileName || '').toLowerCase() === normalizedName ||
      this.normalizeFileName(test.testTitle || '').toLowerCase() === normalizedName
    ) || null;
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

  private async toUserResultDto(submission: TestSubmission): Promise<any> {
    const normalizedSubmission = this.normalizeSubmission(submission);
    const summary = normalizedSubmission.resultSummary;
    const toBreakdowns = (breakdownType: string, items: TestSummaryItem[]) => items.map((item) => ({
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
      summary: { ...summary, breakdownType: 'total', label: 'Total', total: summary.totalQuestions, marks: summary.totalMarks },
      userAnswers: normalizedSubmission.userAnswers.map((answer) => ({
        ...answer, submissionId: normalizedSubmission.submissionId, questionId: String(answer.questionId),
        selectedOptionId: answer.selectedOptionId || '',
        firstVisitedAt: answer.firstVisitedAt ? new Date(answer.firstVisitedAt).toISOString() : null,
        lastVisitedAt: answer.lastVisitedAt ? new Date(answer.lastVisitedAt).toISOString() : null
      })),
      questionResults: (normalizedSubmission.questionResults || normalizedSubmission.solutionReview).map((item) => ({
        ...item, submissionId: normalizedSubmission.submissionId, questionId: String(item.questionId),
        selectedOptionId: item.selectedOptionId || '', correctOptionId: item.correctOptionId || '',
        mediaUrlsJson: JSON.stringify(item.mediaUrls || {}), isManualReview: item.evaluationStatus === 'manualReview'
      })),
      breakdowns: [
        ...toBreakdowns('questionType', normalizedSubmission.questionTypeBreakdown),
        ...toBreakdowns('difficulty', normalizedSubmission.difficultyBreakdown),
        ...toBreakdowns('subject', normalizedSubmission.subjectWiseSummary),
        ...toBreakdowns('topic', normalizedSubmission.topicWiseSummary)
      ]
    };
  }

  private normalizeQuestionType(value: unknown): TestQuestionType {
    const type = String(value || 'MCSA').trim().toUpperCase();
    return (type === 'MSCA' ? 'MCSA' : type) as TestQuestionType;
  }

  private extractMediaPath(response: any): string | null {
    if (!response) {
      return null;
    }

    if (typeof response === 'string') {
      return response;
    }

    return response.relativePath || response.path || response.url || response.mediaUrl || response.filePath || null;
  }

  private pickArray(source: any, keys: string[]): any[] {
    for (const key of keys) {
      if (Array.isArray(source?.[key])) {
        return source[key];
      }
    }

    return [];
  }

  private mergeQuestions(existing: TestQuestion[], incoming: TestQuestion[]): TestQuestion[] {
    const questions = new Map<string, TestQuestion>();
    existing.forEach((question) => questions.set(this.getQuestionKey(question), question));
    incoming.forEach((question) => questions.set(this.getQuestionKey(question), question));
    return Array.from(questions.values());
  }
  private async readEncryptedAsset<T>(path: string): Promise<T | null> {
    try {
      const parsed = await firstValueFrom(this.http.get<any>(path));
      return this.decryptWrappedPayload<T>(parsed);
    } catch {
      return null;
    }
  }

  private async createEncryptedBlob(fileType: string, payload: any): Promise<Blob> {
    return this.createJsonBlob(await this.createEncryptedEnvelope(fileType, payload));
  }

  private async createEncryptedEnvelope(fileType: string, payload: any): Promise<{
    fileType: string;
    version: number;
    createdAt: string;
    encryptedPayload: string;
  }> {
    return {
      fileType,
      version: 1,
      createdAt: new Date().toISOString(),
      encryptedPayload: await this.encryptData(payload)
    };
  }

  private async readEncryptedFile<T>(file: File): Promise<T> {
    const fileText = await file.text();
    const parsed = JSON.parse(fileText);
    return parsed.encryptedPayload ? this.decryptData<T>(parsed.encryptedPayload) : this.decryptData<T>(fileText);
  }

  private decryptWrappedPayload<T>(value: any): Promise<T> {
    if (value?.encryptedPayload) {
      return this.decryptData<T>(value.encryptedPayload);
    }

    if (typeof value === 'string') {
      return this.decryptData<T>(value);
    }

    return Promise.resolve(value as T);
  }

  private normalizeQuestionBank(questions: TestQuestion[]): TestQuestion[] {
    const now = new Date().toISOString();
    return (questions || []).map((question, index) => ({
      ...question,
      id: question.id || Date.now() + index,
      questionId: question.questionId || `q-${question.id || Date.now() + index}`,
      questionNo: index + 1,
      trainingId: question.trainingId || '',
      trainingName: question.trainingName || '',
      marks: question.marks && question.marks > 0 ? question.marks : 1,
      estimatedTimeSeconds: question.estimatedTimeSeconds && question.estimatedTimeSeconds > 0 ? question.estimatedTimeSeconds : 60,
      isActive: question.isActive !== false,
      version: question.version || 1,
      createdAt: question.createdAt || now,
      updatedAt: question.updatedAt || now
    }));
  }

  private normalizeAssessment(test: TestDefinition, fallbackName = 'Test 1'): TestDefinition {
    const displayName = test.displayName || test.testTitle || test.testName || fallbackName || 'Test 1';
    const fileName = this.normalizeFileName(test.fileName || displayName);
    const now = new Date().toISOString();

    return {
      ...test,
      testId: test.testId || `test-${fileName}`,
      testName: displayName,
      displayName,
      fileName,
      testTitle: test.testTitle || displayName,
      mappedQuestionIds: test.mappedQuestionIds || [],
      questionOrder: test.questionOrder?.length ? test.questionOrder : (test.mappedQuestionIds || []),
      totalQuestions: test.totalQuestions || (test.mappedQuestionIds || []).length,
      totalMarks: test.totalMarks || 0,
      createdAt: test.createdAt || now,
      updatedAt: now,
      version: test.version || 1
    };
  }

  private normalizeSubmission(submission: TestSubmission): TestSubmission {
    const displayName = submission.displayName || submission.testTitle || submission.testName || 'Test 1';
    const fileName = this.normalizeFileName(submission.fileName || displayName);
    const username = submission.username || 'demo-user';

    return {
      ...submission,
      username,
      normalizedUsername: this.normalizeFileName(submission.normalizedUsername || username),
      displayName,
      fileName,
      testName: displayName
    };
  }

  private buildSavedResultListItem(key: string, submission: TestSubmission): SavedResultListItem {
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

  private createJsonBlob(value: any): Blob {
    return new Blob([JSON.stringify(value, null, 2)], { type: 'application/json' });
  }
}
