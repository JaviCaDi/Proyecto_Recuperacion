package com.jcd.proyecto.service;

import com.jcd.proyecto.model.Arbitro;

import java.util.List;
import java.util.Optional;

public interface ArbitroService {
    List<Arbitro> listarTodos();
    Optional<Arbitro> buscarPorId(Integer id);
    Arbitro guardar(Arbitro arbitro);
    void eliminar(Integer id);
}
