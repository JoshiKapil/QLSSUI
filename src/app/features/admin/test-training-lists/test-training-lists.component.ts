import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Subject, takeUntil } from 'rxjs';
import { Training } from '../../../core/models/training.model';
import { TrainingManagementService } from '../../../core/services/training-management.service';
import { TestApiService } from '../../test/services/test-api.service';
interface Row {
  training: Training;
  pre: string;
  post: string;
}
@Component({
  selector: 'app-test-training-lists',
  templateUrl: './test-training-lists.component.html',
  styleUrls: ['./test-training-lists.component.scss'],
})
export class TestTrainingListsComponent implements OnInit, OnDestroy {
  rows: Row[] = [];
  loading = true;
  error = '';
  private destroy$ = new Subject<void>();
  constructor(
    private trainings: TrainingManagementService,
    private tests: TestApiService,
    private router: Router,
  ) {}
  ngOnInit() {
    forkJoin({ trainings: this.trainings.getPaged(1, 100), tests: this.tests.getAllTests() })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ trainings, tests }) => {
          const names = new Map(tests.map((t) => [String(t.testId), t.displayName || t.testTitle || t.testName]));
          this.rows = (trainings.items || [])
            .sort((a, b) => Number(a.displayOrder || 0) - Number(b.displayOrder || 0))
            .map((training) => ({
              training,
              pre: this.name(training.preTestId, names),
              post: this.name(training.postTestId, names),
            }));
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.error = 'Training and test mappings could not be loaded.';
        },
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  label(t: Training) {
    return t.displayName || t.trainingName || String(t.trainingId || 'Training');
  }
  assign(t: Training, type: 'pre' | 'post') {
    this.router.navigate(['/admin/create-test-questions'], {
      queryParams: { trainingId: t.trainingId, testType: type },
    });
  }
  private name(id: number | string | null | undefined, names: Map<string, string>) {
    const value = String(id ?? '').trim();
    return value ? names.get(value) || `Test #${value}` : 'Not assigned';
  }
}
