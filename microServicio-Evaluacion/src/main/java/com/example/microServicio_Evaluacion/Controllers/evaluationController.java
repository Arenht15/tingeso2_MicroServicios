package com.example.microServicio_Evaluacion.Controllers;

import com.example.microServicio_Evaluacion.Services.EvaluationServices;
import jakarta.ws.rs.PUT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/prestabanco/evaluacion")
public class evaluationController {

    @Autowired
    private EvaluationServices serviceEvaluation;

    @PutMapping("/Evaluar/{id}")
    public void Evaluar(@PathVariable Long id) {
        serviceEvaluation.calculateSolicitud(id);
    }

    @PutMapping("/pendiente/{id}")
    public void Pendiente(@PathVariable Long id) {
        serviceEvaluation.PendingDocument(id);
    }
}