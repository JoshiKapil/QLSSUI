import { Component, OnInit } from '@angular/core';
import { PmAttachment, PmProject } from '../models/project-management.models';
import { ProjectManagementService } from '../services/project-management.service';
@Component({selector:'app-project-documents',templateUrl:'./project-documents.component.html',styleUrls:['./project-documents.component.scss']})
export class ProjectDocumentsComponent implements OnInit{
 projects:PmProject[]=[];selected?:PmProject;files:PmAttachment[]=[];search='';error='';success='';
 constructor(private api:ProjectManagementService){} ngOnInit():void{this.api.projects().subscribe({next:v=>{this.projects=v;if(v.length)this.select(v[0]);},error:e=>this.error=e?.error?.message||'Unable to load projects.'});}
 get filteredProjects():PmProject[]{const q=this.search.trim().toLowerCase();return this.projects.filter(p=>!q||`${p.projectNo} ${p.customerName} ${p.projectTitle}`.toLowerCase().includes(q));}
 select(p:PmProject):void{this.selected=p;this.api.attachments('Project',p.projectId).subscribe({next:v=>this.files=v,error:()=>this.files=[]});}
 upload(event:Event):void{if(!this.selected)return;const input=event.target as HTMLInputElement;const file=input.files?.[0];if(!file)return;this.api.uploadAttachment('Project',this.selected.projectId,file).subscribe({next:()=>{this.success='Project document uploaded.';this.select(this.selected!);input.value='';},error:e=>this.error=e?.error?.message||'Unable to upload document.'});}
 download(f:PmAttachment):void{this.api.attachmentFile(f.attachmentId).subscribe(blob=>{const u=URL.createObjectURL(blob);const a=document.createElement('a');a.href=u;a.download=f.originalFileName;a.click();URL.revokeObjectURL(u);});}
 icon(f:PmAttachment):string{const n=f.originalFileName.toLowerCase();if(n.endsWith('.pdf'))return'fa-file-pdf';if(n.endsWith('.xlsx')||n.endsWith('.xls'))return'fa-file-excel';if(n.endsWith('.docx')||n.endsWith('.doc'))return'fa-file-word';if(/\.(png|jpg|jpeg|webp)$/.test(n))return'fa-file-image';return'fa-file-lines';}
}
