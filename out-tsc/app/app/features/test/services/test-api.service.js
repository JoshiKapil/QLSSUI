import { Injectable } from '@angular/core';
import { invalidServerId, isServerNumericId, normalizeServerId } from './server-id.util';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/api-client.service";
export class TestApiService {
    constructor(api) {
        this.api = api;
    }
    getTests(filter) {
        return this.api.get('Test', filter);
    }
    getAllTests(filter) {
        return this.api.get('Test/all', filter);
    }
    getTestTypes() {
        return this.api.get('Test/types');
    }
    getTestById(testId) {
        const serverTestId = normalizeServerId(testId);
        return serverTestId
            ? this.api.get(`Test/${encodeURIComponent(serverTestId)}`)
            : invalidServerId('testId', testId);
    }
    getTestComplete(testId) {
        const serverTestId = normalizeServerId(testId);
        return serverTestId
            ? this.api.get(`Test/${encodeURIComponent(serverTestId)}/complete`)
            : invalidServerId('testId', testId);
    }
    getTestAttempt(testId) {
        return this.getTestComplete(testId);
    }
    getTestAttemptByRoute(testId) {
        const serverTestId = normalizeServerId(testId);
        return serverTestId
            ? this.api.get(`Test/attempt/${encodeURIComponent(serverTestId)}`)
            : invalidServerId('testId', testId);
    }
    getTestAttemptBySuffix(testId) {
        const serverTestId = normalizeServerId(testId);
        return serverTestId
            ? this.api.get(`Test/${encodeURIComponent(serverTestId)}/attempt`)
            : invalidServerId('testId', testId);
    }
    saveTest(test) {
        const payload = this.normalizeTestPayload(test);
        if (!isServerNumericId(payload.testId)) {
            payload.testId = '';
            return this.createTest(payload);
        }
        return this.updateTest(payload.testId, payload);
    }
    createTest(test) {
        return this.api.post('Test/create', this.normalizeTestPayload(test));
    }
    createTestViaCreateRoute(test) {
        return this.createTest(test);
    }
    updateTest(testId, test) {
        const serverTestId = normalizeServerId(testId);
        return serverTestId
            ? this.api.put(`Test/update/${encodeURIComponent(serverTestId)}`, this.normalizeTestPayload(test))
            : invalidServerId('testId', testId);
    }
    updateTestViaUpdateRoute(testId, test) {
        return this.updateTest(testId, test);
    }
    deleteTest(testId) {
        const serverTestId = normalizeServerId(testId);
        return serverTestId
            ? this.api.delete(`Test/${encodeURIComponent(serverTestId)}`)
            : invalidServerId('testId', testId);
    }
    saveTestQuestions(testId, questionIds) {
        const serverTestId = normalizeServerId(testId);
        const serverQuestionIds = questionIds.filter((questionId) => isServerNumericId(questionId));
        return serverTestId
            ? this.api.post(`Test/${encodeURIComponent(serverTestId)}/questions`, serverQuestionIds)
            : invalidServerId('testId', testId);
    }
    unmapTestQuestion(testId, questionId) {
        const serverTestId = normalizeServerId(testId);
        const serverQuestionId = normalizeServerId(questionId);
        return serverTestId && serverQuestionId
            ? this.api.delete(`Test/${encodeURIComponent(serverTestId)}/questions/${encodeURIComponent(serverQuestionId)}`)
            : invalidServerId('testId/questionId', `${testId}/${questionId}`);
    }
    importTests(tests) {
        return this.api.post('Test/import', {
            tests: tests.map((test) => this.normalizeTestPayload(test))
        });
    }
    importTestExcel(file) {
        return this.api.upload('Test/import-excel', file);
    }
    importTestExcelPascal(file) {
        return this.api.upload('Test/ImportExcel', file);
    }
    normalizeTestPayload(test) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16;
        return {
            testId: String((_b = (_a = test.testId) !== null && _a !== void 0 ? _a : test.id) !== null && _b !== void 0 ? _b : ''),
            testName: String((_e = (_d = (_c = test.testName) !== null && _c !== void 0 ? _c : test.name) !== null && _d !== void 0 ? _d : test.displayName) !== null && _e !== void 0 ? _e : ''),
            displayName: String((_h = (_g = (_f = test.displayName) !== null && _f !== void 0 ? _f : test.testName) !== null && _g !== void 0 ? _g : test.name) !== null && _h !== void 0 ? _h : ''),
            fileName: String((_k = (_j = test.fileName) !== null && _j !== void 0 ? _j : test.testName) !== null && _k !== void 0 ? _k : ''),
            testTitle: String((_p = (_o = (_m = (_l = test.testTitle) !== null && _l !== void 0 ? _l : test.title) !== null && _m !== void 0 ? _m : test.displayName) !== null && _o !== void 0 ? _o : test.testName) !== null && _p !== void 0 ? _p : ''),
            description: String((_q = test.description) !== null && _q !== void 0 ? _q : ''),
            trainingId: String((_r = test.trainingId) !== null && _r !== void 0 ? _r : ''),
            trainingName: String((_s = test.trainingName) !== null && _s !== void 0 ? _s : ''),
            subject: String((_t = test.subject) !== null && _t !== void 0 ? _t : ''),
            topic: String((_u = test.topic) !== null && _u !== void 0 ? _u : ''),
            category: String((_v = test.category) !== null && _v !== void 0 ? _v : ''),
            section: String((_w = test.section) !== null && _w !== void 0 ? _w : ''),
            durationMinutes: Number((_x = test.durationMinutes) !== null && _x !== void 0 ? _x : 0),
            passingPercentage: Number((_y = test.passingPercentage) !== null && _y !== void 0 ? _y : 0),
            instructions: String((_z = test.instructions) !== null && _z !== void 0 ? _z : ''),
            status: String((_0 = test.status) !== null && _0 !== void 0 ? _0 : 'Draft'),
            totalQuestions: Number((_5 = (_3 = (_1 = test.totalQuestions) !== null && _1 !== void 0 ? _1 : (_2 = test.questions) === null || _2 === void 0 ? void 0 : _2.length) !== null && _3 !== void 0 ? _3 : (_4 = test.mappedQuestionIds) === null || _4 === void 0 ? void 0 : _4.length) !== null && _5 !== void 0 ? _5 : 0),
            totalMarks: Number((_6 = test.totalMarks) !== null && _6 !== void 0 ? _6 : 0),
            negativeMarks: Number((_7 = test.negativeMarks) !== null && _7 !== void 0 ? _7 : 0),
            imageUrl: String((_8 = test.imageUrl) !== null && _8 !== void 0 ? _8 : ''),
            audioUrl: String((_9 = test.audioUrl) !== null && _9 !== void 0 ? _9 : ''),
            videoUrl: String((_10 = test.videoUrl) !== null && _10 !== void 0 ? _10 : ''),
            metadataJson: String((_11 = test.metadataJson) !== null && _11 !== void 0 ? _11 : ''),
            isActive: (_12 = test.isActive) !== null && _12 !== void 0 ? _12 : true,
            version: Number((_13 = test.version) !== null && _13 !== void 0 ? _13 : 1),
            createdAt: String((_14 = test.createdAt) !== null && _14 !== void 0 ? _14 : new Date().toISOString()),
            updatedAt: String((_15 = test.updatedAt) !== null && _15 !== void 0 ? _15 : new Date().toISOString()),
            mappedQuestionIds: this.toStringArray(test.mappedQuestionIds),
            questionOrder: this.toStringArray(test.questionOrder),
            questions: (_16 = test.questions) !== null && _16 !== void 0 ? _16 : []
        };
    }
    toStringArray(value) {
        return Array.isArray(value) ? value.map((item) => String(item)).filter(Boolean) : [];
    }
}
TestApiService.ɵfac = function TestApiService_Factory(t) { return new (t || TestApiService)(i0.ɵɵinject(i1.ApiClientService)); };
TestApiService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: TestApiService, factory: TestApiService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TestApiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.ApiClientService }]; }, null); })();
//# sourceMappingURL=test-api.service.js.map