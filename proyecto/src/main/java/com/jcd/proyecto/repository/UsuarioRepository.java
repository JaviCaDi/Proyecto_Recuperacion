package com.jcd.proyecto.repository;

import com.jcd.proyecto.model.Rol;
import com.jcd.proyecto.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByNombre(String nombre);
    boolean existsByNombre(String nombre);
    List<Usuario> findByRol(Rol rol);
}
