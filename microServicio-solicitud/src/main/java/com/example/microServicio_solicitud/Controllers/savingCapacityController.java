package com.example.microServicio_solicitud.Controllers;

import com.example.microServicio_solicitud.Entities.SavingCapacity;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.microServicio_solicitud.Services.SavinCapacityServices;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/prestabanco/sc")
public class savingCapacityController {

    @Autowired
    private SavinCapacityServices savingCapacityService;

    @PostMapping("/save")
    public ResponseEntity<SavingCapacity> saveSavingCapacity(@RequestParam("MontoActual") Double scAmount,
                                                             @RequestParam("Antiguedad") Integer Antiguedad,
                                                             @RequestParam("MontoAcumulado") Double amountAcum,
                                                             @RequestParam("MontoAhorro") List<Double> ahorro,
                                                             @RequestParam("AbonoAhorro") List<Double> abono,
                                                             @RequestParam("RetiroAhorro") List<Double> retiro) {
        return ResponseEntity.ok(savingCapacityService.save(scAmount, Antiguedad, amountAcum, ahorro, abono, retiro));
    }

    @PutMapping("/update")
    public ResponseEntity<SavingCapacity> updateSavingCapacity(@RequestParam("id") Long id,
                                                               @RequestParam("scAmount") Double scAmount,
                                                               @RequestParam("savingYears") Integer savingYears,
                                                               @RequestParam("savingAmountAcum") Double savingAmountAcum,
                                                               @RequestParam("MontoAhorro") List<Double> savingHistory,
                                                               @RequestParam("AbonoAhorro") List<Double> depositHistory,
                                                               @RequestParam("RetiroAhorro") List<Double> withdrawalHistory) {
        return ResponseEntity.ok(savingCapacityService.update(id, scAmount, savingYears, savingAmountAcum, savingHistory, depositHistory, withdrawalHistory));
    }

    @GetMapping("/searchSavingCapacity/{id}")
    public ResponseEntity<SavingCapacity> searchSavingCapacity(@PathVariable Long id) {
        SavingCapacity bandera = savingCapacityService.searchSavingCapacity(id);
        return ResponseEntity.ok(bandera);
    }
}
