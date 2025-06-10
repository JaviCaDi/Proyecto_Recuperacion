package com.jcd.proyecto.service;

import com.jcd.proyecto.model.Jugador;
import com.jcd.proyecto.repository.JugadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JugadorServiceImpl implements JugadorService {

    @Autowired
    private JugadorRepository jugadorRepository;

    @Override
    public List<Jugador> listarTodos() {
        return jugadorRepository.findAll();
    }

    @Override
    public Optional<Jugador> buscarPorId(Integer id) {
        return jugadorRepository.findById(id);
    }

    @Override
    public Jugador guardar(Jugador jugador) {
        return jugadorRepository.save(jugador);
    }

    @Override
    public void eliminar(Integer id) {
        jugadorRepository.deleteById(id);
    }

    @Override
    public List<Jugador> obtenerPorEquipo(Integer idEquipo) {
        return jugadorRepository.findByEquipo_IdEquipo(idEquipo);
    }
}
