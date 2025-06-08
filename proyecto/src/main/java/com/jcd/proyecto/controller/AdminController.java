package com.jcd.proyecto.controller;
// AdminController.java
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.jcd.proyecto.model.Arbitro;
import com.jcd.proyecto.model.Rol;
import com.jcd.proyecto.model.Usuario;
import com.jcd.proyecto.service.UsuarioService;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    private final UsuarioService usuarioService;

    public AdminController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // Listar usuarios normales (rol USER)
    @GetMapping("/usuarios")
    public List<Usuario> listarUsuariosNormales() {
        return usuarioService.listarUsuariosPorRol(Rol.USER);
    }

    // Listar árbitros existentes
    @GetMapping("/arbitros")
    public List<Arbitro> listarArbitros() {
        return usuarioService.listarArbitros();
    }

    // Asignar árbitro a usuario, cambia rol a ARBITRO y setea id_arbitro
    @PutMapping("/usuarios/{usuarioId}/asignar-arbitro/{arbitroId}")
    public void asignarArbitro(@PathVariable Long usuarioId, @PathVariable Integer arbitroId) {
        usuarioService.asignarArbitroAUsuario(usuarioId, arbitroId);
    }
}
