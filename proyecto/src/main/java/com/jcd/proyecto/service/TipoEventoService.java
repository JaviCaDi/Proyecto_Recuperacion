package com.jcd.proyecto.service;

import com.jcd.proyecto.model.TipoEvento;

import java.util.List;
import java.util.Optional;

public interface TipoEventoService {
    List<TipoEvento> listarTodos();
    Optional<TipoEvento> buscarPorId(Integer id);
    TipoEvento guardar(TipoEvento tipoEvento);
    void eliminar(Integer id);
}
