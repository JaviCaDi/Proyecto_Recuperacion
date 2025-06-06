package com.jcd.proyecto.repository;

import com.jcd.proyecto.model.Jugador;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JugadorRepository extends JpaRepository<Jugador, Integer> {
}
