import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Modal } from 'bootstrap';
import { EquipoService } from '../../services/equipo.service';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule]
})
export class EquiposComponent implements OnInit {
  // Lista de equipos a mostrar
  equipos: any[] = [];

  // Objeto para registrar un nuevo equipo
  nuevoEquipo = {
    nombre: '',
    ciudad: '',
    anio_fundacion: null,
    escudo: '',
    foto_oficial: ''
  };

  // Objeto para edición de equipos existentes
  equipoEditando = { ...this.nuevoEquipo };

  // Datos del equipo para inspección
  equipoInspeccion: any = null;
  jugadoresPorEquipo: any[] = [];

  // Flags de control para edición y eliminación
  editando = false;
  idEditando: number | null = null;
  idEliminar: number | null = null;

  // Modales de Bootstrap
  private editarModal: Modal | undefined;
  private eliminarModal: Modal | undefined;
  private inspeccionarModal: Modal | undefined;

  // Referencia al botón que cierra el modal de edición
  @ViewChild('btnCancelarModal') btnCancelarModal: ElementRef | undefined;

  constructor(private equipoService: EquipoService) {}

  ngOnInit(): void {
    this.cargarEquipos();

    // Inicialización de los modales usando Bootstrap
    const editarModalEl = document.getElementById('editarModal');
    if (editarModalEl) this.editarModal = new Modal(editarModalEl);

    const eliminarModalEl = document.getElementById('confirmarEliminarModal');
    if (eliminarModalEl) this.eliminarModal = new Modal(eliminarModalEl);

    const inspeccionarModalEl = document.getElementById('inspeccionarModal');
    if (inspeccionarModalEl) this.inspeccionarModal = new Modal(inspeccionarModalEl);
  }

  // Obtiene todos los equipos del backend
  cargarEquipos(): void {
    this.equipoService.getAll().subscribe(data => this.equipos = data);
  }

  // Guarda un nuevo equipo o actualiza uno existente
  guardar(): void {
    if (this.editando && this.idEditando !== null) {
      this.equipoService.update(this.idEditando, this.equipoEditando).subscribe(() => {
        this.cancelarEdicion();
        this.cargarEquipos();
        this.btnCancelarModal?.nativeElement.click();
      });
    } else {
      this.equipoService.create(this.nuevoEquipo).subscribe(() => {
        this.nuevoEquipo = { nombre: '', ciudad: '', anio_fundacion: null, escudo: '', foto_oficial: '' };
        this.cargarEquipos();
      });
    }
  }

  // Abre el modal para editar un equipo
  abrirModalEditar(equipo: any): void {
    this.editando = true;
    this.idEditando = equipo.idEquipo;
    this.equipoEditando = { ...equipo };
    this.editarModal?.show();
  }

  // Cancela la edición del equipo
  cancelarEdicion(): void {
    this.editando = false;
    this.idEditando = null;
    this.equipoEditando = { nombre: '', ciudad: '', anio_fundacion: null, escudo: '', foto_oficial: '' };
    this.editarModal?.hide();
  }

  // Abre el modal de confirmación para eliminar un equipo
  abrirModalEliminar(equipo: any): void {
    this.idEliminar = equipo.idEquipo;
    this.eliminarModal?.show();
  }

  // Elimina el equipo seleccionado
  confirmarEliminar(): void {
    if (this.idEliminar !== null) {
      this.equipoService.delete(this.idEliminar).subscribe(() => {
        this.idEliminar = null;
        this.cargarEquipos();
        this.eliminarModal?.hide();
      });
    }
  }

  // Muestra detalles del equipo y sus jugadores en un modal
  abrirModalInspeccionar(equipo: any): void {
    this.equipoInspeccion = equipo;

    // Simulación de jugadores; se puede conectar al backend en el futuro
    this.jugadoresPorEquipo = [
      { nombre: 'Jugador 1' },
      { nombre: 'Jugador 2' },
      { nombre: 'Jugador 3' }
    ];

    this.inspeccionarModal?.show();
  }
}
