package com.jcd.proyecto.service;

import com.jcd.proyecto.model.Equipo;
import java.util.List;
import java.util.Optional;

public interface EquipoService {
    List<Equipo> listarTodos();
    Optional<Equipo> buscarPorId(Integer id);
    Equipo guardar(Equipo equipo);
    void eliminar(Integer id);
}
