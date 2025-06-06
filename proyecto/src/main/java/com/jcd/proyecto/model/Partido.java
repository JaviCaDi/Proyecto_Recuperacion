package com.jcd.proyecto.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
public class Partido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPartido;

    private LocalDateTime fechaPrevista;
    private LocalDateTime fechaInicio;

    @ManyToOne
    @JoinColumn(name = "id_local", referencedColumnName = "id_equipo")
    private Equipo local;

    @ManyToOne
    @JoinColumn(name = "id_visitante", referencedColumnName = "id_equipo")
    private Equipo visitante;

    @ManyToOne
    @JoinColumn(name = "id_jornada", referencedColumnName = "id_jornada")
    @JsonBackReference
    private Jornada jornada;

    @ManyToOne
    @JoinColumn(name = "id_arbitro", referencedColumnName = "id_arbitro")
    private Arbitro arbitro;

    // Getters y Setters

    public Integer getId_partido() {
        return idPartido;
    }

    public void setId_partido(Integer id_partido) {
        this.idPartido = id_partido;
    }

    public LocalDateTime getFecha_prevista() {
        return fechaPrevista;
    }

    public void setFecha_prevista(LocalDateTime fecha_prevista) {
        this.fechaPrevista = fecha_prevista;
    }

    public LocalDateTime getFecha_inicio() {
        return fechaInicio;
    }

    public void setFecha_inicio(LocalDateTime fecha_inicio) {
        this.fechaInicio = fecha_inicio;
    }

    public Equipo getLocal() {
        return local;
    }

    public void setLocal(Equipo local) {
        this.local = local;
    }

    public Equipo getVisitante() {
        return visitante;
    }

    public void setVisitante(Equipo visitante) {
        this.visitante = visitante;
    }

    public Jornada getJornada() {
        return jornada;
    }

    public void setJornada(Jornada jornada) {
        this.jornada = jornada;
    }

    public Arbitro getArbitro() {
        return arbitro;
    }

    public void setArbitro(Arbitro arbitro) {
        this.arbitro = arbitro;
    }
}
