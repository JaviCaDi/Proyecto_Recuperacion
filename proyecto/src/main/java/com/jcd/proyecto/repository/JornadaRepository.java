package com.jcd.proyecto.repository;

import com.jcd.proyecto.model.Jornada;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface JornadaRepository extends JpaRepository<Jornada, Integer> {

    @Query("SELECT j FROM Jornada j LEFT JOIN FETCH j.partidos WHERE j.idJornada = :id")
    Optional<Jornada> findByIdConPartidos(@Param("id") Integer id);
}
