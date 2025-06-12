package com.jcd.proyecto.service;

import com.jcd.proyecto.dto.EstadisticaDTO;
import com.jcd.proyecto.dto.EstadisticaEquipoDTO;
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

    @Override
    public List<EstadisticaDTO> obtenerTopPorTipo(String tipo) {
        Long idTipoEvento;

        switch (tipo) {
            case "goles":
                idTipoEvento = 17L;
                break;
            case "asistencias":
                idTipoEvento = 18L;
                break;
            case "golesPropia":
                idTipoEvento = 19L;
                break;
            case "tarjetaAma":
                idTipoEvento = 8L;
                break;
            case "tarjetaRoja":
                idTipoEvento = 9L;
                break;
            default:
                throw new IllegalArgumentException("Tipo de estadística no válido: " + tipo);
        }

        return eventoRepository.findTopByTipoEvento(idTipoEvento);
    }

    @Override
    public List<EstadisticaEquipoDTO> obtenerTopEquiposPorTipo(String tipo) {
        Long idTipoEvento;

        switch (tipo) {
            case "goles":
                idTipoEvento = 17L;
                break;
            case "asistencias":
                idTipoEvento = 18L;
                break;
            case "golesPropia":
                idTipoEvento = 19L;
                break;
            case "tarjetaAma":
                idTipoEvento = 8L;
                break;
            case "tarjetaRoja":
                idTipoEvento = 9L;
                break;
            default:
                throw new IllegalArgumentException("Tipo de estadística no válido: " + tipo);
        }

        return eventoRepository.findTopEquiposByTipoEvento(idTipoEvento);
    }

}
