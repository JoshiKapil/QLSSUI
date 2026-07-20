import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { LoginRequestDto, LoginResponseDto } from '../../features/test/services/test-api.models';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor(private api: ApiClientService) {}

  login(request: LoginRequestDto): Observable<LoginResponseDto> {
    return this.api.post<LoginResponseDto>('Auth/login', request);
  }
}