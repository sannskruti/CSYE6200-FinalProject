package edu.neu.csye6200.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NewOrderRequest {

    @NotEmpty(message = "Customer mobile should not be empty")
    private String customerMobileNumber;

    @NotEmpty(message = "Car model should not be empty")
    private String carModel;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;
}
