package com.jcd.proyecto.service;

import com.jcd.proyecto.model.Evento;

import java.util.List;
import java.util.Optional;

public interface EventoService {
    List<Evento> listarTodos();

    Optional<Evento> buscarPorId(Integer id);

    Evento guardar(Evento evento);

    void eliminar(Integer id);

    List<Evento> guardarTodos(List<Evento> eventos);

    List<Evento> obtenerPorPartido(Integer idPartido);
}
