package com.example.microServicio_seguimiento;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class MicroServicioSeguimientoApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroServicioSeguimientoApplication.class, args);
	}

}
