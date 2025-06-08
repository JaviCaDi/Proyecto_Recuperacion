package com.jcd.proyecto.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jcd.proyecto.service.UsuarioService;

@RestController
@RequestMapping("/api/usuario")
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    // Endpoint para eliminar la cuenta del usuario autenticado
    @DeleteMapping("/me")
    public ResponseEntity<?> eliminarCuenta(@AuthenticationPrincipal UserDetails userDetails) {
        String nombreUsuario = userDetails.getUsername();
        usuarioService.eliminarPorNombre(nombreUsuario); // Implementa este método en el servicio
        return ResponseEntity.ok().body("Cuenta eliminada con éxito");
    }
}
