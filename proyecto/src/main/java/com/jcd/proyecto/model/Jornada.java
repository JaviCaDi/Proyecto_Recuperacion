package com.jcd.proyecto.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.time.LocalDate;
import java.util.List;

@Entity
public class Jornada {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_jornada")
    private Integer idJornada;

    @Column(nullable = false, length = 100)
    private String nombre;

    @Column(nullable = false)
    private LocalDate fecha_referencia;

    // Relación con partidos
    @OneToMany(mappedBy = "jornada", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonManagedReference
    
    private List<Partido> partidos;

    // Getters y Setters

    public Integer getIdJornada() {
        return idJornada;
    }

    public void setIdJornada(Integer idJornada) {
        this.idJornada = idJornada;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public LocalDate getFecha_referencia() {
        return fecha_referencia;
    }

    public void setFecha_referencia(LocalDate fecha_referencia) {
        this.fecha_referencia = fecha_referencia;
    }

    public List<Partido> getPartidos() {
        return partidos;
    }

    public void setPartidos(List<Partido> partidos) {
        this.partidos = partidos;
    }
}
