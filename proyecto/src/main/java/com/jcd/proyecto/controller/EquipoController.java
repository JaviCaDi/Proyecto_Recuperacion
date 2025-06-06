package com.jcd.proyecto.controller;

import com.jcd.proyecto.model.Equipo;
import com.jcd.proyecto.service.EquipoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipos")
@CrossOrigin(origins = "*")
public class EquipoController {

    @Autowired
    private EquipoService equipoService;

    @GetMapping
    public List<Equipo> listarTodos() {
        return equipoService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Equipo> buscarPorId(@PathVariable Integer id) {
        return equipoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Equipo guardar(@RequestBody Equipo equipo) {
        return equipoService.guardar(equipo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Equipo> actualizar(@PathVariable Integer id, @RequestBody Equipo equipo) {
        return equipoService.buscarPorId(id)
                .map(equipoExistente -> {
                    equipo.setIdEquipo(id);  // Fijar el ID para que se actualice la entidad correcta
                    Equipo actualizado = equipoService.guardar(equipo);
                    return ResponseEntity.ok(actualizado);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        equipoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
