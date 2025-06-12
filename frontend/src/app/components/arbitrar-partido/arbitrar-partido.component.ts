import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evento, EventosService, Partido, TipoEvento } from '../../services/eventos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-arbitrar-partido',
  templateUrl: './arbitrar-partido.component.html',
  styleUrls: ['./arbitrar-partido.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ArbitrarComponent implements OnInit, OnDestroy {
  tipoEventos: TipoEvento[] = [];
  tipoEventosEspeciales: TipoEvento[] = [];
  tipoEventosNormales: TipoEvento[] = [];

  partido: Partido | null = null;
  parteActual = 0; // 0 = antes de empezar, 1=primera parte, 2=segunda parte
  tiempoEnSegundos = 0;
  velocidad = 1;
  intervaloId: any;

  mostrarModalOnceInicial = false;
  jugadoresOnceInicial: any[] = [];
  jugadoresSeleccionadosIds: Set<number> = new Set();
  esLocalOnceInicial = true;

  onceLocalPuesto = false;
  onceVisitantePuesto = false;

  partidoIniciado = false;
  tiempoAnadidoPrimeraParte = 0;
  tiempoAnadidoSegundaParte = 0;

  tiempoMaximoEnSegundos = 45 * 60; // 45 minutos
  botonTiempoAnadidoHabilitado = false;

  mostrarModalTiempoAnadido = false;
  tiempoAnadirInput = 0;

  tiempoTerminado = false;          // Indica si se agotó el tiempo en la parte actual
  duracionPrimeraParte = 0;         // Guarda duración primera parte
  tituloParte = '';

  eventoNormalSeleccionado: TipoEvento | null = null;
  jugadorSeleccionadoId: number | null = null;
  mostrarModalEventoNormal: boolean = false;

  equipoSeleccionadoId: number | null = null;
  jugadoresEquipoSeleccionado: any[] = [];


  constructor(private eventosService: EventosService, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.eventosService.getPartidoById(id).subscribe({
      next: (p) => {
        this.partido = p;
      },
      error: (err) => console.error('Error cargando partido:', err)
    });

    this.eventosService.getTipoEventos().subscribe({
      next: (tipos) => {
        this.tipoEventos = tipos;

        const ordenEspeciales = [1, 27, 2, 5, 7, 6]; // IDs especiales

        this.tipoEventosEspeciales = ordenEspeciales
          .map(id => tipos.find(t => t.id_tipo_evento === id))
          .filter((t): t is TipoEvento => t !== undefined);

        this.tipoEventosNormales = tipos
          .filter(t => !ordenEspeciales.includes(t.id_tipo_evento));
      },
      error: (err) => console.error('Error cargando tipos de evento:', err)
    });
  }

  onTipoEventoClick(nombreTipo: string) {
    if (nombreTipo === 'onceInicLocal') {
      this.abrirModalOnceInicial(true);
    } else if (nombreTipo === 'onceInicVisitante') {
      this.abrirModalOnceInicial(false);
    } else if (nombreTipo === 'inicioPartido') {
      this.iniciarPartido();
    } else if (nombreTipo === 'tExtra1') {
      this.abrirModalTiempoAnadido();
    } else if (nombreTipo === 'inicioSegunda') {
      this.iniciarSegundaParte();
    } else if (nombreTipo === 'tExtra2') {
      this.abrirModalTiempoAnadido();
    } else {
      const tipoEvento = this.tipoEventosNormales.find(t => t.nombre === nombreTipo);
      if (tipoEvento) {
        this.abrirModalEventoNormal(tipoEvento);
      } else {
        console.warn('Tipo de evento no encontrado:', nombreTipo);
      }
    }

  }

  abrirModalOnceInicial(esLocal: boolean) {
    if (!this.partido) return;

    this.esLocalOnceInicial = esLocal;
    this.jugadoresSeleccionadosIds = new Set();

    const idEquipo = esLocal ? this.partido.local.idEquipo : this.partido.visitante.idEquipo;

    this.eventosService.getJugadoresByEquipo(idEquipo).subscribe({
      next: (jugadores) => {
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

    this.eventosService.registrarEventos(eventos).subscribe({
      next: () => {
        this.mostrarModalOnceInicial = false;

        if (this.esLocalOnceInicial) {
          this.onceLocalPuesto = true;
        } else {
          this.onceVisitantePuesto = true;
        }
      },
      error: err => {
        alert('Error registrando once inicial');
      }
    });
  }

  abrirModalEventoNormal(evento: TipoEvento) {
    if (!this.partido) return;

    this.eventoNormalSeleccionado = evento;
    this.jugadorSeleccionadoId = null;
    this.equipoSeleccionadoId = null;
    this.jugadoresEquipoSeleccionado = [];
    this.mostrarModalEventoNormal = true;
  }

  onEquipoSeleccionado(): void {
    if (!this.equipoSeleccionadoId) {
      this.jugadoresEquipoSeleccionado = [];
      return;
    }

    this.eventosService.getJugadoresByEquipo(this.equipoSeleccionadoId).subscribe({
      next: jugadores => {
        this.jugadoresEquipoSeleccionado = jugadores;
        this.jugadorSeleccionadoId = null;
      },
      error: err => {
        console.error('Error al cargar jugadores del equipo:', err);
        alert('No se pudieron cargar los jugadores del equipo seleccionado.');
      }
    });
  }



  confirmarEventoNormal() {
    if (!this.partido || !this.eventoNormalSeleccionado || !this.jugadorSeleccionadoId) {
      alert('Debes seleccionar un jugador.');
      return;
    }

    const evento: Evento = {
      id_tipo_evento: this.eventoNormalSeleccionado.id_tipo_evento,
      id_partido: this.partido.id_partido,
      id_jugador: this.jugadorSeleccionadoId,
      tiempo_partido: this.formatearTiempo(this.tiempoEnSegundos)
    };

    this.eventosService.registrarEvento(evento).subscribe({
      next: () => {
        this.mostrarModalEventoNormal = false;
        this.eventoNormalSeleccionado = null;
        this.jugadorSeleccionadoId = null;
      },
      error: err => {
        console.error('Error al registrar evento normal:', err);
        alert('Error al registrar evento.');
      }
    });
  }

  cancelarEventoNormal() {
    this.mostrarModalEventoNormal = false;
    this.eventoNormalSeleccionado = null;
    this.jugadorSeleccionadoId = null;
  }


  iniciarPartido() {
    if (this.onceLocalPuesto && this.onceVisitantePuesto && !this.partidoIniciado) {
      this.partidoIniciado = true;
      this.parteActual = 1;
      this.tiempoTerminado = false;
      this.tiempoEnSegundos = 0;
      this.tituloParte = 'Primera parte';
      this.botonTiempoAnadidoHabilitado = false;
      this.iniciarCronometro();
    }
  }

  iniciarSegundaParte() {
    if (this.parteActual === 1 && this.tiempoTerminado) {
      this.parteActual = 2;
      this.tiempoTerminado = false;
      this.tiempoEnSegundos = 0;
      this.tituloParte = 'Segunda parte';
      this.botonTiempoAnadidoHabilitado = false;
      this.iniciarCronometro();
    }
  }

  iniciarCronometro() {
    this.pararCronometro();

    this.intervaloId = setInterval(() => {
      let maxTiempo = this.tiempoMaximoEnSegundos;

      if (this.parteActual === 1) {
        maxTiempo += this.tiempoAnadidoPrimeraParte * 60;
      } else if (this.parteActual === 2) {
        maxTiempo += this.tiempoAnadidoSegundaParte * 60;
      }

      if (this.tiempoEnSegundos < maxTiempo) {
        this.tiempoEnSegundos++;

        if (this.tiempoEnSegundos === 40 * 60) {
          this.botonTiempoAnadidoHabilitado = true;
        }
      } else {
        this.pararCronometro();
        if (this.parteActual === 1) {
          this.registrarFinPrimeraParte();
        } else if (this.parteActual === 2) {
          this.registrarFinPartido();
        }
      }
    }, 1000 / this.velocidad);
  }


  pararCronometro() {
    if (this.intervaloId) {
      clearInterval(this.intervaloId);
      this.intervaloId = null;
    }
  }

  cambiarVelocidad(nuevaVelocidad: number) {
    this.velocidad = nuevaVelocidad;
    if (this.intervaloId) {
      this.pararCronometro();
      this.iniciarCronometro();
    }
  }

  abrirModalTiempoAnadido() {
    if (this.botonTiempoAnadidoHabilitado) {
      this.tiempoAnadirInput = 0;
      this.mostrarModalTiempoAnadido = true;
    }
  }

  confirmarTiempoAnadido() {
    if (this.tiempoAnadirInput >= 0 && this.tiempoAnadirInput <= 8) {
      if (this.parteActual === 1) {
        this.tiempoAnadidoPrimeraParte = this.tiempoAnadirInput;
      } else if (this.parteActual === 2) {
        this.tiempoAnadidoSegundaParte = this.tiempoAnadirInput;
      }

      this.mostrarModalTiempoAnadido = false;
    } else {
      alert('Introduce un valor entre 0 y 8 minutos.');
    }
  }


  registrarFinPrimeraParte() {
    if (!this.partido) return;

    const tipoFinPrimeraParte = this.tipoEventos.find(t => t.id_tipo_evento === 4);
    if (!tipoFinPrimeraParte) return;

    this.tiempoTerminado = true;
    this.duracionPrimeraParte = this.tiempoEnSegundos; // Guardamos duración real

    const tiempoFormateado = this.formatearTiempo(this.tiempoEnSegundos);

    const eventoFinPrimeraParte: Evento = {
      id_tipo_evento: 4,
      id_partido: this.partido.id_partido,
      tiempo_partido: tiempoFormateado,
      id_jugador: null
    };

    this.eventosService.registrarEvento(eventoFinPrimeraParte).subscribe({
      next: res => console.log('Evento fin primera parte guardado', res),
      error: err => console.error('Error al guardar evento fin primera parte', err)
    });
  }

  registrarFinPartido() {
    if (!this.partido) return;

    const tipoFinPartido = this.tipoEventos.find(t => t.id_tipo_evento === 3);
    if (!tipoFinPartido) return;

    this.tiempoTerminado = true;

    // Sumamos duración primera parte + segunda parte actual
    const duracionTotal = this.duracionPrimeraParte + this.tiempoEnSegundos;
    const tiempoFormateado = this.formatearTiempo(duracionTotal);

    const eventoFinPartido: Evento = {
      id_tipo_evento: 3,
      id_partido: this.partido.id_partido,
      tiempo_partido: tiempoFormateado,
      id_jugador: null
    };

    this.eventosService.registrarEvento(eventoFinPartido).subscribe({
      next: res => console.log('Evento fin partido guardado', res),
      error: err => console.error('Error al guardar evento fin partido', err)
    });
  }

  cancelarTiempoAnadido() {
    this.mostrarModalTiempoAnadido = false;
  }

  botonHabilitado(tipo: TipoEvento): boolean {
    const id = tipo.id_tipo_evento;

    // Especiales
    if (id === 1) return !this.onceLocalPuesto && !this.partidoIniciado; // onceInicLocal
    if (id === 27) return !this.onceVisitantePuesto && !this.partidoIniciado; // onceInicVisitante
    if (id === 2) return this.onceLocalPuesto && this.onceVisitantePuesto && !this.partidoIniciado; // inicioPartido
    if (id === 5) return this.partidoIniciado && !this.tiempoTerminado && this.botonTiempoAnadidoHabilitado && this.parteActual === 1; // tExtra1
    if (id === 7) return this.parteActual === 1 && this.tiempoTerminado; // inicioSegunda
    if (id === 6) return this.parteActual === 2 && !this.tiempoTerminado && this.botonTiempoAnadidoHabilitado; // tExtra2
    if (id === 3) return this.parteActual === 2 && this.tiempoTerminado; // finPartido

    // Normales (los no especiales)
    const idsEspeciales = [1, 2, 3, 5, 6, 7, 27];
    const esEventoNormal = !idsEspeciales.includes(id);

    if (esEventoNormal) {
      return this.partidoIniciado && !this.tiempoTerminado;
    }

    return false;
  }



  get tiempoFormateado(): string {
    const minutos = Math.floor(this.tiempoEnSegundos / 60);
    const segundos = this.tiempoEnSegundos % 60;
    return `${this.pad(minutos)}:${this.pad(segundos)}`;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  formatearTiempo(segundosTotales: number): string {
    const horas = Math.floor(segundosTotales / 3600);
    const minutos = Math.floor((segundosTotales % 3600) / 60);
    const segundos = segundosTotales % 60;
    return `${this.pad(horas)}:${this.pad(minutos)}:${this.pad(segundos)}`;
  }

  ocultarModalOnceInicial() {
    this.mostrarModalOnceInicial = false;
  }

  ngOnDestroy() {
    this.pararCronometro();
  }
}
