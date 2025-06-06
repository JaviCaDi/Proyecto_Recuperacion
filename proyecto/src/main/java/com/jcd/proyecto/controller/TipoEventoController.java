package com.jcd.proyecto.controller;

import com.jcd.proyecto.model.TipoEvento;
import com.jcd.proyecto.service.TipoEventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tipoeventos")
@CrossOrigin(origins = "*")
public class TipoEventoController {

    @Autowired
    private TipoEventoService tipoEventoService;

    @GetMapping
    public List<TipoEvento> listarTodos() {
        return tipoEventoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoEvento> buscarPorId(@PathVariable Integer id) {
        return tipoEventoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public TipoEvento guardar(@RequestBody TipoEvento tipoEvento) {
        return tipoEventoService.guardar(tipoEvento);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        tipoEventoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
