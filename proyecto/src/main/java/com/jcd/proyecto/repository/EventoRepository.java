package com.jcd.proyecto.repository;

import com.jcd.proyecto.dto.EstadisticaDTO;
import com.jcd.proyecto.model.Evento;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EventoRepository extends JpaRepository<Evento, Integer> {

    @Query("""
            SELECT new com.jcd.proyecto.dto.EstadisticaDTO(j.nombre, e.nombre, COUNT(ev))
            FROM Evento ev
            JOIN ev.jugador j
            JOIN j.equipo e
            WHERE ev.tipoEvento.id = :tipoEventoId
            GROUP BY j.id, j.nombre, e.nombre
            ORDER BY COUNT(ev) DESC
            """)
    List<EstadisticaDTO> findTopByTipoEvento(@Param("tipoEventoId") Long tipoEventoId);

    List<Evento> findByPartido_IdPartido(Integer idPartido);

}
