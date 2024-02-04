package com.jwt.demo.repository;

import com.jwt.demo.DTO.UserDto;
import com.jwt.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {
    Optional<User> findByLogin(String subject);
}
