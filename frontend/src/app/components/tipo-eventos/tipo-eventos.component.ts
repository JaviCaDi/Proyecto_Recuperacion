import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Modal } from 'bootstrap';
import { TipoEventosService } from '../../services/tipo-eventos.service';

@Component({
  selector: 'app-tipo-eventos',
  templateUrl: './tipo-eventos.component.html',
  imports: [FormsModule, CommonModule, HttpClientModule],
  styleUrls: ['./tipo-eventos.component.css'],
  standalone: true
})
export class TipoEventosComponent implements OnInit {
  tiposEvento: any[] = [];

  nuevoTipoEvento = { nombre: '' };
  tipoEventoEditando = { nombre: '' };

  idEditando: number | null = null;
  idEliminar: number | null = null;

  private editarModal: Modal | undefined;
  private eliminarModal: Modal | undefined;

  @ViewChild('btnCancelarModal') btnCancelarModal: ElementRef | undefined;

  constructor(private tipoEventosService: TipoEventosService) { }

  ngOnInit() {
    this.cargarTipos();

    const editarModalEl = document.getElementById('editarModal');
    if (editarModalEl) {
      this.editarModal = new Modal(editarModalEl);
    }

    const eliminarModalEl = document.getElementById('confirmarEliminarModal');
    if (eliminarModalEl) {
      this.eliminarModal = new Modal(eliminarModalEl);
    }
  }

  cargarTipos() {
    this.tipoEventosService.getAll().subscribe(data => this.tiposEvento = data);
  }

  guardar() {
    if (this.idEditando !== null) {
      this.tipoEventosService.update(this.idEditando, this.tipoEventoEditando).subscribe(() => {
        this.cancelarEdicion();
        this.cargarTipos();
        this.btnCancelarModal?.nativeElement.click();
      });
    } else {
      this.tipoEventosService.create(this.nuevoTipoEvento).subscribe(() => {
        this.nuevoTipoEvento = { nombre: '' };
        this.cargarTipos();
      });
    }
  }

  abrirModalEditar(tipo: any) {
    this.idEditando = tipo.id_tipo_evento;
    this.tipoEventoEditando = { ...tipo };
    this.editarModal?.show();
  }

  cancelarEdicion() {
    this.idEditando = null;
    this.tipoEventoEditando = { nombre: '' };
    this.editarModal?.hide();
  }

  abrirModalEliminar(tipo: any) {
    console.log('Eliminar tipo:', tipo);
    this.idEliminar = tipo.id_tipo_evento;
    this.eliminarModal?.show();
  }

  confirmarEliminar() {
    if (this.idEliminar !== null) {
      this.tipoEventosService.delete(this.idEliminar).subscribe(() => {
        this.idEliminar = null;
        this.cargarTipos();
        this.eliminarModal?.hide();
      });
    }
  }
}
