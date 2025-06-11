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
  parteActual = 0;
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
  tiempoAnadido = 0;
  tiempoMaximoEnSegundos = 45 * 60; // 45 minutos
  botonTiempoAnadidoHabilitado = false;

  mostrarModalTiempoAnadido = false;
  tiempoAnadirInput = 0;

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

  onTipoEventoClick(nombreTipo: string) {
    if (nombreTipo === 'onceInicLocal') {
      this.abrirModalOnceInicial(true);
    } else if (nombreTipo === 'onceInicVisitante') {
      this.abrirModalOnceInicial(false);
    } else if (nombreTipo === 'inicioPartido') {
      this.iniciarPartido();
    } else if (nombreTipo === 'tExtra1') {
      this.abrirModalTiempoAnadido();
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

  iniciarPartido() {
    if (this.onceLocalPuesto && this.onceVisitantePuesto && !this.partidoIniciado) {
      this.partidoIniciado = true;
      this.parteActual = 1;
      this.iniciarCronometro();
    }
  }

  iniciarCronometro() {
    this.pararCronometro();
    this.intervaloId = setInterval(() => {
      const maxTiempo = this.tiempoMaximoEnSegundos + this.tiempoAnadido * 60;

      if (this.tiempoEnSegundos < maxTiempo) {
        this.tiempoEnSegundos++;

        if (this.tiempoEnSegundos === 40 * 60) {
          this.botonTiempoAnadidoHabilitado = true;
        }
      } else {
        this.pararCronometro();
        this.registrarFinPrimeraParte(); // << NUEVO
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
      this.tiempoAnadido = this.tiempoAnadirInput;
      this.mostrarModalTiempoAnadido = false;
    } else {
      alert('Introduce un valor entre 0 y 8 minutos.');
    }
  }

  registrarFinPrimeraParte() {
    if (!this.partido) return;

    const tipoFinPrimeraParte = this.tipoEventos.find(t => t.id_tipo_evento === 4);
    if (!tipoFinPrimeraParte) return;

    const horas = 0;  // Asumiendo que nunca pasa de 1 hora aquí, si puede, adapta
    const minutos = Math.floor(this.tiempoEnSegundos / 60);
    const segundos = this.tiempoEnSegundos % 60;
    const tiempoFormateado = `${this.pad(horas)}:${this.pad(minutos)}:${this.pad(segundos)}`;

    const eventoFinPrimeraParte: Evento = {
      id_tipo_evento: 4,
      id_partido: this.partido.id_partido,
      tiempo_partido: tiempoFormateado,
      id_jugador: null
    };

    console.log('Enviando evento:', eventoFinPrimeraParte);

    this.eventosService.registrarEvento(eventoFinPrimeraParte).subscribe({
      next: res => console.log('Evento guardado', res),
      error: err => console.error('Error al guardar evento', err)
    });
  }



  cancelarTiempoAnadido() {
    this.mostrarModalTiempoAnadido = false;
  }

  botonHabilitado(tipo: TipoEvento): boolean {
    const id = tipo.id_tipo_evento;

    if (id === 1 || id === 27) {
      // Solo botones once inicial habilitados al principio y si no puestos aún
      return !this.partidoIniciado && ((id === 1 && !this.onceLocalPuesto) || (id === 27 && !this.onceVisitantePuesto));
    }
    if (id === 2) {
      // Botón inicio partido habilitado solo si los dos onces puestos y partido NO iniciado
      return this.onceLocalPuesto && this.onceVisitantePuesto && !this.partidoIniciado;
    }
    if (id === 5) {
      // Botón tiempo añadido solo si partido iniciado y llegamos a minuto 40
      return this.partidoIniciado && this.botonTiempoAnadidoHabilitado;
    }
    // Otros botones habilitados solo si partido iniciado
    return this.partidoIniciado;
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

  ocultarModalOnceInicial() {
    this.mostrarModalOnceInicial = false;
  }
}
