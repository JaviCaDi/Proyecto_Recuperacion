package com.jcd.proyecto.controller;

import com.jcd.proyecto.model.Arbitro;
import com.jcd.proyecto.service.ArbitroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/arbitros")
@CrossOrigin(origins = "*") // si necesitas permitir llamadas desde el frontend
public class ArbitroController {

    @Autowired
    private ArbitroService arbitroService;

    @GetMapping
    public List<Arbitro> listarTodos() {
        return arbitroService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Arbitro> obtenerPorId(@PathVariable Integer id) {
        return arbitroService.buscarPorId(id)
                .map(arbitro -> ResponseEntity.ok(arbitro))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Arbitro crear(@RequestBody Arbitro arbitro) {
        return arbitroService.guardar(arbitro);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Arbitro> actualizar(@PathVariable Integer id, @RequestBody Arbitro arbitro) {
        return arbitroService.buscarPorId(id)
                .map(existente -> {
                    // actualiza los campos necesarios
                    existente.setNombre(arbitro.getNombre());
                    existente.setFechaNac(arbitro.getFechaNac());
                    existente.setFederacion(arbitro.getFederacion());
                    return ResponseEntity.ok(arbitroService.guardar(existente));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        return arbitroService.buscarPorId(id)
                .map(arbitro -> {
                    arbitroService.eliminar(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
