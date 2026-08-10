import { Component, OnInit } from '@angular/core';
import { PmDashboard, PmEnquiry, PmProject, PmQuotation } from '../models/project-management.models';
import { ProjectManagementService } from '../services/project-management.service';
@Component({selector:'app-project-reports',templateUrl:'./project-reports.component.html',styleUrls:['./project-reports.component.scss']})
export class ProjectReportsComponent implements OnInit{
 dashboard?:PmDashboard;enquiries:PmEnquiry[]=[];quotations:PmQuotation[]=[];projects:PmProject[]=[];error='';
 constructor(private api:ProjectManagementService){} ngOnInit():void{this.load();}
 load():void{this.api.dashboard().subscribe({next:v=>this.dashboard=v,error:e=>this.error=e?.error?.message||'Unable to load dashboard report.'});this.api.enquiries().subscribe(v=>this.enquiries=v);this.api.quotations().subscribe(v=>this.quotations=v);this.api.projects().subscribe(v=>this.projects=v);}
 get conversionRate():number{return this.enquiries.length?Math.round((this.projects.length/this.enquiries.length)*100):0;} get quotationValue():number{return this.quotations.reduce((a,b)=>a+(b.totalAmount||0),0);} get closedValue():number{return this.projects.filter(x=>x.status==='PROJECT CLOSED').reduce((a,b)=>a+(b.projectValue||0),0);}
 exportCsv():void{const rows=[['Project No','Customer','Project Title','Category','Leader','Start Date','Target Date','Status','Completion %','Project Value'],...this.projects.map(p=>[p.projectNo,p.customerName,p.projectTitle,p.categoryName,p.projectLeaderName,p.projectStartDate||'',p.targetCompletionDate||'',p.status,String(p.completionPercent),String(p.projectValue)])];const csv=rows.map(r=>r.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(',')).join('\r\n');const blob=new Blob([csv],{type:'text/csv;charset=utf-8'});const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download=`QLSS_Project_Report_${new Date().toISOString().slice(0,10)}.csv`;a.click();URL.revokeObjectURL(u);}
 statusCount(status:string):number{return this.projects.filter(x=>x.status===status).length;}
}
