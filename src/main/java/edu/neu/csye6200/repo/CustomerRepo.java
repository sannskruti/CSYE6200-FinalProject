package edu.neu.csye6200.repo;

import edu.neu.csye6200.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CustomerRepo extends JpaRepository<Customer, UUID> {
    Optional<Customer> findByPhoneNumber(String phoneNumber);

    List<Customer> findByUsers_Id(UUID fromString);
}
