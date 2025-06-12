import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasService } from '../../services/estadisticas.service';
import { FormsModule } from '@angular/forms';

interface JugadorEstadistica {
  nombreJugador: string;
  nombreEquipo: string;
  cantidad: number;
}

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'] // corregido a styleUrls (plural)
})
export class EstadisticasComponent implements OnInit {
  private estadisticasService: EstadisticasService = inject(EstadisticasService);

  categoriaSeleccionada: string = 'goles';
  categorias: string[] = ['goles', 'asistencias', 'tarjetaAma', 'tarjetaRoja'];
  topJugadores: JugadorEstadistica[] = [];

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    this.estadisticasService.getTopJugadores(this.categoriaSeleccionada)
      .subscribe((data: JugadorEstadistica[]) => {
        console.log(data);
        this.topJugadores = data;
      });
  }
}
