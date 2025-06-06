import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Modal } from 'bootstrap';
import { EventosService, Evento } from '../../services/eventos.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule]
})
export class EventosComponent implements OnInit {
  eventos: Evento[] = [];

  nuevoEvento: Evento = {
    tiempo_partido: '',
    tipoEvento: { id_tipo_evento: 0 },
    jugador: undefined,
    partido: undefined
  };

  eventoInspeccion: Evento | null = null;

  private inspeccionarModal: Modal | undefined;

  @ViewChild('btnCancelarModal') btnCancelarModal: ElementRef | undefined;

  constructor(private eventoService: EventosService) {}

  ngOnInit(): void {
    this.cargarEventos();

    const inspeccionarModalEl = document.getElementById('inspeccionarModal');
    if (inspeccionarModalEl) this.inspeccionarModal = new Modal(inspeccionarModalEl);
  }

  cargarEventos(): void {
    this.eventoService.getAll().subscribe(data => {
      this.eventos = data;
    });
  }

  guardarEvento(): void {
    this.eventoService.create(this.nuevoEvento).subscribe(() => {
      this.nuevoEvento = {
        tiempo_partido: '',
        tipoEvento: { id_tipo_evento: 0 },
        jugador: undefined,
        partido: undefined
      };
      this.cargarEventos();
    });
  }

  eliminarEvento(id: number): void {
    this.eventoService.eliminar(id).subscribe(() => {
      this.cargarEventos();
    });
  }

  abrirModalInspeccionar(evento: Evento): void {
    this.eventoInspeccion = evento;
    this.inspeccionarModal?.show();
  }

  cancelarEdicion(): void {
    this.nuevoEvento = {
      tiempo_partido: '',
      tipoEvento: { id_tipo_evento: 0 },
      jugador: undefined,
      partido: undefined
    };
    this.inspeccionarModal?.hide();
  }
}
