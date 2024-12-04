package com.example.microServicio_solicitud.Controllers;

import com.example.microServicio_solicitud.Services.SolicitudServices;
import com.example.microServicio_solicitud.Entities.Solicitud;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/prestabanco/solicitud")
public class solicitudController {

    @Autowired
    private SolicitudServices serviceSolicitud;

    @PostMapping("/save")
    public ResponseEntity<Solicitud> save(
            @RequestParam("id_user") Long id_user,
            @RequestParam("type") Integer type,
            @RequestParam("amount") Double amount,
            @RequestParam("term") Integer term,
            @RequestParam("rate") Double rate,
            @RequestParam("cuota") Double cuota,
            @RequestParam("birthdate") String birthday,
            @RequestParam("Porcentaje") Double porcentaje,
            @RequestParam("rut") String rut){

        Solicitud sol = serviceSolicitud.save(id_user, type, amount,
                term, rate, cuota, birthday, porcentaje, rut);
        return ResponseEntity.ok(sol);
    }
    @PutMapping("/update")
    public ResponseEntity<Solicitud> updateSolicitud(
            @RequestParam("id") Long id,
            @RequestParam("Ingress") Double ingress,
            @RequestParam("statusDicom") Integer statusDicom,
            @RequestParam("seniority") Integer Seniority,
            @RequestParam("IngressAcum") Double IngressAcum,
            @RequestParam("amountDebs") Double deudas,
            @RequestParam("payFile") MultipartFile LaboralFile,
            @RequestParam("histDicom") MultipartFile dicomFile,
            @RequestParam("ingressFile") MultipartFile ingressFile,
            @RequestParam("debs") MultipartFile deudasFile,
            @RequestParam("AhorroFile") MultipartFile AhorroFile,
            @RequestParam("TipoEmpleo") Integer TipoEmpleo,
            @RequestParam("idSc") Long idSc){
        Solicitud bandera = serviceSolicitud.updateSolicitud(id, ingress, statusDicom,
                Seniority, IngressAcum, deudas, LaboralFile, dicomFile,
                ingressFile, deudasFile, AhorroFile, TipoEmpleo, idSc);
        return ResponseEntity.ok(bandera);
    }
    @PutMapping("/actualizarCredito")
    public void EvaluarCredit(@RequestParam("id") Long id,
                              @RequestParam("Ingress") Double ingress,
                              @RequestParam("statusDicom") Integer statusDicom,
                              @RequestParam("seniority") Integer Seniority,
                              @RequestParam("ingressAcum") Double ingressAcum,
                              @RequestParam("amountDebs") Double deudas,
                              @RequestParam("years") Integer years,
                              @RequestParam("typejob") Integer TipoEmpleo){

        serviceSolicitud.actualizaSolicitud(id, ingress, statusDicom, Seniority, ingressAcum, deudas, years, TipoEmpleo);
    }

    @PutMapping("/updateStatus")
    public ResponseEntity<Solicitud> updateStatus(@RequestBody Solicitud solicitud) {
        Solicitud bandera = serviceSolicitud.updateStatus(solicitud);
        return ResponseEntity.ok(bandera);
    }

    @GetMapping("/getSolicitudes")
    public ResponseEntity<List<Solicitud>> getSolicitudes(){
        return ResponseEntity.ok(serviceSolicitud.getSolicitudes());
    }

    @GetMapping("/getSol/{id}")
    public ResponseEntity<Solicitud> getSolicitud(@PathVariable Long id){
        Solicitud credit = serviceSolicitud.searchSolicitud(id);
        return ResponseEntity.ok(credit);
    }

    @GetMapping("/getCreditByUserId/{userId}")
    public ResponseEntity<List<Solicitud>> findSolicitudByUserId(@PathVariable Long userId){
        return ResponseEntity.ok(serviceSolicitud.findSolicitudByUserId(userId));
    }
}
