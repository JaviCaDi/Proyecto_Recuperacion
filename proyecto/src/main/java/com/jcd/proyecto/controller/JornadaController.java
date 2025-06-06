package com.jcd.proyecto.controller;

import com.jcd.proyecto.model.Jornada;
import com.jcd.proyecto.service.JornadaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/jornadas")
@CrossOrigin(origins = "*")
public class JornadaController {

    @Autowired
    private JornadaService jornadaService;

    @GetMapping
    public List<Jornada> listarTodas() {
        return jornadaService.listarTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Jornada> buscarPorId(@PathVariable Integer id) {
        Optional<Jornada> jornada = jornadaService.buscarPorIdConPartidos(id);
        return jornada.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Jornada guardar(@RequestBody Jornada jornada) {
        return jornadaService.guardar(jornada);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        jornadaService.eliminar(id);
    }

    @DeleteMapping("/limpiar")
    public void limpiarJornadas() {
        jornadaService.limpiarJornadas();
    }

    @PostMapping("/crear")
    public List<Jornada> crearJornadas(@RequestParam(defaultValue = "true") boolean todos) {
        return jornadaService.crearJornadasConTodosLosEquipos(todos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Jornada> actualizar(@PathVariable Integer id, @RequestBody Jornada jornada) {
        Optional<Jornada> existente = jornadaService.buscarPorId(id);
        if (!existente.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Jornada jActual = existente.get();
        // Actualiza los campos que quieras, por ejemplo:
        jActual.setNombre(jornada.getNombre());
        jActual.setFecha_referencia(jornada.getFecha_referencia());

        // Para partidos, puedes hacer algo similar:
        jActual.setPartidos(jornada.getPartidos());

        Jornada actualizada = jornadaService.guardar(jActual);
        return ResponseEntity.ok(actualizada);
    }

}
