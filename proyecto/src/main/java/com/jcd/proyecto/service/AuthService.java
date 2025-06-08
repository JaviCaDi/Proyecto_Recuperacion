package com.jcd.proyecto.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.jcd.proyecto.dto.AuthRequest;
import com.jcd.proyecto.dto.AuthResponse;
import com.jcd.proyecto.dto.RegisterRequest;
import com.jcd.proyecto.model.Rol;
import com.jcd.proyecto.model.Usuario;
import com.jcd.proyecto.repository.UsuarioRepository;
import com.jcd.proyecto.security.JwtUtil;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public AuthResponse register(RegisterRequest request) {
        if (usuarioRepository.existsByNombre(request.getNombre())) {
            throw new IllegalArgumentException("Nombre de usuario ya en uso");
        }

        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setContrasena(passwordEncoder.encode(request.getContrasena()));
        usuario.setRol(Rol.USER);
        usuario.setArbitro(null);

        usuarioRepository.save(usuario);

        String token = jwtUtil.generateToken(usuario);
        return new AuthResponse(token);
    }

    public AuthResponse login(AuthRequest request) {
        Usuario usuario = usuarioRepository.findByNombre(request.getNombre())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

        if (!passwordEncoder.matches(request.getContrasena(), usuario.getPassword())) {
            throw new BadCredentialsException("Contraseña incorrecta");
        }

        String token = jwtUtil.generateToken(usuario);
        return new AuthResponse(token);
    }

}
