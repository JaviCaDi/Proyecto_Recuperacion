import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JornadasService {
  private baseUrl = 'http://localhost:8080/api/jornadas';

  constructor(private http: HttpClient) { }

  listar(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  crear(conTodos: boolean): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/crear?conTodos=${conTodos}`, {});
  }

  limpiar(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/limpiar`);
  }

  actualizar(jornada: any) {
    return this.http.put(`${this.baseUrl}/${jornada.idJornada}`, jornada);
  }

  buscarPorId(id: number) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }


}
