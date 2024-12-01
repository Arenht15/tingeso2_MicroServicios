package com.example.microServicio_User.Controllers;

import com.example.microServicio_User.Entities.User;
import com.example.microServicio_User.Services.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/prestabanco/user")
@CrossOrigin(origins = "*")
public class ControllerUser {
    @Autowired
    private UserServices userServices;

    @PostMapping("/save")
    public ResponseEntity<User> save(
            @RequestParam("rut") String rut,
            @RequestParam("email") String email,
            @RequestParam("name") String name,
            @RequestParam("surname") String surname,
            @RequestParam("birthdate") String birthdate,
            @RequestParam("identification") MultipartFile identification) {

        User user = userServices.saveUser(rut, email, name, surname, birthdate, identification);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/SearchUser")
    public ResponseEntity<User> searchUser(@RequestParam String rut){
        User bandera = userServices.searchUser(rut);
        return ResponseEntity.ok(bandera);
    }
}
