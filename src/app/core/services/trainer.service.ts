import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Trainer } from "../models/trainer.model";
import { AdminManagementService } from "./admin-management.service";

@Injectable({ providedIn: "root" })
export class TrainerService {
  private readonly endpoint = "trainer";
  private readonly idKey = "trainerId";

  constructor(private adminService: AdminManagementService) {}

  getAll(): Observable<Trainer[]> {
    return this.adminService.getAll<Trainer>(this.endpoint);
  }

  getById(trainerId: number | string): Observable<Trainer> {
    return this.adminService.getById<Trainer>(
      this.endpoint,
      this.idKey,
      trainerId,
    );
  }

  search(query: string): Observable<Trainer[]> {
    return this.adminService.search<Trainer>(
      this.endpoint,
      ["name", "mobile", "email"],
      query,
    );
  }

  save(record: Trainer): Observable<Trainer> {
    return this.adminService.save<Trainer>(this.endpoint, this.idKey, record);
  }

  setActive(record: Trainer, isActive: boolean): Observable<Trainer> {
    return this.save({ ...record, isActive });
  }

  delete(trainerId: number | string): Observable<void> {
    return this.adminService.delete(this.endpoint, this.idKey, trainerId);
  }
}
