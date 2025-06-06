package com.jcd.proyecto.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tipoevento")
public class TipoEvento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_tipo_evento;

    private String nombre;

    // Getters y Setters
    public Integer getId_tipo_evento() {
        return id_tipo_evento;
    }

    public void setId_tipo_evento(Integer id_tipo_evento) {
        this.id_tipo_evento = id_tipo_evento;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
