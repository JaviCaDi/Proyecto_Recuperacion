import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Equipo {
  idEquipo: number;
  nombre: string;
  anioFundacion: number;
  ciudad: string;
  escudo: string;
  fotoOficial: string;
}

export interface Arbitro {
  idArbitro: number;
  nombre: string;
  federacion: string;
  fecha_nac: string;
}

export interface Partido {
  id_partido: number;
  local: Equipo;
  visitante: Equipo;
  arbitro: Arbitro;
  fecha_prevista: string;
  fecha_inicio: string | null;
}

// Aquí defines la interfaz TipoEvento que faltaba
export interface TipoEvento {
  id_tipo_evento: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private apiUrl = 'http://localhost:8080/api/eventos/mis-partidos';
  private tipoEventosUrl = 'http://localhost:8080/api/tipoeventos';

  constructor(private http: HttpClient) { }

  getMisPartidos(): Observable<Partido[]> {
    return this.http.get<Partido[]>(this.apiUrl);
  }

  getPartidoById(id: number): Observable<Partido> {
    const url = `http://localhost:8080/api/arbitraje/partido/${id}`;
    return this.http.get<Partido>(url);
  }

  getTipoEventos(): Observable<TipoEvento[]> {
    return this.http.get<TipoEvento[]>(this.tipoEventosUrl);
  }
}
