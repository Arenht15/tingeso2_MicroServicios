package com.example.microServicio_seguimiento.Controllers;

import com.example.microServicio_seguimiento.Model.Solicitud;
import com.example.microServicio_seguimiento.Services.SeguimientoServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/prestabanco/seguimiento")
public class seguimientoController {
    @Autowired
    private SeguimientoServices serviceSeguimiento;

    @GetMapping("/listSolicitudUser/{id}")
    public List<Solicitud> listSolicitudUser(@PathVariable Long id) {
        return serviceSeguimiento.listSolicitudUser(id);
    }

    @GetMapping("/CalcularCosto/{id}")
    public List<Double> CalcularCosto(@PathVariable Long id) {
        return serviceSeguimiento.CalcularCosto(id);
    }
}
