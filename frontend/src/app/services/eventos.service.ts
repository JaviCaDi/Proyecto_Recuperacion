import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Evento {
  id_evento?: number;
  tiempo_partido: string; // formato HH:mm:ss
  tipoEvento: { id_tipo_evento: number };
  jugador?: { id_jugador: number };
  partido?: { id_partido: number };
}

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = 'http://localhost:8080/api/eventos';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }

  create(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(this.apiUrl, evento);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
