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
  jugadores: Jugador[];
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

export interface TipoEvento {
  id_tipo_evento: number;
  nombre: string;
}

export interface Jugador {
  id_jugador: number;
  nombre: string;
  dorsal: number;
  posicion: string;
  equipo: Equipo;
}

export interface Evento {
  tiempo_partido: string; // Formato HH:mm:ss
  id_tipo_evento: number;
  id_jugador: number | null;
  id_partido: number;
}

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getMisPartidos(): Observable<Partido[]> {
    return this.http.get<Partido[]>(`${this.baseUrl}/eventos/mis-partidos`);
  }

  getPartidoById(id: number): Observable<Partido> {
    return this.http.get<Partido>(`${this.baseUrl}/arbitraje/partido/${id}`);
  }

  getTipoEventos(): Observable<TipoEvento[]> {
    return this.http.get<TipoEvento[]>(`${this.baseUrl}/tipoeventos`);
  }

  getJugadoresByEquipo(idEquipo: number): Observable<Jugador[]> {
    return this.http.get<Jugador[]>(`${this.baseUrl}/jugadores/equipo/${idEquipo}`);
  }

  registrarEventos(eventos: Evento[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/eventos`, eventos);
  }

  getEventosPorPartido(idPartido: number): Observable<Evento[]> {
    return this.http.get<Evento[]>(`${this.baseUrl}/eventos/partido/${idPartido}`);
  }

  registrarEvento(evento: Evento): Observable<Evento> {
    console.log('Registrando evento:', evento);
    return this.http.post<Evento>(`${this.baseUrl}/eventos/uno`, evento);
  }

}
