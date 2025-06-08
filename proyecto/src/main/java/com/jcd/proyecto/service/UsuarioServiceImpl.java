package com.jcd.proyecto.service;

import com.jcd.proyecto.model.Usuario;
import com.jcd.proyecto.repository.UsuarioRepository;
import com.jcd.proyecto.service.UsuarioService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public Optional<Usuario> obtenerPorNombre(String nombre) {
        return usuarioRepository.findByNombre(nombre);
    }

    @Override
    public List<Usuario> listarTodos() {
        return usuarioRepository.findAll();
    }

    @Override
    public Usuario guardar(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @Override
    public void eliminarPorNombre(String nombre) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByNombre(nombre);
        usuarioOpt.ifPresent(usuarioRepository::delete);
    }

}
