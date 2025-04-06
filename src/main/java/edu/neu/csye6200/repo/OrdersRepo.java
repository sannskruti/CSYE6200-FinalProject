package edu.neu.csye6200.repo;


import edu.neu.csye6200.model.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface OrdersRepo extends JpaRepository<Orders, UUID> {
    List<Orders> findByUsers_Id(UUID userHashId);
}
