package com.jcd.proyecto.dto;

public class EstadisticaEquipoDTO {
    private String nombreEquipo;
    private Long cantidad;

    public EstadisticaEquipoDTO(String nombreEquipo, Long cantidad) {
        this.nombreEquipo = nombreEquipo;
        this.cantidad = cantidad;
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
