import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ILogin, ILoginResponse } from '../model/interface/login.model';
import { ApiResponse } from '../model/interface/response.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl =
    'https://blog-api-production-09b1.up.railway.app/api/auth/login';

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }

  login(login: ILogin): Observable<ApiResponse<ILoginResponse>> {
    return this.http.post<ApiResponse<ILoginResponse>>(this.apiUrl, login).pipe(
      tap((res) => {
        if (res.success) {
          localStorage.setItem('loggedIn', 'true');
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('loggedIn');
  }
}
