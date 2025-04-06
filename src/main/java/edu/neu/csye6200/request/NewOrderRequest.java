package edu.neu.csye6200.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NewOrderRequest {
    @NotEmpty(message = "customer mobile should not be empty")
    private String customerMobileNumber;
    @NotEmpty(message = "medicine name should not be empty")
    private String medicineName;
    @Min(1)
    private int quantity;
}
