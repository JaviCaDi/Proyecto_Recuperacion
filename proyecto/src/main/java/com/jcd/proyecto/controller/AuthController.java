package com.jcd.proyecto.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jcd.proyecto.dto.AuthRequest;
import com.jcd.proyecto.dto.AuthResponse;
import com.jcd.proyecto.model.Rol;
import com.jcd.proyecto.model.Usuario;
import com.jcd.proyecto.security.JwtUtil;
import com.jcd.proyecto.service.UsuarioService;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UsuarioService usuarioService;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    public AuthController(UsuarioService usuarioService, JwtUtil jwtUtil, PasswordEncoder passwordEncoder) {
        this.usuarioService = usuarioService;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest authRequest) {
        if (usuarioService.obtenerPorNombre(authRequest.getNombre()).isPresent()) {
            return ResponseEntity.badRequest().body(
                    Map.of("error", "El usuario ya existe"));
        }
        Usuario usuario = new Usuario();
        usuario.setNombre(authRequest.getNombre());
        usuario.setContrasena(passwordEncoder.encode(authRequest.getContrasena()));
        usuario.setRol(Rol.USER);
        usuarioService.guardar(usuario);

        return ResponseEntity.ok(
                Map.of("message", "Usuario registrado con éxito"));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
        // Cargar el usuario por nombre
        Usuario usuario = usuarioService.obtenerPorNombre(authRequest.getNombre())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        // Verificar la contraseña
        if (!passwordEncoder.matches(authRequest.getContrasena(), usuario.getPassword())) {
            return ResponseEntity.badRequest().body(null);
        }
        // Generar el token JWT
        String token = jwtUtil.generateToken(usuario);
        return ResponseEntity.ok(new AuthResponse(token));
    }
}