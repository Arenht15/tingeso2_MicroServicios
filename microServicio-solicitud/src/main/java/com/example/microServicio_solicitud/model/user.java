package com.example.microServicio_solicitud.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class user {
    private Long Id;
    private String rut;
    private String name;
    private String surname;
    private String email;
    private LocalDate birthdate;
    @Lob
    private byte[] identification;
}
