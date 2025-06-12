import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasService } from '../../services/estadisticas.service';
import { FormsModule } from '@angular/forms';

interface JugadorEstadistica {
  nombreJugador: string;
  nombreEquipo: string;
  cantidad: number;
}

interface EquipoEstadistica {
  nombreEquipo: string;
  cantidad: number;
}

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  private estadisticasService = inject(EstadisticasService);

  categoriaSeleccionada: string = 'goles';
  categorias: string[] = ['goles', 'asistencias', 'tarjetaAma', 'tarjetaRoja'];

  mostrarEquipos: boolean = false;

  topJugadores: JugadorEstadistica[] = [];
  topEquipos: EquipoEstadistica[] = [];

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    if (this.mostrarEquipos) {
      this.estadisticasService.getTopEquipos(this.categoriaSeleccionada)
        .subscribe((data: EquipoEstadistica[]) => {
          console.log('Equipos', data);
          this.topEquipos = data;
          this.topJugadores = [];
        });
    } else {
      this.estadisticasService.getTopJugadores(this.categoriaSeleccionada)
        .subscribe((data: JugadorEstadistica[]) => {
          console.log('Jugadores', data);
          this.topJugadores = data;
          this.topEquipos = [];
        });
    }
  }
}
