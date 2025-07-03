package com.hotelkalsubai.repository;

import com.hotelkalsubai.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByPhoneNumber(String phoneNumber);
    Optional<User> findByGoogleId(String googleId);
    Optional<User> findByFacebookId(String facebookId);
    Optional<User> findByResetToken(String resetToken);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}