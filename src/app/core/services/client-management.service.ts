import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Client } from "../models/client.model";
import { AdminManagementService } from "./admin-management.service";
import { ApiClientService } from "./api-client.service";

@Injectable({ providedIn: "root" })
export class ClientManagementService {
  private readonly endpoint = "Client";
  private readonly idKey = "clientId";

  constructor(
    private adminService: AdminManagementService,
    private apiClient: ApiClientService,
  ) {}

  getAll(): Observable<Client[]> {
    return this.adminService.getAll<Client>(this.endpoint);
  }

  getById(id: number | string): Observable<Client> {
    return this.adminService.getById<Client>(this.endpoint, this.idKey, id);
  }

  search(query: string): Observable<Client[]> {
    return this.adminService.search<Client>(
      this.endpoint,
      ["clientName", "clientId"],
      query,
    );
  }

  uploadImage(file: File): Observable<{ fileName: string }> {
    return this.apiClient.upload<{ fileName: string }>(
      `${this.endpoint}/upload-image`,
      file,
    );
  }
  save(record: Client): Observable<Client> {
    return this.adminService.save<Client>(this.endpoint, this.idKey, record);
  }

  delete(id: number | string): Observable<void> {
    return this.adminService.delete(this.endpoint, this.idKey, id);
  }

  setActive(record: Client, isActive: boolean): Observable<Client> {
    return this.save({ ...record, isActive });
  }
}
