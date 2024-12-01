package com.example.microServicio_solicitud.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "SavingCapacity")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SavingCapacity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private Double ScAmount; // saving capacity of the user
    private Integer savingYears; // years of the saving capacity
    private Double savingAmountAcum; // amount of the saving capacity
    @ElementCollection
    @CollectionTable(name = "saving_history", joinColumns = @JoinColumn(name = "saving_capacity_id"))
    private List<Double> SavingHistory; // saving history of the user
    @ElementCollection
    @CollectionTable(name = "withdrawal_history", joinColumns = @JoinColumn(name = "saving_capacity_id"))
    private List<Double> WithdrawalHistory; // saving history of the user
    @ElementCollection
    @CollectionTable(name = "deposit_history", joinColumns = @JoinColumn(name = "saving_capacity_id"))
    private List<Double> DepositHistory; // saving history of the user
}