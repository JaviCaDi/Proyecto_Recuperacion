package com.jcd.proyecto.dto;

public class EstadisticaDTO {
    private String nombreJugador;
    private String nombreEquipo;
    private Long cantidad;

    public EstadisticaDTO(String nombreJugador, String nombreEquipo, Long cantidad) {
        this.nombreJugador = nombreJugador;
        this.nombreEquipo = nombreEquipo;
        this.cantidad = cantidad;
    }

    public String getNombreJugador() {
        return nombreJugador;
    }

    public void setNombreJugador(String nombreJugador) {
        this.nombreJugador = nombreJugador;
    }

    public String getNombreEquipo() {
        return nombreEquipo;
    }

    public void setNombreEquipo(String nombreEquipo) {
        this.nombreEquipo = nombreEquipo;
    }

    public Long getCantidad() {
        return cantidad;
    }

    public void setCantidad(Long cantidad) {
        this.cantidad = cantidad;
    }
}

