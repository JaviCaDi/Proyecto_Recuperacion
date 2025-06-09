package com.jcd.proyecto.controller;

import com.jcd.proyecto.model.Partido;
import com.jcd.proyecto.service.PartidoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/arbitraje")
@CrossOrigin(origins = "*")
public class ArbitrajeController {

    private final PartidoService partidoService;

    public ArbitrajeController(PartidoService partidoService) {
        this.partidoService = partidoService;
    }

    @GetMapping("/partido/{id}")
    public ResponseEntity<Partido> obtenerPartidoParaArbitrar(@PathVariable Long id) {
        Optional<Partido> partidoOpt = partidoService.buscarPorId(id.intValue());
        if (partidoOpt.isPresent()) {
            return ResponseEntity.ok(partidoOpt.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Aquí podrás añadir más endpoints para controlar el arbitraje,
    // como iniciar el partido, cambiar velocidad, registrar eventos, etc.
}
