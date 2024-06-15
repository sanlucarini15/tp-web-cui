import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:5000/api';
  private isAuthenticated = false;
  private currentUser: any = null;

  constructor(private http: HttpClient) {}

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      map((response: any) => {
        this.isAuthenticated = true;
        this.currentUser = response.username;
        return response;
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      map((response: any) => {
        this.isAuthenticated = false;
        this.currentUser = null;
        return response;
      })
    );
  }

  checkAuth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/check-auth`).pipe(
      map((response: any) => {
        this.isAuthenticated = response.message === 'Usuario autenticado';
        this.currentUser = response.username;
        return response;
      })
    );
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return this.isAuthenticated;
  }
}
