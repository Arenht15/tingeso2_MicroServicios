package com.example.microServicio_solicitud.Repository;

import com.example.microServicio_solicitud.Entities.Solicitud;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SolicitudRepository extends JpaRepository<Solicitud, Long> {

    @Query("SELECT c FROM Solicitud c WHERE c.aprovedApplication = -1 or c.aprovedApplication = 2")
    List<Solicitud> findSolicituds();
    @Query("SELECT c FROM Solicitud c WHERE c.id_user = :userId")
    List<Solicitud> findSolicitudsByUserId(@Param("userId") Long userId);
}
