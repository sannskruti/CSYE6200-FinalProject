package edu.neu.csye6200.repo;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.neu.csye6200.model.Car;

public interface CarRepo extends JpaRepository<Car, UUID> {

    List<Car> findByUsers_Id(UUID userId);

    // Find a car by its brand and model, and optionally year (to avoid duplicate cars)
    Car findByBrandAndModelAndYear(String brand, String model, int year);

    // 🔧 Add this to fix the error:
    Car findByModel(String model);
}
