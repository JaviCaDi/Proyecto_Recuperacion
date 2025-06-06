package com.jcd.proyecto.service;

import com.jcd.proyecto.model.Equipo;
import com.jcd.proyecto.repository.EquipoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EquipoServiceImpl implements EquipoService {

    @Autowired
    private EquipoRepository equipoRepository;

    @Override
    public List<Equipo> listarTodos() {
        return equipoRepository.findAll();
    }

    @Override
    public Optional<Equipo> buscarPorId(Integer id) {
        return equipoRepository.findById(id);
    }

    @Override
    public Equipo guardar(Equipo equipo) {
        return equipoRepository.save(equipo);
    }

    @Override
    public void eliminar(Integer id) {
        equipoRepository.deleteById(id);
    }
}
