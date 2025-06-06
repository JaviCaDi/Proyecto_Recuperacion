package com.jcd.proyecto.repository;

import com.jcd.proyecto.model.Partido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PartidoRepository extends JpaRepository<Partido, Integer> {
    List<Partido> findByJornada_IdJornada(Integer idJornada);
}
