import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  getUsuariosNormales() {
    return this.http.get<any[]>(`${this.apiUrl}/usuarios`);
  }

  getArbitros() {
    return this.http.get<any[]>(`${this.apiUrl}/arbitros`);
  }

  asignarArbitro(usuarioId: number, arbitroId: number) {
    return this.http.put(`${this.apiUrl}/usuarios/${usuarioId}/asignar-arbitro/${arbitroId}`, {});
  }
}
