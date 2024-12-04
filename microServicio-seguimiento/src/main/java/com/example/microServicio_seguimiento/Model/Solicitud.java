package com.example.microServicio_seguimiento.Model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Solicitud {
    private Long id; // id of the application

    private Long id_user; // id of the user that made the application
    private String rut; // rut of the user
    //Credit data
    private Integer type; // type of the credit
    private Double amount; // amount of the credit
    private Integer term; // term of the credit
    private Double rate; // annual credit rate
    private Double cuota; // fee of the credit

    //Fee/income evaluation data
    private byte[] ingressFile; // file of the ingress
    private Double ingress; // value of the ingress
    private Integer aprovedFeeIncome; // status of the fee/income evaluation

    //file of Dicom and status of the Dicom
    private byte[] histDicom; // file of the Dicom
    private Integer statusDicom; // status of the Dicom

    //file of paySheet, jobCertificate and status of the employment
    //If the user is employed then only uses the jobCertificate and seniority but
    //if the user is "self-employed" worker then uses "the paySheet" and de "incomeFor2Years"
    private byte[] payFile; // file of the paySheet for unemployed
    private Integer typeJob; // type of the job
    private Integer seniority; // seniority of the employment
    private double IngressAcum; // Ingress acumulated of the user
    private Integer aprovedEmployed; // status of the employment

    //file of debs and amount of the debs
    private byte[] debs; // file of the debs
    private Double amountDebs; // amount of the debs
    private Integer aprovedDebs; // status of the debs

    //financial of amount credit
    private Double porcent;
    private Integer amountApproved; // amount approved of the credit

    //Years old of the user
    private byte[] identidadFile; // file of the birthdate
    private Integer years; // years old of the user
    private Integer aprovedYears; // status of the years old

    //saving capacity of the user
    private byte[] savingCapacityFile; // file of the saving capacity
    private Long id_savingCapacity; // id of the saving capacity
    private Integer aprovedSavingCapacity; // status of the saving capacity

    //status of the application
    //private Double creditLifeInsurance; // life insurance of the credit
    //private Double creditJob; // job insurance of the credit
    //private Double AdministrationCommission; // administration commission of the credit
    //private Double costM; // Month cost of the credit
    //private Double costT; // total cost of the credit
    private Integer aprovedApplication; // status of the application
}
