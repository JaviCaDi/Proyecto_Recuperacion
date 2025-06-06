package com.jcd.proyecto.controller;

import com.jcd.proyecto.model.Partido;
import com.jcd.proyecto.service.PartidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/partidos")
@CrossOrigin(origins = "*")
public class PartidoController {

    @Autowired
    private PartidoService partidoService;

    @GetMapping
    public List<Partido> listarTodos() {
        return partidoService.listarTodos();
    }

    @GetMapping("/{id}")
    public Optional<Partido> buscarPorId(@PathVariable Integer id) {
        return partidoService.buscarPorId(id);
    }

    @PostMapping
    public Partido guardar(@RequestBody Partido partido) {
        return partidoService.guardar(partido);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        partidoService.eliminar(id);
    }

    @GetMapping("/jornada/{idJornada}")
    public List<Partido> listarPorJornada(@PathVariable Integer idJornada) {
        return partidoService.listarPorJornada(idJornada);
    }
}
