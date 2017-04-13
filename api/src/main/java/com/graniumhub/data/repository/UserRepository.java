package com.graniumhub.data.repository;

import com.graniumhub.data.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * Created by Sasha on 3/28/17.
 */
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findOne(int id);
    Optional<User> findByLogin(String username);
}
