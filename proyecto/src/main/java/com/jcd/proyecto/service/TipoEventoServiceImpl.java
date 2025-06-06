package com.jcd.proyecto.service;

import com.jcd.proyecto.model.TipoEvento;
import com.jcd.proyecto.repository.TipoEventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TipoEventoServiceImpl implements TipoEventoService {

    @Autowired
    private TipoEventoRepository tipoEventoRepository;

    @Override
    public List<TipoEvento> listarTodos() {
        return tipoEventoRepository.findAll();
    }

    @Override
    public Optional<TipoEvento> buscarPorId(Integer id) {
        return tipoEventoRepository.findById(id);
    }

    @Override
    public TipoEvento guardar(TipoEvento tipoEvento) {
        return tipoEventoRepository.save(tipoEvento);
    }

    @Override
    public void eliminar(Integer id) {
        tipoEventoRepository.deleteById(id);
    }
}
