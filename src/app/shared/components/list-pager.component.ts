import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { ListPage } from '../list-page';

@Component({
  selector: 'app-list-pager',
  template: `<div class="list-pager" [class.compact]="compact" [attr.aria-label]="page.label + ' navigation'">
    <label>{{page.label}} <input type="search" [ngModel]="page.search" (ngModelChange)="search($event)" placeholder="Search all records" /></label>
    <div><button type="button" (click)="move(false)" [disabled]="page.loading || page.pageNumber === 1">Previous</button>
    <span aria-live="polite">Page {{page.pageNumber}}{{page.loading ? ' - Loading...' : ''}}</span>
    <button type="button" (click)="move(true)" [disabled]="page.loading || !page.hasMore">Next</button>
    <button type="button" (click)="refresh()" [disabled]="page.loading">Refresh</button></div>
    <p *ngIf="page.error" role="alert">{{page.error}}</p>
  </div>`,
  styles: [`.list-pager{display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;margin:12px 0;padding:12px;border:1px solid var(--zm-border,#d9e4ef);border-radius:10px;color:inherit;background:var(--zm-surface,transparent)}label,div>div{display:flex;align-items:center;gap:8px;flex-wrap:wrap}input{max-width:100%;min-width:160px;padding:8px;border:1px solid #94a3b8;border-radius:6px;color:inherit;background:transparent}button{padding:7px 12px;border:1px solid #94a3b8;border-radius:6px;color:inherit;background:transparent;cursor:pointer}button:disabled{opacity:.5;cursor:default}.compact{margin:0 0 14px;padding:0 0 14px;border:0;border-bottom:1px solid var(--zm-border,#d9e4ef);border-radius:0;background:transparent;gap:10px}.compact label{width:100%;font-size:12px;font-weight:600;display:grid;gap:7px}.compact input{width:100%;min-width:0;background:var(--zm-surface,#fff);border-color:var(--zm-border,#d9e4ef);border-radius:8px;font-size:14px;padding:10px}.compact>div{width:100%;justify-content:space-between;gap:6px;font-size:12px}.compact button{border-color:var(--zm-border,#d9e4ef);border-radius:8px;background:var(--zm-soft,#f3f8fd);padding:7px 9px}.compact input:focus-visible,.compact button:focus-visible{outline:2px solid var(--zm-primary,#2563eb);outline-offset:2px}`],
})
export class ListPagerComponent implements OnDestroy {
  @Input() page!: ListPage;
  @Input() compact = false;
  @Output() changed = new EventEmitter<void>();
  private searches = new Subject<void>();
  private destroyed = new Subject<void>();
  constructor() { this.searches.pipe(debounceTime(300), takeUntil(this.destroyed)).subscribe(() => this.refresh()); }
  search(value: string): void { this.page.search = value; this.searches.next(); }
  refresh(): void { this.page.reset(); this.changed.emit(); }
  move(next: boolean): void { next ? this.page.next() : this.page.previous(); this.changed.emit(); }
  ngOnDestroy(): void { this.destroyed.next(); this.destroyed.complete(); this.page.destroy(); }
}
