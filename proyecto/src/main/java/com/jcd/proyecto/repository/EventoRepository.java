package com.jcd.proyecto.repository;

import com.jcd.proyecto.model.Evento;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EventoRepository extends JpaRepository<Evento, Integer> {
    List<Evento> findByPartido_IdPartido(Integer idPartido);
}
