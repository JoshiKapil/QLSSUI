import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { PmProject, PmQuotation } from '../models/project-management.models';
import { ProjectManagementService } from '../services/project-management.service';

@Component({ selector: 'app-project-approvals', templateUrl: './project-approvals.component.html', styleUrls: ['./project-approvals.component.scss'] })
export class ProjectApprovalsComponent implements OnInit {
  quotations: PmQuotation[] = [];
  projects: PmProject[] = [];
  error = ''; success = ''; followUpDays = 2;
  constructor(private api: ProjectManagementService, public auth: AuthService) {}
  ngOnInit(): void { this.load(); }
  get isSuperAdmin(): boolean { return (this.auth.getCurrentUser()?.role || '').toLowerCase() === 'superadmin'; }
  get pendingQuotations(): PmQuotation[] { return this.quotations.filter(x => x.status === 'Approval Pending'); }
  get closureProjects(): PmProject[] { return this.projects.filter(x => x.status === 'Closure Pending'); }
  load(): void { this.api.quotations().subscribe({next:v=>this.quotations=v,error:e=>this.error=e?.error?.message||'Unable to load quotation approvals.'}); this.api.projects().subscribe({next:v=>this.projects=v,error:e=>this.error=e?.error?.message||'Unable to load closure approvals.'}); }
  decideQuotation(q: PmQuotation, action: 'Approve'|'Reject'|'Return'): void { const remark = action==='Approve' ? '' : (prompt(`${action} remark:`, '')||'').trim(); if(action!=='Approve'&&!remark)return; this.api.decideQuotation(q.quotationId,action,remark,true,Math.max(1,+this.followUpDays||2)).subscribe({next:()=>{this.success=`${q.quotationNo}: ${action} completed.`;this.load();},error:e=>this.error=e?.error?.message||'Unable to process quotation approval.'}); }
  decideClosure(p: PmProject, action: 'Approve'|'Return'): void { const remark = action==='Return' ? (prompt('Pending activity / return remark:', '')||'').trim() : ''; if(action==='Return'&&!remark)return; this.api.decideClosure(p.projectId,action,remark,true).subscribe({next:()=>{this.success=`${p.projectNo}: closure ${action.toLowerCase()} processed.`;this.load();},error:e=>this.error=e?.error?.message||'Unable to process closure approval.'}); }
  download(q: PmQuotation): void { this.api.quotationPdf(q.quotationId).subscribe(blob=>{const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download=`Quotation_${q.quotationNo}_V${q.versionNo}.pdf`;a.click();URL.revokeObjectURL(u);}); }
}
