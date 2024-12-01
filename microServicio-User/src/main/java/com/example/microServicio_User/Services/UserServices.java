package com.example.microServicio_User.Services;

import com.example.microServicio_User.Entities.User;
import com.example.microServicio_User.Repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
public class UserServices {
    @Autowired
    private UserRepository userRepository;
    @Transactional
    public User searchUser(String rut) {
        try{
            User user = userRepository.findByRut(rut);
            return user;
        }catch (Exception e){
            return null;
        }
    }

    public User saveUser(String rut, String email, String name, String surname, String birthdate, MultipartFile identification) {
        User user = new User();
        user.setRut(rut);
        user.setEmail(email);
        user.setName(name);
        user.setSurname(surname);
        user.setBirthdate(LocalDate.parse(birthdate));
        // File -> byte[]
        try {
            user.setIdentification(identification.getBytes());
        } catch (IOException e) {
            return null;
        }
        try{
            user = userRepository.save(user);
            return user;
        }catch (Exception e){
            return null;
        }
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }
}
