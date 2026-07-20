import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LinkedInComment } from '../models/linkedin-comment.model';
import { AdminManagementService } from './admin-management.service';

@Injectable({ providedIn: 'root' })
export class LinkedInCommentService {
  private readonly endpoint = 'LinkedInComment';

  constructor(private adminService: AdminManagementService) {}

  getAll(): Observable<LinkedInComment[]> {
    return this.adminService.getAll<LinkedInComment>(this.endpoint);
  }

  search(query: string): Observable<LinkedInComment[]> {
    return this.adminService.search<LinkedInComment>(this.endpoint, ['commentId', 'postId', 'author'], query);
  }

  save(record: LinkedInComment): Observable<LinkedInComment> {
    return this.adminService.save<LinkedInComment>(this.endpoint, 'commentId', record);
  }
}
