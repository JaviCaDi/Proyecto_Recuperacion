package com.jcd.proyecto.service;

import com.jcd.proyecto.model.Evento;
import com.jcd.proyecto.repository.EventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventoServiceImpl implements EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Override
    public List<Evento> listarTodos() {
        return eventoRepository.findAll();
    }

    @Override
    public Optional<Evento> buscarPorId(Integer id) {
        return eventoRepository.findById(id);
    }

    @Override
    public Evento guardar(Evento evento) {
        return eventoRepository.save(evento);
    }

    @Override
    public void eliminar(Integer id) {
        eventoRepository.deleteById(id);
    }

    @Override
    public List<Evento> guardarTodos(List<Evento> eventos) {
        return eventoRepository.saveAll(eventos);
    }

    @Override
    public List<Evento> obtenerPorPartido(Integer idPartido) {
        return eventoRepository.findByPartido_IdPartido(idPartido);
    }
}
