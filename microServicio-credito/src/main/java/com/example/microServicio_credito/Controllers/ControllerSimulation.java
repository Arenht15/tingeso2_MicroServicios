package com.example.microServicio_credito.Controllers;

import org.springframework.beans.factory.annotation.Autowired;
import com.example.microServicio_credito.Services.SimulacionCredito;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/prestabanco/credito")
@CrossOrigin(origins = "*")
public class ControllerSimulation {
    @Autowired
    private SimulacionCredito serviceSimulation;

    @GetMapping("/simulation/{type}/{amount}/{term}/{rate}")
    public ResponseEntity<Double> simulateCredit(@PathVariable Integer type, @PathVariable Double amount,
                                                 @PathVariable Integer term, @PathVariable Double rate){
        Double simulation = serviceSimulation.simulateCredit(type, amount, term, rate);
        return ResponseEntity.ok(simulation);
    }

}
