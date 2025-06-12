package com.jcd.proyecto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jcd.proyecto.service.EventoService;
import com.jcd.proyecto.dto.EstadisticaDTO;
import com.jcd.proyecto.dto.EstadisticaEquipoDTO;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class EstadisticasController {

    @Autowired
    private EventoService eventoService;

    // Top jugadores por tipo (goles, asistencias, etc)
    @GetMapping("/estadisticas/{tipo}")
    public ResponseEntity<List<EstadisticaDTO>> getTopEstadistica(@PathVariable String tipo) {
        List<EstadisticaDTO> resultado = eventoService.obtenerTopPorTipo(tipo);
        return ResponseEntity.ok(resultado);
    }

    @GetMapping("/estadisticas/equipos/{tipo}")
    public ResponseEntity<List<EstadisticaEquipoDTO>> getTopEquiposEstadistica(@PathVariable String tipo) {
        List<EstadisticaEquipoDTO> resultado = eventoService.obtenerTopEquiposPorTipo(tipo);
        return ResponseEntity.ok(resultado);
    }

}
