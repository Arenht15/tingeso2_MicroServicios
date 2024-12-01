package com.example.microServicio_solicitud.Services;

import com.example.microServicio_solicitud.Entities.Solicitud;
import com.example.microServicio_solicitud.Repository.SolicitudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
public class SolicitudServices {
    @Autowired
    private SolicitudRepository solicitudRepository;

    public List<Solicitud> getSolicitudes(){
        return solicitudRepository.findSolicituds();
    }
    public Solicitud save(Long id_user, Integer type, Double amount, Integer term,
                                Double rate, Double cuota, String birthday, Double porcentaje,
                                String rut, byte[] identification){
        Solicitud sol = new Solicitud();
        sol.setId_user(id_user);
        sol.setRut(rut);
        sol.setType(type);
        sol.setAmount(amount);
        sol.setTerm(term);
        sol.setRate(rate);
        sol.setCuota(cuota);
        sol.setYears(calculateYears(LocalDate.parse(birthday)));
        sol.setIdentidadFile(identification);
        sol.setPorcent(porcentaje);
        try {
            sol = solicitudRepository.save(sol);
            return sol;
        } catch (Exception e) {
            return null;
        }
    }

    public Solicitud updateSolicitud(Long id, Double ingress, Integer statusDicom, Integer Seniority,
                           Double IngressAcum, Double deudas, MultipartFile LaboralFile,
                           MultipartFile dicomFile, MultipartFile ingressFile, MultipartFile deudasFile,
                           MultipartFile AhorroFile, Integer TipoEmpleo, Long idSc){
        Solicitud credit = searchSolicitud(id);
        credit.setIngress(ingress);
        credit.setStatusDicom(statusDicom);
        credit.setSeniority(Seniority);
        credit.setIngressAcum(IngressAcum);
        credit.setAmountDebs(deudas);
        credit.setId_savingCapacity(idSc);
        credit.setTypeJob(TipoEmpleo);
        credit.setAprovedApplication(-1);

        try {
            credit.setPayFile(LaboralFile.getBytes());
            credit.setHistDicom(dicomFile.getBytes());
            credit.setIngressFile(ingressFile.getBytes());
            credit.setDebs(deudasFile.getBytes());
            credit.setSavingCapacityFile(AhorroFile.getBytes());
        } catch (IOException e) {
            return null;
        }

        try {
            solicitudRepository.save(credit);
            return credit;
        } catch (Exception e) {
            return null;
        }
    }

    public Integer calculateYears(LocalDate birthdate){
        LocalDate now = LocalDate.now();
        return now.getYear() - birthdate.getYear();
    }

    public Solicitud searchSolicitud(Long id){
        try {
            return solicitudRepository.findById(id).get();
        } catch (Exception e) {
            return null;
        }
    }

    public List<Solicitud> findSolicitudByUserId(Long userId){
        return solicitudRepository.findSolicitudsByUserId(userId);
    }
}
