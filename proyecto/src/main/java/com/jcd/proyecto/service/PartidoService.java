package com.jcd.proyecto.service;

import com.jcd.proyecto.model.Partido;

import java.util.List;
import java.util.Optional;

public interface PartidoService {
    List<Partido> listarTodos();
    Optional<Partido> buscarPorId(Integer id);
    Partido guardar(Partido partido);
    void eliminar(Integer id);
    List<Partido> listarPorJornada(Integer idJornada);
}
