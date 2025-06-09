package com.jcd.proyecto.controller;

import com.jcd.proyecto.model.Partido;
import com.jcd.proyecto.model.Usuario;
import com.jcd.proyecto.service.PartidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/eventos")
@CrossOrigin(origins = "*")
public class EventoController {

    @Autowired
    private PartidoService partidoService;

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
