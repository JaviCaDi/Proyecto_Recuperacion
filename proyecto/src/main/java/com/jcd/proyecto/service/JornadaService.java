package com.jcd.proyecto.service;

import com.jcd.proyecto.model.Jornada;

import java.util.List;
import java.util.Optional;

public interface JornadaService {
    List<Jornada> listarTodas();
    Optional<Jornada> buscarPorId(Integer id);
    Jornada guardar(Jornada jornada);
    void eliminar(Integer id);
    void limpiarJornadas();
    List<Jornada> crearJornadasConTodosLosEquipos(boolean idaYVuelta);
    Optional<Jornada> buscarPorIdConPartidos(Integer id);
}
