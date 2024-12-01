package com.example.microServicio_solicitud.Services;

import com.example.microServicio_solicitud.Entities.SavingCapacity;
import com.example.microServicio_solicitud.Repository.SavingCapacityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SavinCapacityServices {
    @Autowired
    private SavingCapacityRepository savingCapacityRepository;

    public SavingCapacity save(Double scAmount, Integer Antiguedad, Double amountAcum,
                                             List<Double> ahorro, List<Double> abono, List<Double> retiro){
        SavingCapacity sc = new SavingCapacity();
        sc.setScAmount(scAmount);
        sc.setSavingAmountAcum(amountAcum);
        sc.setSavingYears(Antiguedad);
        sc.setSavingHistory(ahorro);
        sc.setDepositHistory(abono);
        sc.setWithdrawalHistory(retiro);
        try {
            savingCapacityRepository.save(sc);
            return sc;
        } catch (Exception e) {
            return null;
        }

    }

    public SavingCapacity update(Long id, Double scAmount, Integer savingYears, Double savingAmountAcum,
                                 List<Double> savingHistory, List<Double> depositHistory, List<Double> withdrawalHistory){
        SavingCapacity sc = searchSavingCapacity(id);
        sc.setScAmount(scAmount);
        sc.setSavingYears(savingYears);
        sc.setSavingAmountAcum(savingAmountAcum);
        sc.setSavingHistory(savingHistory);
        sc.setDepositHistory(depositHistory);
        sc.setWithdrawalHistory(withdrawalHistory);
        try {
            savingCapacityRepository.save(sc);
            return sc;
        } catch (Exception e) {
            return null;
        }
    }
    public SavingCapacity searchSavingCapacity(Long id){
        try {
            return savingCapacityRepository.findById(id).get();
        } catch (Exception e) {
            return null;
        }
    }
}
