package com.jcd.proyecto.controller;

import com.jcd.proyecto.dto.EventoDTO;
import com.jcd.proyecto.model.*;
import com.jcd.proyecto.service.EventoService;
import com.jcd.proyecto.service.PartidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "*")
public class EventoController {

    @Autowired
    private PartidoService partidoService;

    @Autowired
    private EventoService eventoService;

    @PostMapping
    public ResponseEntity<List<Evento>> registrarEventos(@RequestBody List<EventoDTO> eventosDTO) {
        List<Evento> eventos = eventosDTO.stream().map(dto -> {
            Evento evento = new Evento();
            evento.setTiempo_partido(LocalTime.parse(dto.getTiempo_partido()));

            TipoEvento tipoEvento = new TipoEvento();
            tipoEvento.setId_tipo_evento(dto.getId_tipo_evento());
            evento.setTipoEvento(tipoEvento);

            Jugador jugador = new Jugador();
            jugador.setId_jugador(dto.getId_jugador());
            evento.setJugador(jugador);

            Partido partido = new Partido();
            partido.setId_partido(dto.getId_partido());
            evento.setPartido(partido);

            return evento;
        }).collect(Collectors.toList());

        List<Evento> guardados = eventoService.guardarTodos(eventos);
        return ResponseEntity.ok(guardados);
    }

    @GetMapping("/partido/{id}")
    public List<Evento> obtenerPorPartido(@PathVariable Integer id) {
        return eventoService.obtenerPorPartido(id);
    }

    // Endpoint para listar partidos que arbitra el usuario logueado
    @GetMapping("/mis-partidos")
    public ResponseEntity<List<Partido>> listarPartidosPorArbitro(Authentication authentication) {
        Long idArbitro = obtenerIdArbitroDesdeAuthentication(authentication);
        if (idArbitro == null) {
            return ResponseEntity.badRequest().build();
        }

        List<Partido> partidos = partidoService.listarPorArbitro(idArbitro);
        return ResponseEntity.ok(partidos);
    }

    private Long obtenerIdArbitroDesdeAuthentication(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof Usuario)) {
            return null;
        }

        Usuario usuario = (Usuario) authentication.getPrincipal();

        if (usuario.getArbitro() == null) {
            return null;
        }

        return usuario.getArbitro().getIdArbitro().longValue(); // convertimos Integer a Long
    }
}
