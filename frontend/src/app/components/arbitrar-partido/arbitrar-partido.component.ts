import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventosService, Partido, TipoEvento } from '../../services/eventos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-arbitrar-partido',
  templateUrl: './arbitrar-partido.component.html',
  styleUrls: ['./arbitrar-partido.component.css'],
  standalone: true,
  imports: [CommonModule] // <-- Aquí va CommonModule
})
export class ArbitrarComponent implements OnInit, OnDestroy {
  
  tipoEventos: TipoEvento[] = [];
  partido: Partido | null = null;   // << Aquí está el cambio clave
  parteActual = 0;
  tiempoEnSegundos = 0;
  velocidad = 1;
  intervaloId: any;

  constructor(private eventosService: EventosService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    // Cargar partido
    this.eventosService.getPartidoById(id).subscribe({
      next: (p) => this.partido = p,
      error: (err) => console.error('Error cargando partido:', err)
    });

    // Cargar tipos de evento
    this.eventosService.getTipoEventos().subscribe({
      next: (tipos) => this.tipoEventos = tipos,
      error: (err) => console.error('Error cargando tipos de evento:', err)
    });
  }

  get tiempoFormateado(): string {
    const minutos = Math.floor(this.tiempoEnSegundos / 60);
    const segundos = this.tiempoEnSegundos % 60;
    return `${this.pad(minutos)}:${this.pad(segundos)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  iniciarPartido() {
    if (this.parteActual === 0) {
      this.parteActual = 1;
      this.iniciarCronometro();
    }
  }

  detenerPartido() {
    this.parteActual = 0;
    this.pararCronometro();
    this.tiempoEnSegundos = 0;
  }

  cambiarVelocidad(nuevaVelocidad: number) {
    this.velocidad = nuevaVelocidad;
    if (this.intervaloId) {
      this.pararCronometro();
      this.iniciarCronometro();
    }
  }

  iniciarCronometro() {
    this.intervaloId = setInterval(() => {
      this.tiempoEnSegundos++;
    }, 1000 / this.velocidad);
  }

  pararCronometro() {
    if (this.intervaloId) {
      clearInterval(this.intervaloId);
      this.intervaloId = null;
    }
  }

  ngOnDestroy() {
    this.pararCronometro();
  }
}
