import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ArbitroService } from '../../services/arbitro.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-arbitros',
  templateUrl: './arbitros.component.html',
  imports: [FormsModule, CommonModule, HttpClientModule],
  styleUrls: ['./arbitros.component.css'],
  standalone: true
})
export class ArbitrosComponent implements OnInit {
  // Lista de árbitros
  arbitros: any[] = [];

  // Objetos para crear y editar árbitros
  nuevoArbitro = { nombre: '', fecha_nac: '', federacion: '' };
  arbitroEditando = { nombre: '', fecha_nac: '', federacion: '' };

  // Flags y IDs para control de edición/eliminación
  editando = false;
  idEditando: number | null = null;
  idEliminar: number | null = null;

  // Modales de Bootstrap
  private editarModal: Modal | undefined;
  private eliminarModal: Modal | undefined;

  @ViewChild('btnCancelarModal') btnCancelarModal: ElementRef | undefined;

  constructor(private arbitroService: ArbitroService) {}

  ngOnInit() {
    this.cargarArbitros();

    // Inicialización de modales
    const editarModalEl = document.getElementById('editarModal');
    if (editarModalEl) {
      this.editarModal = new Modal(editarModalEl);
    }

    const eliminarModalEl = document.getElementById('confirmarEliminarModal');
    if (eliminarModalEl) {
      this.eliminarModal = new Modal(eliminarModalEl);
    }
  }

  // Carga todos los árbitros desde el backend
  cargarArbitros() {
    this.arbitroService.getAll().subscribe(data => this.arbitros = data);
  }

  // Guarda un nuevo árbitro o actualiza uno existente
  guardar() {
    if (this.editando && this.idEditando !== null) {
      this.arbitroService.update(this.idEditando, this.arbitroEditando).subscribe(() => {
        this.cancelarEdicion();
        this.cargarArbitros();
        this.btnCancelarModal?.nativeElement.click();
      });
    } else {
      this.arbitroService.create(this.nuevoArbitro).subscribe(() => {
        this.nuevoArbitro = { nombre: '', fecha_nac: '', federacion: '' };
        this.cargarArbitros();
      });
    }
  }

  // Abre el modal de edición con los datos del árbitro
  abrirModalEditar(arbitro: any) {
    this.editando = true;
    this.idEditando = arbitro.idArbitro;
    this.arbitroEditando = { ...arbitro };
    this.editarModal?.show();
  }

  // Cancela la edición
  cancelarEdicion() {
    this.editando = false;
    this.idEditando = null;
    this.arbitroEditando = { nombre: '', fecha_nac: '', federacion: '' };
    this.editarModal?.hide();
  }

  // Abre el modal de confirmación para eliminar árbitro
  abrirModalEliminar(arbitro: any) {
    this.idEliminar = arbitro.idArbitro;
    this.eliminarModal?.show();
  }

  // Confirma y realiza la eliminación
  confirmarEliminar() {
    if (this.idEliminar !== null) {
      this.arbitroService.delete(this.idEliminar).subscribe(() => {
        this.idEliminar = null;
        this.cargarArbitros();
        this.eliminarModal?.hide();
      });
    }
  }
}
