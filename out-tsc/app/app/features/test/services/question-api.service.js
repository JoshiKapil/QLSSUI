import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isServerNumericId } from './server-id.util';
import * as i0 from "@angular/core";
import * as i1 from "../../../core/services/api-client.service";
export class QuestionApiService {
    constructor(api) {
        this.api = api;
    }
    getQuestions(filter) {
        return this.api.get('Question', filter);
    }
    getAllQuestions(filter) {
        return this.api.get('Question/all', filter);
    }
    getQuestionById(questionId) {
        return this.api.get(`Question/${encodeURIComponent(questionId)}`);
    }
    saveQuestion(question) {
        var _a;
        const payload = this.normalizeQuestionPayload(question);
        if (!isServerNumericId(payload.questionId)) {
            payload.questionId = '';
            payload.id = (_a = payload.id) !== null && _a !== void 0 ? _a : '';
            return this.createQuestion(payload);
        }
        return this.updateQuestion(payload.questionId, payload);
    }
    createQuestion(question) {
        return this.api.post('Question/create', this.normalizeQuestionPayload(question));
    }
    createQuestionViaCreateRoute(question) {
        return this.createQuestion(question);
    }
    updateQuestion(questionId, question) {
        return this.api.put(`Question/update/${encodeURIComponent(questionId)}`, this.normalizeQuestionPayload(question));
    }
    updateQuestionViaUpdateRoute(questionId, question) {
        return this.updateQuestion(questionId, question);
    }
    deleteQuestion(questionId) {
        return this.api.delete(`Question/${encodeURIComponent(questionId)}`);
    }
    getQuestionUsage(questionId) {
        return this.api.get(`Question/usage/${encodeURIComponent(questionId)}`);
    }
    importQuestions(questions, duplicateAction = 'skip') {
        return this.api.post('Question/import', {
            questions: questions.map((question) => this.normalizeQuestionPayload(question)),
            duplicateAction
        });
    }
    bulkImportQuestions(questions, duplicateAction = 'skip') {
        return this.api.post('Question/bulk', {
            questions: questions.map((question) => this.normalizeQuestionPayload(question)),
            duplicateAction
        });
    }
    importQuestionExcel(file, duplicateAction = 'skip') {
        return this.api.upload('Question/import-excel', file, { duplicateAction });
    }
    importQuestionExcelPascal(file, duplicateAction = 'skip') {
        return this.api.upload('Question/ImportExcel', file, { duplicateAction });
    }
    importWordQuestions(request) {
        return this.api.postWithProgress('Question/import-word-questions', request);
    }
    buildFilterParams(filter) {
        if (!filter) {
            return undefined;
        }
        let params = new HttpParams();
        Object.entries(filter).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                params = params.set(key, String(value));
            }
        });
        return params;
    }
    normalizeQuestionPayload(question) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8;
        const correctOptionIds = this.toStringArray(question.correctOptionIds);
        const correctOptionId = String((_b = (_a = question.correctOptionId) !== null && _a !== void 0 ? _a : correctOptionIds[0]) !== null && _b !== void 0 ? _b : '');
        const options = ((_c = question.options) !== null && _c !== void 0 ? _c : []).map((option, index) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            const id = String((_c = (_b = (_a = option === null || option === void 0 ? void 0 : option.id) !== null && _a !== void 0 ? _a : option === null || option === void 0 ? void 0 : option.optionId) !== null && _b !== void 0 ? _b : option === null || option === void 0 ? void 0 : option.questionOptionId) !== null && _c !== void 0 ? _c : `option-${index + 1}`);
            const isCorrect = !!(option === null || option === void 0 ? void 0 : option.isCorrect) || id === correctOptionId || correctOptionIds.includes(id);
            return {
                id,
                text: String((_e = (_d = option === null || option === void 0 ? void 0 : option.text) !== null && _d !== void 0 ? _d : option === null || option === void 0 ? void 0 : option.optionText) !== null && _e !== void 0 ? _e : ''),
                imageUrl: String((_g = (_f = option === null || option === void 0 ? void 0 : option.imageUrl) !== null && _f !== void 0 ? _f : option === null || option === void 0 ? void 0 : option.optionImageUrl) !== null && _g !== void 0 ? _g : ''),
                audioUrl: String((_h = option === null || option === void 0 ? void 0 : option.audioUrl) !== null && _h !== void 0 ? _h : ''),
                videoUrl: String((_j = option === null || option === void 0 ? void 0 : option.videoUrl) !== null && _j !== void 0 ? _j : ''),
                imageAlt: String((_k = option === null || option === void 0 ? void 0 : option.imageAlt) !== null && _k !== void 0 ? _k : ''),
                displayOrder: Number((_l = option === null || option === void 0 ? void 0 : option.displayOrder) !== null && _l !== void 0 ? _l : index + 1),
                isCorrect
            };
        });
        return {
            questionId: String((_e = (_d = question.questionId) !== null && _d !== void 0 ? _d : question.id) !== null && _e !== void 0 ? _e : ''),
            id: String((_g = (_f = question.id) !== null && _f !== void 0 ? _f : question.questionId) !== null && _g !== void 0 ? _g : ''),
            trainingId: String((_h = question.trainingId) !== null && _h !== void 0 ? _h : ''),
            trainingName: String((_j = question.trainingName) !== null && _j !== void 0 ? _j : ''),
            questionNo: Number((_k = question.questionNo) !== null && _k !== void 0 ? _k : 0),
            questionType: this.normalizeQuestionType(question.questionType),
            subject: String((_l = question.subject) !== null && _l !== void 0 ? _l : ''),
            topic: String((_m = question.topic) !== null && _m !== void 0 ? _m : ''),
            category: String((_o = question.category) !== null && _o !== void 0 ? _o : ''),
            section: String((_p = question.section) !== null && _p !== void 0 ? _p : ''),
            difficulty: String((_q = question.difficulty) !== null && _q !== void 0 ? _q : 'Easy'),
            questionText: String((_r = question.questionText) !== null && _r !== void 0 ? _r : ''),
            questionImageUrl: String((_s = question.questionImageUrl) !== null && _s !== void 0 ? _s : ''),
            questionImageAlt: String((_t = question.questionImageAlt) !== null && _t !== void 0 ? _t : ''),
            audioUrl: String((_u = question.audioUrl) !== null && _u !== void 0 ? _u : ''),
            videoUrl: String((_v = question.videoUrl) !== null && _v !== void 0 ? _v : ''),
            options,
            correctOptionId,
            correctOptionIds,
            expectedAnswer: String((_w = question.expectedAnswer) !== null && _w !== void 0 ? _w : ''),
            sampleAnswer: String((_x = question.sampleAnswer) !== null && _x !== void 0 ? _x : ''),
            manualReviewRequired: !!question.manualReviewRequired,
            explanation: String((_y = question.explanation) !== null && _y !== void 0 ? _y : ''),
            explanationImageUrl: String((_z = question.explanationImageUrl) !== null && _z !== void 0 ? _z : ''),
            explanationImageAlt: String((_0 = question.explanationImageAlt) !== null && _0 !== void 0 ? _0 : ''),
            marks: Number((_1 = question.marks) !== null && _1 !== void 0 ? _1 : 1),
            negativeMarks: Number((_2 = question.negativeMarks) !== null && _2 !== void 0 ? _2 : 0),
            estimatedTimeSeconds: Number((_3 = question.estimatedTimeSeconds) !== null && _3 !== void 0 ? _3 : 60),
            metadataJson: String((_4 = question.metadataJson) !== null && _4 !== void 0 ? _4 : ''),
            isActive: (_5 = question.isActive) !== null && _5 !== void 0 ? _5 : true,
            version: Number((_6 = question.version) !== null && _6 !== void 0 ? _6 : 1),
            createdAt: String((_7 = question.createdAt) !== null && _7 !== void 0 ? _7 : new Date().toISOString()),
            updatedAt: String((_8 = question.updatedAt) !== null && _8 !== void 0 ? _8 : new Date().toISOString())
        };
    }
    normalizeQuestionType(value) {
        const type = String(value !== null && value !== void 0 ? value : 'MCSA').trim().toUpperCase();
        return type === 'MSCA' ? 'MCSA' : type;
    }
    toStringArray(value) {
        return Array.isArray(value) ? value.map((item) => String(item)).filter(Boolean) : [];
    }
}
QuestionApiService.ɵfac = function QuestionApiService_Factory(t) { return new (t || QuestionApiService)(i0.ɵɵinject(i1.ApiClientService)); };
QuestionApiService.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: QuestionApiService, factory: QuestionApiService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(QuestionApiService, [{
        type: Injectable,
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: i1.ApiClientService }]; }, null); })();
//# sourceMappingURL=question-api.service.js.map