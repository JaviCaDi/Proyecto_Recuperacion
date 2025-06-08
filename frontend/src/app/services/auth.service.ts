import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient, private router: Router) { }

  login(nombre: string, contrasena: string) {
    return this.http.post(`${this.apiUrl}/login`, { nombre, contrasena });
  }

  register(data: any) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }



  saveToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  getToken() {
    return localStorage.getItem('jwt');
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
