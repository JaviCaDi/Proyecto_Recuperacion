package com.jcd.proyecto.service;

import com.jcd.proyecto.model.Arbitro;
import com.jcd.proyecto.model.Rol;
import com.jcd.proyecto.model.Usuario;

import java.util.List;
import java.util.Optional;

public interface UsuarioService {
    Optional<Usuario> obtenerPorNombre(String nombre);

    List<Usuario> listarTodos();

    Usuario guardar(Usuario usuario);

    void eliminarPorNombre(String nombre);

    List<Usuario> listarUsuariosPorRol(Rol rol);

    List<Arbitro> listarArbitros();

    void asignarArbitroAUsuario(Long usuarioId, Integer arbitroId);
}
