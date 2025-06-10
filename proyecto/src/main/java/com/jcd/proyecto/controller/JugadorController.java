package com.jcd.proyecto.controller;

import com.jcd.proyecto.model.Equipo;
import com.jcd.proyecto.model.Jugador;
import com.jcd.proyecto.service.EquipoService;
import com.jcd.proyecto.service.JugadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/jugadores")
@CrossOrigin(origins = "*")
public class JugadorController {

    @Autowired
    private JugadorService jugadorService;

    @Autowired
    private EquipoService equipoService; // Inyectamos EquipoService para obtener el equipo válido

    @GetMapping
    public List<Jugador> listarTodos() {
        return jugadorService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Jugador> buscarPorId(@PathVariable Integer id) {
        return jugadorService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(consumes = { "multipart/form-data" })
    public ResponseEntity<Jugador> guardarJugador(
            @RequestPart("jugador") Jugador jugador,
            @RequestPart("foto") MultipartFile foto) {

        // Recuperamos el equipo completo desde BD usando el idEquipo que viene en
        // jugador.getEquipo().getIdEquipo()
        if (jugador.getEquipo() != null && jugador.getEquipo().getIdEquipo() != null) {
            Equipo equipo = equipoService.buscarPorId(jugador.getEquipo().getIdEquipo()).orElse(null);
            jugador.setEquipo(equipo);
        } else {
            jugador.setEquipo(null);
        }

        if (!foto.isEmpty()) {
            try {
                String carpetaFotos = "src/main/resources/static/img/jugadores/";
                String nombreArchivo = System.currentTimeMillis() + "_" + foto.getOriginalFilename();
                Path rutaFoto = Paths.get(carpetaFotos, nombreArchivo);
                Files.write(rutaFoto, foto.getBytes());
                jugador.setFoto(nombreArchivo);
            } catch (IOException e) {
                return ResponseEntity.internalServerError().build();
            }
        }

        return ResponseEntity.ok(jugadorService.guardar(jugador));
    }

    @PutMapping(value = "/{id}", consumes = { "multipart/form-data" })
    public ResponseEntity<Jugador> actualizarJugador(
            @PathVariable Integer id,
            @RequestPart("jugador") Jugador jugadorActualizado,
            @RequestPart(value = "foto", required = false) MultipartFile foto) {

        return jugadorService.buscarPorId(id).map(jugador -> {
            jugador.setNombre(jugadorActualizado.getNombre());
            jugador.setApodo(jugadorActualizado.getApodo());
            jugador.setFecha_nac(jugadorActualizado.getFecha_nac());
            jugador.setDorsal(jugadorActualizado.getDorsal());
            jugador.setPosicion(jugadorActualizado.getPosicion());
            jugador.setNacionalidad(jugadorActualizado.getNacionalidad());

            // Actualizamos el equipo también con el objeto completo desde BD usando
            // getIdEquipo()
            if (jugadorActualizado.getEquipo() != null && jugadorActualizado.getEquipo().getIdEquipo() != null) {
                Equipo equipo = equipoService.buscarPorId(jugadorActualizado.getEquipo().getIdEquipo()).orElse(null);
                jugador.setEquipo(equipo);
            } else {
                jugador.setEquipo(null);
            }

            if (foto != null && !foto.isEmpty()) {
                try {
                    String carpetaFotos = "src/main/resources/static/img/jugadores/";
                    String nombreArchivo = System.currentTimeMillis() + "_" + foto.getOriginalFilename();
                    Path rutaFoto = Paths.get(carpetaFotos, nombreArchivo);
                    Files.write(rutaFoto, foto.getBytes());
                    jugador.setFoto(nombreArchivo);
                } catch (IOException e) {
                    throw new RuntimeException("Error al guardar la foto", e);
                }
            }

            return ResponseEntity.ok(jugadorService.guardar(jugador));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        jugadorService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/equipo/{idEquipo}")
    public List<Jugador> obtenerJugadoresPorEquipo(@PathVariable Integer idEquipo) {
        return jugadorService.obtenerPorEquipo(idEquipo);
    }
}
