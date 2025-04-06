package edu.neu.csye6200.repo;

import edu.neu.csye6200.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UsersRepo extends JpaRepository<Users, UUID> {
    Users findByEmail(String email);

    Users findByEmailAndPassword(String email, String password);
}
