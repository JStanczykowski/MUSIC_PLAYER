package com.example.music_player.controller;

import com.example.music_player.jwt.*;
import com.example.music_player.model.ERole;
import com.example.music_player.model.Role;
import com.example.music_player.model.User;
import com.example.music_player.repository.RoleRepository;
import com.example.music_player.repository.UserRepository;
import com.example.music_player.service.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;


    private final UserRepository userRepository;


    private final RoleRepository roleRepository;


    private final PasswordEncoder encoder;


    private final JwtUtils jwtUtils;

    public AuthController(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder encoder, JwtUtils jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
        this.jwtUtils = jwtUtils;
    }

    @PreAuthorize("hasAnyRole( 'ADMIN')")
    @PutMapping("/user/unactive/{username}")
    @CrossOrigin
    public  ResponseEntity<?> changeActiveUn(@PathVariable String username ){
        Optional<User> user = userRepository.findByUsername(username);
        if(user.isPresent()){
            user.get().setActive(false);
            userRepository.delete(user.get());
            userRepository.save(user.get());
        }

        return ResponseEntity.ok(new MessageResponse("User update successfully!"));
    }
    @PreAuthorize("hasAnyRole( 'ADMIN')")
    @GetMapping("/user")
    @CrossOrigin
    public  List<User> getAllUsers(){
      List<User> allUsers= userRepository.findAll();
      return allUsers;
    }
    @PreAuthorize("hasAnyRole( 'ADMIN')")
    @PutMapping("/user/active/{username}")
    @CrossOrigin
    public  ResponseEntity<?> changeActive(@PathVariable String username ){
        Optional<User> user = userRepository.findByUsername(username);
        if(user.isPresent()){
            user.get().setActive(true);
            userRepository.delete(user.get());
            userRepository.save(user.get());
        }

        return ResponseEntity.ok(new MessageResponse("User update successfully!"));
    }
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        System.out.println("info: " + userDetails.isActive());

            return ResponseEntity.ok(new JwtResponse(jwt,
                    userDetails.getId(),
                    userDetails.getUsername(),
                    userDetails.getEmail(),
                    userDetails.isActive(),
                    roles));

    }

    @PostMapping("/signup")
    @CrossOrigin
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRoles();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);

                        break;
                    case "mod":
                        Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);

                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

}