package edu.neu.csye6200.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Car extends CommonFields {
    @Id
    private UUID id;

    private String brand;              // e.g., Toyota, Ford
    private String model;              // e.g., Camry, Mustang
    private int year;
    private String color;
    private String fuelType;           // Petrol, Diesel, Electric
    private double mileage;
    private double price;
    private String description;
    private boolean isUsed;            // true = used, false = new
    private boolean available;         // In inventory
    private String engineType;         // e.g., V6, I4
    private int seatingCapacity;
    private String location;           // Dealership location
    private String imageUrl;

    @ManyToMany(mappedBy = "cars")
    @JsonIgnore
    private List<Orders> orders;

    @ManyToMany
    @JoinTable(
            name = "medicine_user",
            joinColumns = @JoinColumn(name = "medicine_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<Users> users;
    public Car(
            UUID id,
            String brand,
            String model,
            int year,
            String color,
            String fuelType,
            double mileage,
            double price,
            String description,
            boolean isUsed,
            boolean available,
            String engineType,
            int seatingCapacity,
            String location,
            String imageUrl
    ) {
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.color = color;
        this.fuelType = fuelType;
        this.mileage = mileage;
        this.price = price;
        this.description = description;
        this.isUsed = isUsed;
        this.available = available;
        this.engineType = engineType;
        this.seatingCapacity = seatingCapacity;
        this.location = location;
        this.imageUrl = imageUrl;
    }

}
