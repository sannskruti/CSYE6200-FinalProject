package edu.neu.csye6200.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class NewMedicineRequest {
    @NotEmpty(message = "name should not be empty")
    private String name;
    @NotEmpty(message = "content should not be empty")
    private String content;
    @Min(1)
    private double price;
}
