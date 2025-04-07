import { Inject, Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { DITokens } from '../utils/di.tokens';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  get accessToken(): string | null {
    return StorageService.getItem('accessToken');
  }

  set accessToken(v: string) {
    StorageService.setItem('accessToken', v);
  }

  constructor(
    private $base: BaseService,
    private http: HttpClient,
  ) {}

  signIn(email: string, password: string) {
    return this.$base.post(`auth/signin`, {
      email,
      password,
    });
  }

  signUp(email: string, password: string, username: string, birthdate: string) {
    return this.$base.post(`auth/signup`, {
      email,
      password,
      username,
      birthdate,
    });
  }
}
