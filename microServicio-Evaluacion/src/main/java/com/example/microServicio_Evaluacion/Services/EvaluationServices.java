package com.example.microServicio_Evaluacion.Services;

import com.example.microServicio_Evaluacion.Model.Solicitud;
import com.example.microServicio_Evaluacion.Model.SavingCapacity;;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class EvaluationServices {

    @Autowired
    RestTemplate restTemplate;

    public SavingCapacity searchSavingCapacity(Long id){
        return restTemplate.getForObject("http://microServicio-solicitud/prestabanco/sc/searchSavingCapacity/" + id, SavingCapacity.class);
    }

    public Solicitud searchSolicitud(Long id){
        return restTemplate.getForObject("http://microServicio-solicitud/prestabanco/solicitud/getSol/" + id, Solicitud.class);
    }

    public void saveSolicitud(Solicitud solicitud){
        restTemplate.put("http://microServicio-solicitud/prestabanco/solicitud/updateStatus", solicitud, Solicitud.class);
    }

    public void PendingDocument(Long id){
        Solicitud s = searchSolicitud(id);
        s.setAprovedApplication(2);
        saveSolicitud(s);
    }
    public Boolean calculateSavingHistory(SavingCapacity sc){
        for (int i = 0; i < sc.getWithdrawalHistory().size(); i++) {
            if(sc.getSavingHistory().get(i) > 0.0){
                if(sc.getWithdrawalHistory().get(i) > sc.getSavingHistory().get(i)*0.5){
                    return true;
                }
            }else{
                return true;
            }
        }
        return false;
    }


    public  Boolean calculateDepositHistory(SavingCapacity sc, Double ingresos){
        for (int i = 1; i < sc.getSavingHistory().size(); i++) {
            if(sc.getDepositHistory().get(i) < ingresos*0.05){
                return true;
            }
        }
        return false;
    }

    public Boolean calculateWithdrawals(SavingCapacity sc){
        List<Double> retiros = sc.getWithdrawalHistory();
        for (int i = retiros.size()-1; i >= 6; i--) {
            if(sc.getSavingHistory().get(i) > 0.0){
                if(retiros.get(i) > sc.getSavingHistory().get(i)*0.3){
                    return true;
                }
            }
        }return false;
    }

    public Solicitud feeIncome(Solicitud c) {
        double numerator = c.getCuota() / c.getIngress();
        double feeIncome = numerator * 100;
        if (feeIncome > 0.0 && feeIncome < 35.0) {
            c.setAprovedFeeIncome(1);
        } else {
            c.setAprovedFeeIncome(0);
        }
        return c;
    }

    public Solicitud creditHistory(Solicitud c) {
        if (c.getStatusDicom() == 0) {
            c.setStatusDicom(0);
        } else if (c.getStatusDicom() == 1) {
            c.setStatusDicom(1);
        }
        return c;
    }


    public Solicitud WorkSituacion(Solicitud c){
        if(c.getTypeJob() == 0){
            if(c.getSeniority() < 1){
                c.setAprovedEmployed(0);
            }else{
                c.setAprovedEmployed(1);
            }
        } else{
            Double ingressAcum = c.getIngressAcum();
            if(ingressAcum < 6000000.0){
                c.setAprovedEmployed(0);
            }else{
                c.setAprovedEmployed(1);
            }
        }
        return c;

    }

    public Solicitud Debs(Solicitud c) {
        if (c.getAmountDebs() == 0.0) {
            c.setAprovedDebs(1);
        }else {
            double midIngres = c.getIngress() * 0.5;
            double deb = c.getAmountDebs() + c.getCuota();
            if (deb < midIngres) {
                c.setAprovedDebs(1);
            } else {
                c.setAprovedDebs(0);
            }
        }
        return c;
    }

    public Solicitud financingCredit(Solicitud c) {
        double porcent = c.getPorcent()/100;
        if(porcent <= 0.0 || porcent > 0.8){
            c.setAmountApproved(0);
        }else{
            Integer type = c.getType();
            if(type == 4){
                if(porcent <= 0.5){
                    c.setAmountApproved(1);
                }else{
                    c.setAmountApproved(0);
                }
            }else if (type == 3) {
                if (porcent <= 0.6) {
                    c.setAmountApproved(1);
                }else{
                    c.setAmountApproved(0);
                }
            }else if(type == 2) {
                if (porcent <= 0.7) {
                    c.setAmountApproved(1);
                }else{
                    c.setAmountApproved(0);
                }
            }else if(type == 1) {
                if (porcent <= 0.8) {
                    c.setAmountApproved(1);
                }else{
                    c.setAmountApproved(0);
                }
            }
        }
        return c;
    }

    public Solicitud Verifyyears(Solicitud c) {
        Integer years = c.getYears();
        if (years < 18) {
            c.setAprovedYears(0);
        } else {
            double term = c.getTerm();
            double y = years + term + 5;
            if (y < 75) {
                c.setAprovedYears(1);
            } else {
                c.setAprovedYears(0);
            }
        }
        return c;
    }

    public Solicitud SavingCapacity(Solicitud c) {
        SavingCapacity sc = searchSavingCapacity(c.getId_savingCapacity());
        int ptj = 5;
        Double tenProcent = c.getAmount() * 0.1;
        if(sc.getScAmount() > tenProcent){
            ptj = ptj - 1;
        }
        if(calculateSavingHistory(sc)){
            ptj = ptj - 1;
        }if(calculateDepositHistory(sc, c.getIngress())){
            ptj = ptj - 1;
        }if(calculateWithdrawals(sc)){
            ptj = ptj - 1;
        }
        if(sc.getSavingYears() <2){
            if(sc.getSavingAmountAcum() < c.getAmount()*0.2){
                ptj = ptj - 1;
            }
        }else{
            if(sc.getSavingAmountAcum() < c.getAmount()*0.1){
                ptj = ptj - 1;
            }
        }
        if(ptj < 4){
            c.setAprovedSavingCapacity(0);
        }else{
            c.setAprovedSavingCapacity(1);
        }
        return c;
    }

    public void calculateSolicitud(Long id) {
        Solicitud c = searchSolicitud(id);
        c = feeIncome(c); // feeIncome evaluation
        c = creditHistory(c); // credit history evaluation
        c = WorkSituacion(c); // work situation evaluation
        c = Debs(c); // debs evaluation
        c = financingCredit(c); // financing credit evaluation
        c = Verifyyears(c); // years old evaluation
        c = SavingCapacity(c); // saving capacity evaluation
        evaluateCredit(c); // evaluate credit
    }

    public void evaluateCredit(Solicitud c) {
        if (c.getAprovedFeeIncome() == 1
                && c.getStatusDicom() == 1
                && c.getAprovedDebs() == 1
                && c.getAmountApproved() == 1
                && c.getAprovedYears() == 1
                && c.getAprovedSavingCapacity() == 1) {
            c.setAprovedApplication(1);
            saveSolicitud(c);

        } else {
            c.setAprovedApplication(0);
            saveSolicitud(c);
        }
    }
}
