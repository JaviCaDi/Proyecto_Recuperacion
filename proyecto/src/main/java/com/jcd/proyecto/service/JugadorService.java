package com.jcd.proyecto.service;

import com.jcd.proyecto.model.Jugador;

import java.util.List;
import java.util.Optional;

public interface JugadorService {
    List<Jugador> listarTodos();
    Optional<Jugador> buscarPorId(Integer id);
    Jugador guardar(Jugador jugador);
    void eliminar(Integer id);
}
