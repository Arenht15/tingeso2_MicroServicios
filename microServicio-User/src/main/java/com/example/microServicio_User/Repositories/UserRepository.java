package com.example.microServicio_User.Repositories;
import com.example.microServicio_User.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByRut(String rut);
}
