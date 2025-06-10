package com.jcd.proyecto.repository;

import com.jcd.proyecto.model.Jugador;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface JugadorRepository extends JpaRepository<Jugador, Integer> {
    List<Jugador> findByEquipo_IdEquipo(Integer idEquipo);
}
