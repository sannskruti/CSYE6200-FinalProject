package edu.neu.csye6200.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NewCarRequest {

    @NotEmpty(message = "Brand should not be empty")
    private String brand;

    @NotEmpty(message = "Model should not be empty")
    private String model;

    @Min(1886) // Cars have been around since 1886, so this is a basic check
    private int year;

    @NotEmpty(message = "Color should not be empty")
    private String color;

    @NotEmpty(message = "Fuel Type should not be empty")
    private String fuelType;

    @Min(0)  // Mileage should be a positive number or zero
    private double mileage;

    @Min(1)  // Price should be a positive value
    private double price;

    private String description;

    private boolean isUsed;            // true = used, false = new
    private boolean available;         // Is the car available in inventory?

    @NotEmpty(message = "Engine Type should not be empty")
    private String engineType;

    @Min(1)  // At least one seat
    private int seatingCapacity;

    @NotEmpty(message = "Location should not be empty")
    private String location;

    private String imageUrl;
}