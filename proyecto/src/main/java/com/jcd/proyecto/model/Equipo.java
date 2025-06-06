package com.jcd.proyecto.model;

import jakarta.persistence.*;

@Entity
public class Equipo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_equipo")
    private Integer idEquipo;

    private String nombre;

    @Column(name = "anio_fundacion")
    private Integer anioFundacion;

    private String ciudad;

    private String escudo;

    @Column(name = "foto_oficial")
    private String fotoOficial;

    // Getters y Setters
    public Integer getIdEquipo() {
        return idEquipo;
    }

    public void setIdEquipo(Integer idEquipo) {
        this.idEquipo = idEquipo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getAnioFundacion() {
        return anioFundacion;
    }

    public void setAnioFundacion(Integer anioFundacion) {
        this.anioFundacion = anioFundacion;
    }

    public String getCiudad() {
        return ciudad;
    }

    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }

    public String getEscudo() {
        return escudo;
    }

    public void setEscudo(String escudo) {
        this.escudo = escudo;
    }

    public String getFotoOficial() {
        return fotoOficial;
    }

    public void setFotoOficial(String fotoOficial) {
        this.fotoOficial = fotoOficial;
    }
}
