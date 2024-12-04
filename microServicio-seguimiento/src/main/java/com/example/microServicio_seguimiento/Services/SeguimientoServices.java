package com.example.microServicio_seguimiento.Services;

import com.example.microServicio_seguimiento.Model.Solicitud;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class SeguimientoServices {

    @Autowired
    RestTemplate restTemplate;

    public Solicitud searchSolicitud(Long id){
        return restTemplate.getForObject("http://microServicio-solicitud/prestabanco/solicitud/getSol/" + id, Solicitud.class);
    }

    public List<Solicitud> listSolicitudUser(Long id){
        return restTemplate.getForObject("http://microServicio-solicitud/prestabanco/solicitud/getCreditByUserId/" + id, List.class);
    }

    public List<Double> CalcularCosto(Long id){
        Solicitud s = searchSolicitud(id);
        List<Double> costos = new ArrayList<>();
        double cost = s.getCuota()*0.3 + 20000; // fire and life insurance
        costos.add(cost);
        double costM = cost + s.getCuota(); // month cost
        costos.add(costM);
        double Commission = s.getAmount()*0.01;
        costos.add(Commission);
        double costT = costM*(s.getTerm()*12) + Commission; // total cost
        costos.add(costT);
        return costos;
    }
}
