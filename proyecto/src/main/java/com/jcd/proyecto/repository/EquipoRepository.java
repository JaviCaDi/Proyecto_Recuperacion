package com.jcd.proyecto.repository;

import com.jcd.proyecto.model.Equipo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EquipoRepository extends JpaRepository<Equipo, Integer> {
}