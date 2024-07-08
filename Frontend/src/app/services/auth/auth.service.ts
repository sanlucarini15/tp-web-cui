import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'http://localhost:5000/api';
  private isAuthenticated = false;
  private currentUser: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  register(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password }, { withCredentials: true });
  }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/login`, { username, password }, { headers, withCredentials: true }).pipe(
      map((response: any) => {
        this.isAuthenticated = true;
        this.currentUser = response.username;
        return response;
      })
    );
  }


  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      map((response: any) => {
        this.isAuthenticated = false;
        this.currentUser = null;
        return response;
      })
    );
  }

  checkAuth(): Observable<any> {
    return this.http.get(`${this.apiUrl}/check-auth`, { withCredentials: true }).pipe(
      map((response: any) => {
        this.isAuthenticated = response.authenticated;
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

  redirectToLogin() {
    this.router.navigate(['/login']);
  }

  redirectToProfile() {
    this.router.navigate(['/profile']);
  }
}
