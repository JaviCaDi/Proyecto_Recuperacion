import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArbitroService {
  // URL base del endpoint del backend
  private apiUrl = 'http://localhost:8080/api/arbitros';

  constructor(private http: HttpClient) {}

  // Obtiene todos los árbitros
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtiene un árbitro por su ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crea un nuevo árbitro
  create(arbitro: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, arbitro);
  }

  // Actualiza un árbitro existente
  update(id: number, arbitro: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, arbitro);
  }

  // Elimina un árbitro
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
