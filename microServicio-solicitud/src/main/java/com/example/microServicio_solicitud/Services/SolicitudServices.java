package com.example.microServicio_solicitud.Services;

import com.example.microServicio_solicitud.Entities.Solicitud;
import com.example.microServicio_solicitud.Repository.SolicitudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SolicitudServices {
    @Autowired
    private SolicitudRepository creditRepository;

    public List<Solicitud> getCredits(){
        return creditRepository.findSolicituds();
    }
    public Solicitud saveCredit(Solicitud c) {
        creditRepository.save(c);
        return c;
    }
    public Solicitud searchCredit(Long id){
        try {
            return creditRepository.findById(id).get();
        } catch (Exception e) {
            return null;
        }
    }

    public List<Solicitud> findCreditsByUserId(Long userId){
        return creditRepository.findSolicitudsByUserId(userId);
    }
}
