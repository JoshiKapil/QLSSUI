import { HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService, QueryParams } from '../../../core/services/api-client.service';
import {
  ImportResultDto,
  QuestionDto,
  QuestionTestImportRequestDto,
  QuestionTestImportResultDto,
  QuestionUsageInfoDto
} from './test-api.models';
import { isServerNumericId } from './server-id.util';

@Injectable({ providedIn: 'root' })
export class QuestionApiService {
  constructor(private readonly api: ApiClientService) {}

  getQuestions(filter?: QueryParams): Observable<QuestionDto[]> {
    return this.api.get<QuestionDto[]>('Question', filter);
  }

  getAllQuestions(filter?: QueryParams): Observable<QuestionDto[]> {
    return this.api.get<QuestionDto[]>('Question/all', filter);
  }

  getQuestionById(questionId: string): Observable<QuestionDto> {
    return this.api.get<QuestionDto>(`Question/${encodeURIComponent(questionId)}`);
  }

  saveQuestion(question: Partial<QuestionDto> & Record<string, any>): Observable<QuestionDto> {
    const payload = this.normalizeQuestionPayload(question);

    if (!isServerNumericId(payload.questionId)) {
      payload.questionId = '';
      payload.id = payload.id ?? '';
      return this.createQuestion(payload);
    }

    return this.updateQuestion(payload.questionId, payload);
  }

  createQuestion(question: Partial<QuestionDto> & Record<string, any>): Observable<QuestionDto> {
    return this.api.post<QuestionDto>('Question/create', this.normalizeQuestionPayload(question));
  }

  createQuestionViaCreateRoute(question: Partial<QuestionDto> & Record<string, any>): Observable<QuestionDto> {
    return this.createQuestion(question);
  }

  updateQuestion(questionId: string, question: Partial<QuestionDto> & Record<string, any>): Observable<QuestionDto> {
    return this.api.put<QuestionDto>(`Question/update/${encodeURIComponent(questionId)}`, this.normalizeQuestionPayload(question));
  }

  updateQuestionViaUpdateRoute(questionId: string, question: Partial<QuestionDto> & Record<string, any>): Observable<QuestionDto> {
    return this.updateQuestion(questionId, question);
  }

  deleteQuestion(questionId: string): Observable<null> {
    return this.api.delete<null>(`Question/${encodeURIComponent(questionId)}`);
  }

  getQuestionUsage(questionId: string): Observable<QuestionUsageInfoDto> {
    return this.api.get<QuestionUsageInfoDto>(`Question/usage/${encodeURIComponent(questionId)}`);
  }

  importQuestions(questions: QuestionDto[], duplicateAction: 'skip' | 'update' | string = 'skip'): Observable<ImportResultDto> {
    return this.api.post<ImportResultDto>('Question/import', {
      questions: questions.map((question) => this.normalizeQuestionPayload(question)),
      duplicateAction
    });
  }

  bulkImportQuestions(questions: QuestionDto[], duplicateAction: 'skip' | 'update' | string = 'skip'): Observable<ImportResultDto> {
    return this.api.post<ImportResultDto>('Question/bulk', {
      questions: questions.map((question) => this.normalizeQuestionPayload(question)),
      duplicateAction
    });
  }

  importQuestionExcel(file: File, duplicateAction: 'skip' | 'update' | string = 'skip'): Observable<ImportResultDto> {
    return this.api.upload<ImportResultDto>('Question/import-excel', file, { duplicateAction });
  }

  importQuestionExcelPascal(file: File, duplicateAction: 'skip' | 'update' | string = 'skip'): Observable<ImportResultDto> {
    return this.api.upload<ImportResultDto>('Question/ImportExcel', file, { duplicateAction });
  }

  importWordQuestions(request: QuestionTestImportRequestDto): Observable<HttpEvent<QuestionTestImportResultDto>> {
    return this.api.postWithProgress<QuestionTestImportResultDto>('Question/import-word-questions', request);
  }

  buildFilterParams(filter?: Record<string, string | number | boolean | null | undefined>): HttpParams | undefined {
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

  private normalizeQuestionPayload(question: Partial<QuestionDto> & Record<string, any>): QuestionDto {
    const correctOptionIds = this.toStringArray(question.correctOptionIds);
    const correctOptionId = String(question.correctOptionId ?? correctOptionIds[0] ?? '');
    const options = (question.options ?? []).map((option: any, index: number) => {
      const id = String(option?.id ?? option?.optionId ?? option?.questionOptionId ?? `option-${index + 1}`);
      const isCorrect = !!option?.isCorrect || id === correctOptionId || correctOptionIds.includes(id);

      return {
        id,
        text: String(option?.text ?? option?.optionText ?? ''),
        imageUrl: String(option?.imageUrl ?? option?.optionImageUrl ?? ''),
        audioUrl: String(option?.audioUrl ?? ''),
        videoUrl: String(option?.videoUrl ?? ''),
        imageAlt: String(option?.imageAlt ?? ''),
        displayOrder: Number(option?.displayOrder ?? index + 1),
        isCorrect
      };
    });

    return {
      questionId: String(question.questionId ?? question.id ?? ''),
      id: String(question.id ?? question.questionId ?? ''),
      trainingId: String(question.trainingId ?? ''),
      trainingName: String(question.trainingName ?? ''),
      questionNo: Number(question.questionNo ?? 0),
      questionType: this.normalizeQuestionType(question.questionType),
      subject: String(question.subject ?? ''),
      topic: String(question.topic ?? ''),
      category: String(question.category ?? ''),
      section: String(question.section ?? ''),
      difficulty: String(question.difficulty ?? 'Easy'),
      questionText: String(question.questionText ?? ''),
      questionImageUrl: String(question.questionImageUrl ?? ''),
      questionImageAlt: String(question.questionImageAlt ?? ''),
      audioUrl: String(question.audioUrl ?? ''),
      videoUrl: String(question.videoUrl ?? ''),
      options,
      correctOptionId,
      correctOptionIds,
      expectedAnswer: String(question.expectedAnswer ?? ''),
      sampleAnswer: String(question.sampleAnswer ?? ''),
      manualReviewRequired: !!question.manualReviewRequired,
      explanation: String(question.explanation ?? ''),
      explanationImageUrl: String(question.explanationImageUrl ?? ''),
      explanationImageAlt: String(question.explanationImageAlt ?? ''),
      marks: Number(question.marks ?? 1),
      negativeMarks: Number(question.negativeMarks ?? 0),
      estimatedTimeSeconds: Number(question.estimatedTimeSeconds ?? 60),
      metadataJson: String(question.metadataJson ?? ''),
      isActive: question.isActive ?? true,
      version: Number(question.version ?? 1),
      createdAt: String(question.createdAt ?? new Date().toISOString()),
      updatedAt: String(question.updatedAt ?? new Date().toISOString())
    };
  }

  private normalizeQuestionType(value: unknown): string {
    const type = String(value ?? 'MCSA').trim().toUpperCase();
    return type === 'MSCA' ? 'MCSA' : type;
  }

  private toStringArray(value: unknown): string[] {
    return Array.isArray(value) ? value.map((item) => String(item)).filter(Boolean) : [];
  }
}


