package edu.neu.csye6200.repo;

import edu.neu.csye6200.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CarRepo extends JpaRepository<Car, UUID> {

    List<Car> findByUsers_Id(UUID userId);

    // Find a car by its brand and model, and optionally year (to avoid duplicate cars)
    Car findByBrandAndModelAndYear(String brand, String model, int year);

    // Find all cars associated with a particular user (by user ID)
//    static List<Car> findByUsers_Id(UUID id);
}
