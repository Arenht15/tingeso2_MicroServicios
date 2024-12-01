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

    public SavingCapacity saveSavingCapacity(SavingCapacity sc){
        return savingCapacityRepository.save(sc);
    }
    public SavingCapacity searchSavingCapacity(Long id){
        try {
            return savingCapacityRepository.findById(id).get();
        } catch (Exception e) {
            return null;
        }
    }
}
