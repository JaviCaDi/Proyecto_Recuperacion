import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evento, EventosService, Partido, TipoEvento } from '../../services/eventos.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-arbitrar-partido',
  templateUrl: './arbitrar-partido.component.html',
  styleUrls: ['./arbitrar-partido.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ArbitrarComponent implements OnInit, OnDestroy {
  tipoEventos: TipoEvento[] = [];
  tipoEventosEspeciales: TipoEvento[] = [];
  tipoEventosNormales: TipoEvento[] = [];

  partido: Partido | null = null;
  parteActual = 0;
  tiempoEnSegundos = 0;
  velocidad = 1;
  intervaloId: any;

  mostrarModalOnceInicial = false;
  jugadoresOnceInicial: any[] = [];
  jugadoresSeleccionadosIds: Set<number> = new Set();
  esLocalOnceInicial = true;

  constructor(private eventosService: EventosService, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.eventosService.getPartidoById(id).subscribe({
      next: (p) => {
        this.partido = p;
        console.log('partido.local:', this.partido.local);
        console.log('partido.visitante:', this.partido.visitante);
      },
      error: (err) => console.error('Error cargando partido:', err)
    });

    this.eventosService.getTipoEventos().subscribe({
      next: (tipos) => {
        this.tipoEventos = tipos;

        const ordenEspeciales = [1, 27, 2, 5, 7, 6];

        this.tipoEventosEspeciales = ordenEspeciales
          .map(id => tipos.find(t => t.id_tipo_evento === id))
          .filter((t): t is TipoEvento => t !== undefined);

        this.tipoEventosNormales = tipos
          .filter(t => !ordenEspeciales.includes(t.id_tipo_evento));
      },
      error: (err) => console.error('Error cargando tipos de evento:', err)
    });
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

  get tiempoFormateado(): string {
    const minutos = Math.floor(this.tiempoEnSegundos / 60);
    const segundos = this.tiempoEnSegundos % 60;
    return `${this.pad(minutos)}:${this.pad(segundos)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  onTipoEventoClick(nombreTipo: string) {
    if (nombreTipo === 'onceInicLocal') {
      this.abrirModalOnceInicial(true);
    } else if (nombreTipo === 'onceInicVisitante') {
      this.abrirModalOnceInicial(false);
    } else {
      console.log('Evento seleccionado:', nombreTipo);
    }
  }

  abrirModalOnceInicial(esLocal: boolean) {
    if (!this.partido) return;

    this.esLocalOnceInicial = esLocal;
    this.jugadoresSeleccionadosIds = new Set();

    const idEquipo = esLocal ? this.partido.local.idEquipo : this.partido.visitante.idEquipo;

    this.eventosService.getJugadoresByEquipo(idEquipo).subscribe({
      next: (jugadores) => {
        console.log('Jugadores cargados:', jugadores);
        this.jugadoresOnceInicial = [...jugadores];
        this.mostrarModalOnceInicial = true;
      },
      error: (err) => console.error('Error cargando jugadores:', err)
    });
  }

  toggleJugadorSeleccionado(jugador: any) {
    const nuevosSeleccionados = new Set(this.jugadoresSeleccionadosIds);

    if (nuevosSeleccionados.has(jugador.id_jugador)) {
      nuevosSeleccionados.delete(jugador.id_jugador);
    } else if (nuevosSeleccionados.size < 11) {
      nuevosSeleccionados.add(jugador.id_jugador);
    }

    this.jugadoresSeleccionadosIds = nuevosSeleccionados;
  }

  isJugadorSeleccionado(jugador: any): boolean {
    return this.jugadoresSeleccionadosIds.has(jugador.id_jugador);
  }

  confirmarOnceInicial() {
    if (this.jugadoresSeleccionadosIds.size !== 11 || !this.partido) {
      alert('Debe seleccionar exactamente 11 jugadores.');
      return;
    }

    const nombreEvento = this.esLocalOnceInicial ? 'onceInicLocal' : 'onceInicVisitante';
    const tipoEvento = this.tipoEventos.find(t => t.nombre === nombreEvento);

    if (!tipoEvento) {
      alert(`No se encontró el tipo de evento "${nombreEvento}"`);
      return;
    }

    const eventos: Evento[] = Array.from(this.jugadoresSeleccionadosIds).map(idJugador => ({
      tiempo_partido: '00:00:00',
      id_tipo_evento: tipoEvento.id_tipo_evento,
      id_jugador: idJugador,
      id_partido: this.partido!.id_partido
    }));

    console.log('Eventos a registrar:', eventos);

    this.eventosService.registrarEventos(eventos).subscribe({
      next: () => {
        console.log('Once inicial registrado correctamente.');
        this.mostrarModalOnceInicial = false;
      },
      error: err => {
        console.error('Error registrando once inicial:', err);
        alert('Error registrando once inicial');
      }
    });
  }

  ocultarModalOnceInicial() {
    this.mostrarModalOnceInicial = false;
  }
}
