package com.example.microServicio_Evaluacion;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class MicroServicioEvaluacionApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroServicioEvaluacionApplication.class, args);
	}

}
