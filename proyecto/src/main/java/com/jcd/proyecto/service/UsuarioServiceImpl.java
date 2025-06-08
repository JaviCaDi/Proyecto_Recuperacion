package com.jcd.proyecto.service;

import com.jcd.proyecto.model.Arbitro;
import com.jcd.proyecto.model.Rol;
import com.jcd.proyecto.model.Usuario;
import com.jcd.proyecto.repository.ArbitroRepository;
import com.jcd.proyecto.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final ArbitroRepository arbitroRepository;

    public UsuarioServiceImpl(UsuarioRepository usuarioRepository, ArbitroRepository arbitroRepository) {
        this.usuarioRepository = usuarioRepository;
        this.arbitroRepository = arbitroRepository;
    }

    @Override
    public List<Usuario> listarUsuariosPorRol(Rol rol) {
        return usuarioRepository.findByRol(rol);
    }

    @Override
    public List<Arbitro> listarArbitros() {
        return arbitroRepository.findAll();
    }

    @Override
    public void asignarArbitroAUsuario(Long usuarioId, Integer arbitroId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        Arbitro arbitro = arbitroRepository.findById(arbitroId)
                .orElseThrow(() -> new RuntimeException("Arbitro no encontrado"));

        usuario.setRol(Rol.ARBITRO);
        usuario.setArbitro(arbitro);
        usuarioRepository.save(usuario);
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
