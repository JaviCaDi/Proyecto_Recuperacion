package com.jcd.proyecto.service;

import com.jcd.proyecto.model.Partido;
import com.jcd.proyecto.repository.PartidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PartidoServiceImpl implements PartidoService {

    @Autowired
    private PartidoRepository partidoRepository;

    @Override
    public List<Partido> listarTodos() {
        return partidoRepository.findAll();
    }

    @Override
    public Optional<Partido> buscarPorId(Integer id) {
        return partidoRepository.findById(id);
    }

    @Override
    public Partido guardar(Partido partido) {
        return partidoRepository.save(partido);
    }

    @Override
    public void eliminar(Integer id) {
        partidoRepository.deleteById(id);
    }

    @Override
    public List<Partido> listarPorJornada(Integer idJornada) {
        return partidoRepository.findByJornada_IdJornada(idJornada);
    }

    @Override
    public List<Partido> listarPorArbitro(Long idArbitro) {
        return partidoRepository.findByArbitroIdArbitro(idArbitro);
    }

}
