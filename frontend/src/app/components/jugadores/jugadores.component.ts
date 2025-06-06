import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { JugadoresService } from '../../services/jugadores.service';
import { EquipoService } from '../../services/equipo.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  imports: [FormsModule, CommonModule, HttpClientModule],
  styleUrls: ['./jugadores.component.css'],
  standalone: true
})
export class JugadoresComponent implements OnInit {
  jugadores: any[] = [];
  equipos: any[] = [];

  nuevoJugador = { nombre: '', fecha_nac: '', id_equipo: '', foto: null };
  jugadorEditando: any = { nombre: '', fecha_nac: '', id_equipo: '', foto: null };

  editando = false;
  idEditando: number | null = null;
  idEliminar: number | null = null;

  fotoArchivo: File | null = null;
  fotoArchivoEditar: File | null = null;

  private editarModal: Modal | undefined;
  private eliminarModal: Modal | undefined;

  @ViewChild('btnCancelarModal') btnCancelarModal: ElementRef | undefined;

  constructor(
    private jugadorService: JugadoresService,
    private equipoService: EquipoService
  ) { }

  ngOnInit() {
    this.cargarJugadores();
    this.cargarEquipos();

    const editarModalEl = document.getElementById('editarModal');
    if (editarModalEl) {
      this.editarModal = new Modal(editarModalEl);
    }

    const eliminarModalEl = document.getElementById('confirmarEliminarModal');
    if (eliminarModalEl) {
      this.eliminarModal = new Modal(eliminarModalEl);
    }
  }

  cargarJugadores() {
    this.jugadorService.getAll().subscribe(data => this.jugadores = data);
  }

  cargarEquipos() {
    this.equipoService.getAll().subscribe(data => this.equipos = data);
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.fotoArchivo = event.target.files[0];
    }
  }

  onFileSelectedEditar(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.fotoArchivoEditar = event.target.files[0];
    }
  }

  guardar() {
    // Validación adicional para evitar jugador sin equipo
    if (this.editando && this.idEditando !== null) {
      if (!this.jugadorEditando.id_equipo) {
        alert('Debes seleccionar un equipo para el jugador.');
        return;
      }
    } else {
      if (!this.nuevoJugador.id_equipo) {
        alert('Debes seleccionar un equipo para el jugador.');
        return;
      }
      if (!this.fotoArchivo) {
        alert('Por favor, selecciona una foto.');
        return;
      }
    }

    if (this.editando && this.idEditando !== null) {
      // Edición
      const formData = new FormData();
      const jugadorBlob = new Blob([JSON.stringify(this.jugadorEditando)], { type: 'application/json' });
      formData.append('jugador', jugadorBlob);
      if (this.fotoArchivoEditar) {
        formData.append('foto', this.fotoArchivoEditar);
      }

      this.jugadorService.update(this.idEditando, formData).subscribe(() => {
        this.cancelarEdicion();
        this.cargarJugadores();
        this.btnCancelarModal?.nativeElement.click();
        this.fotoArchivoEditar = null;
      });
    } else {
      // Creación
      const formData = new FormData();
      const jugadorBlob = new Blob([JSON.stringify(this.nuevoJugador)], { type: 'application/json' });
      formData.append('jugador', jugadorBlob);
      formData.append('foto', this.fotoArchivo!);

      this.jugadorService.create(formData).subscribe(() => {
        this.nuevoJugador = { nombre: '', fecha_nac: '', id_equipo: '', foto: null };
        this.cargarJugadores();
        this.fotoArchivo = null;
      });
    }
  }

  abrirModalEditar(jugador: any) {
    this.editando = true;
    this.idEditando = jugador.id_jugador; // ojo id_jugador para que coincida con BD
    this.jugadorEditando = {
      nombre: jugador.nombre,
      fecha_nac: jugador.fecha_nac,
      id_equipo: jugador.equipo?.id_equipo || '',
      foto: jugador.foto || null
    };
    this.fotoArchivoEditar = null;
    this.editarModal?.show();
  }

  cancelarEdicion() {
    this.editando = false;
    this.idEditando = null;
    this.jugadorEditando = { nombre: '', fecha_nac: '', id_equipo: '', foto: null };
    this.fotoArchivoEditar = null;
    this.editarModal?.hide();
  }

  abrirModalEliminar(jugador: any) {
    this.idEliminar = jugador.id_jugador;
    this.eliminarModal?.show();
  }

  confirmarEliminar() {
    if (this.idEliminar !== null) {
      this.jugadorService.delete(this.idEliminar).subscribe(() => {
        this.idEliminar = null;
        this.cargarJugadores();
        this.eliminarModal?.hide();
      });
    }
  }
}
