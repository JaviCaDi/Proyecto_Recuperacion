import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { EventosService, Partido } from '../../services/eventos.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule]
})
export class EventosComponent implements OnInit {

  partidos: Partido[] = [];

  constructor(private eventosService: EventosService, private router: Router) {}

  ngOnInit(): void {
    this.cargarPartidos();
  }

  cargarPartidos(): void {
    this.eventosService.getMisPartidos().subscribe({
      next: (data) => this.partidos = data,
      error: (err) => console.error('Error al cargar partidos:', err)
    });
  }

  arbitrarPartido(idPartido: number): void {
    this.router.navigate(['/arbitrar', idPartido]);
  }
}
