import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {
  private baseUrl = 'http://localhost:8080/api/jugadores';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  create(jugadorFormData: FormData): Observable<any> {
    return this.http.post(this.baseUrl, jugadorFormData);
  }

  update(id: number, jugadorFormData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, jugadorFormData);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
