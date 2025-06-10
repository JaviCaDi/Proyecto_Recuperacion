package com.jcd.proyecto.dto;

public class EventoDTO {

    private String tiempo_partido;
    private Integer id_tipo_evento;
    private Integer id_jugador;
    private Integer id_partido;

    // Getters y Setters
    public String getTiempo_partido() {
        return tiempo_partido;
    }

    public void setTiempo_partido(String tiempo_partido) {
        this.tiempo_partido = tiempo_partido;
    }

    public Integer getId_tipo_evento() {
        return id_tipo_evento;
    }

    public void setId_tipo_evento(Integer id_tipo_evento) {
        this.id_tipo_evento = id_tipo_evento;
    }

    public Integer getId_jugador() {
        return id_jugador;
    }

    public void setId_jugador(Integer id_jugador) {
        this.id_jugador = id_jugador;
    }

    public Integer getId_partido() {
        return id_partido;
    }

    public void setId_partido(Integer id_partido) {
        this.id_partido = id_partido;
    }
}
