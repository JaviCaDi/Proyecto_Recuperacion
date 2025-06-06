package com.jcd.proyecto.service;

import com.jcd.proyecto.model.Arbitro;
import com.jcd.proyecto.model.Equipo;
import com.jcd.proyecto.model.Jornada;
import com.jcd.proyecto.model.Partido;
import com.jcd.proyecto.repository.ArbitroRepository;
import com.jcd.proyecto.repository.EquipoRepository;
import com.jcd.proyecto.repository.JornadaRepository;
import com.jcd.proyecto.repository.PartidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class JornadaServiceImpl implements JornadaService {

    @Autowired
    private JornadaRepository jornadaRepository;

    @Autowired
    private PartidoRepository partidoRepository;

    @Autowired
    private EquipoRepository equipoRepository;

    @Autowired
    private ArbitroRepository arbitroRepository;

    @Override
    public List<Jornada> listarTodas() {
        return jornadaRepository.findAll();
    }

    @Override
    public Optional<Jornada> buscarPorId(Integer id) {
        return jornadaRepository.findById(id);
    }

    @Override
    public Jornada guardar(Jornada jornada) {
        return jornadaRepository.save(jornada);
    }

    @Override
    public void eliminar(Integer id) {
        jornadaRepository.deleteById(id);
    }

    @Override
    public void limpiarJornadas() {
        partidoRepository.deleteAll();
        jornadaRepository.deleteAll();
    }

    @Override
    public Optional<Jornada> buscarPorIdConPartidos(Integer id) {
        return jornadaRepository.findByIdConPartidos(id);
    }

    @Override
    public List<Jornada> crearJornadasConTodosLosEquipos(boolean idaYVuelta) {
        List<Equipo> equipos = equipoRepository.findAll();
        List<Arbitro> arbitros = arbitroRepository.findAll();
        List<Jornada> jornadas = new ArrayList<>();
        List<Partido> partidos = new ArrayList<>();

        Collections.shuffle(equipos);
        int n = equipos.size();

        List<List<Partido>> jornadasGeneradas = new ArrayList<>();

        for (int round = 0; round < n - 1; round++) {
            List<Partido> jornadaPartidos = new ArrayList<>();
            for (int i = 0; i < n / 2; i++) {
                Equipo local = equipos.get(i);
                Equipo visitante = equipos.get(n - 1 - i);

                Partido partido = new Partido();
                partido.setLocal(local);
                partido.setVisitante(visitante);
                jornadaPartidos.add(partido);
            }

            jornadasGeneradas.add(jornadaPartidos);
            equipos.add(1, equipos.remove(equipos.size() - 1)); // rotación round-robin
        }

        if (idaYVuelta) {
            List<List<Partido>> vuelta = new ArrayList<>();
            for (List<Partido> j : jornadasGeneradas) {
                List<Partido> inversa = new ArrayList<>();
                for (Partido p : j) {
                    Partido inv = new Partido();
                    inv.setLocal(p.getVisitante());
                    inv.setVisitante(p.getLocal());
                    inversa.add(inv);
                }
                vuelta.add(inversa);
            }
            jornadasGeneradas.addAll(vuelta);
        }

        LocalDate baseDate = LocalDate.now();

        for (int i = 0; i < jornadasGeneradas.size(); i++) {
            Jornada jornada = new Jornada();
            jornada.setNombre("Jornada " + (i + 1));
            jornada.setFecha_referencia(baseDate.plusDays(i * 7));
            jornadaRepository.save(jornada);

            List<Partido> partidosDeJornada = jornadasGeneradas.get(i);

            if (arbitros.size() < partidosDeJornada.size()) {
                throw new RuntimeException("No hay suficientes árbitros para la jornada " + jornada.getNombre());
            }

            Collections.shuffle(arbitros); // se reparten los árbitros de forma aleatoria

            for (int j = 0; j < partidosDeJornada.size(); j++) {
                Partido p = partidosDeJornada.get(j);
                p.setJornada(jornada);
                p.setFecha_prevista(jornada.getFecha_referencia().atTime(18, 0));
                p.setArbitro(arbitros.get(j)); // se le asigna un árbitro
                partidos.add(p);
            }

            jornadas.add(jornada);
        }

        partidoRepository.saveAll(partidos);
        return jornadas;
    }
}
