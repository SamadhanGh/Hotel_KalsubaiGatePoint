package com.hotelkalsubai.controller;

import com.hotelkalsubai.dto.ApiResponse;
import com.hotelkalsubai.dto.auth.*;
import com.hotelkalsubai.entity.User;
import com.hotelkalsubai.security.JwtUtils;
import com.hotelkalsubai.security.UserDetailsImpl;
import com.hotelkalsubai.service.AuthService;
import com.hotelkalsubai.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/auth")
@Tag(name = "Authentication", description = "Authentication management APIs")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserService userService;

    @Autowired
    AuthService authService;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    @Operation(summary = "User login", description = "Authenticate user with email and password")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateJwtToken(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            List<String> roles = userDetails.getAuthorities().stream()
                    .map(item -> item.getAuthority())
                    .collect(Collectors.toList());

            // Check if user type matches requested type
            if (loginRequest.getUserType() != null) {
                boolean isAdmin = roles.contains("ROLE_ADMIN");
                if (loginRequest.getUserType().equals("admin") && !isAdmin) {
                    return ResponseEntity.badRequest()
                            .body(ApiResponse.error("Access denied. Admin privileges required."));
                }
            }

            JwtResponse jwtResponse = new JwtResponse(jwt,
                    userDetails.getId(),
                    userDetails.getUsername(),
                    userDetails.getEmail(),
                    roles);

            return ResponseEntity.ok(ApiResponse.success("Login successful", jwtResponse));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Invalid credentials"));
        }
    }

    @PostMapping("/register")
    @Operation(summary = "User registration", description = "Register a new user account")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        if (userService.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Email is already in use!"));
        }

        if (userService.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Username is already taken!"));
        }

        // Determine roles based on user type
        Set<User.Role> roles;
        if ("admin".equals(signUpRequest.getUserType())) {
            roles = Set.of(User.Role.ROLE_ADMIN, User.Role.ROLE_USER);
        } else {
            roles = Set.of(User.Role.ROLE_USER);
        }

        // Create new user account
        User user = userService.createUser(
                signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                signUpRequest.getPassword(),
                signUpRequest.getPhoneNumber(),
                roles);

        return ResponseEntity.ok(ApiResponse.success("User registered successfully!"));
    }

    @PostMapping("/forgot-password")
    @Operation(summary = "Forgot password", description = "Send password reset email")
    public ResponseEntity<?> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        try {
            authService.sendPasswordResetEmail(request.getEmail());
            return ResponseEntity.ok(ApiResponse.success("Password reset email sent successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Failed to send password reset email"));
        }
    }

    @PostMapping("/mobile-otp")
    @Operation(summary = "Mobile OTP", description = "Send or verify mobile OTP")
    public ResponseEntity<?> mobileOtp(@Valid @RequestBody OtpRequest request) {
        try {
            if (request.getOtpCode() == null) {
                // Send OTP
                authService.sendMobileOtp(request.getPhoneNumber());
                return ResponseEntity.ok(ApiResponse.success("OTP sent successfully"));
            } else {
                // Verify OTP and login
                JwtResponse jwtResponse = authService.verifyOtpAndLogin(request.getPhoneNumber(), request.getOtpCode());
                return ResponseEntity.ok(ApiResponse.success("OTP verified successfully", jwtResponse));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error(e.getMessage()));
        }
    }

    @PostMapping("/google")
    @Operation(summary = "Google login", description = "Authenticate with Google")
    public ResponseEntity<?> googleLogin(@Valid @RequestBody SocialLoginRequest request) {
        try {
            JwtResponse jwtResponse = authService.authenticateWithGoogle(request.getToken(), request.getUserType());
            return ResponseEntity.ok(ApiResponse.success("Google login successful", jwtResponse));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Google authentication failed"));
        }
    }

    @PostMapping("/facebook")
    @Operation(summary = "Facebook login", description = "Authenticate with Facebook")
    public ResponseEntity<?> facebookLogin(@Valid @RequestBody SocialLoginRequest request) {
        try {
            JwtResponse jwtResponse = authService.authenticateWithFacebook(request.getToken(), request.getUserType());
            return ResponseEntity.ok(ApiResponse.success("Facebook login successful", jwtResponse));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Facebook authentication failed"));
        }
    }
}