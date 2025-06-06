package com.jcd.proyecto.service;

import com.jcd.proyecto.model.Arbitro;
import com.jcd.proyecto.repository.ArbitroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArbitroServiceImpl implements ArbitroService {

    @Autowired
    private ArbitroRepository arbitroRepository;

    @Override
    public List<Arbitro> listarTodos() {
        return arbitroRepository.findAll();
    }

    @Override
    public Optional<Arbitro> buscarPorId(Integer id) {
        return arbitroRepository.findById(id);
    }

    @Override
    public Arbitro guardar(Arbitro arbitro) {
        return arbitroRepository.save(arbitro);
    }

    @Override
    public void eliminar(Integer id) {
        arbitroRepository.deleteById(id);
    }
}
