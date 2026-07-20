import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LinkedInPost } from '../models/linkedin-post.model';
import { AdminManagementService } from './admin-management.service';

@Injectable({ providedIn: 'root' })
export class LinkedInPostService {
  private readonly endpoint = 'LinkedInPost';

  constructor(private adminService: AdminManagementService) {}

  getAll(): Observable<LinkedInPost[]> {
    return this.adminService.getAll<LinkedInPost>(this.endpoint);
  }

  search(query: string): Observable<LinkedInPost[]> {
    return this.adminService.search<LinkedInPost>(this.endpoint, ['postId', 'author'], query);
  }

  save(record: LinkedInPost): Observable<LinkedInPost> {
    return this.adminService.save<LinkedInPost>(this.endpoint, 'postId', record);
  }
}
