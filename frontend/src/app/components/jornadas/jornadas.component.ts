import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JornadasService } from '../../services/jornadas.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jornadas',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './jornadas.component.html',
  styleUrl: './jornadas.component.css'
})
export class JornadasComponent implements OnInit {
  jornadas: any[] = [];
  loading = false;
  jornadaSeleccionada: any = null;
  modoModal: 'editar' | 'inspeccionar' | null = null;


  constructor(private jornadasService: JornadasService) { }

  ngOnInit(): void {
    this.obtenerJornadas();
  }

  obtenerJornadas(): void {
    this.loading = true;
    this.jornadasService.listar().subscribe({
      next: (data) => {
        this.jornadas = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener jornadas', err);
        this.loading = false;
      },
    });
  }

  crearJornadas(): void {
    const incluirTodos = confirm('¿Quieres crear jornadas con todos los equipos?');
    this.jornadasService.crear(incluirTodos).subscribe(() => {
      this.obtenerJornadas();
    });
  }

  limpiarJornadas(): void {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar todas las jornadas?');
    if (!confirmar) return;

    this.jornadasService.limpiar().subscribe(() => {
      this.obtenerJornadas();
    });
  }

  editarJornada(jornada: any): void {
    this.jornadaSeleccionada = { ...jornada }; // clonamos para evitar cambios inmediatos
    this.modoModal = 'editar';
  }

  inspeccionarJornada(jornada: any): void {
    this.jornadasService.buscarPorId(jornada.idJornada).subscribe((detallada) => {
      this.jornadaSeleccionada = detallada;
      this.modoModal = 'inspeccionar';
    });
  }


  cerrarModal(): void {
    this.jornadaSeleccionada = null;
    this.modoModal = null;
  }

  guardarCambios(): void {
    if (this.jornadaSeleccionada) {
      console.log('ID de jornada:', this.jornadaSeleccionada.idJornada);
      console.log('Datos completos:', this.jornadaSeleccionada);

      this.jornadasService.actualizar(this.jornadaSeleccionada).subscribe(() => {
        this.obtenerJornadas();
        this.cerrarModal();
      }, (error) => {
        console.error('Error al actualizar la jornada:', error);
      });
    }
  }


}
