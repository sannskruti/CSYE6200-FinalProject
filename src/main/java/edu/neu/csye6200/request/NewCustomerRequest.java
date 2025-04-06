package edu.neu.csye6200.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewCustomerRequest {
    @NotEmpty(message = "name should not be empty")
    private String name;
    @NotEmpty(message = "city should not be empty")
    private String city;
    @NotEmpty(message = "address should not be empty")
    private String address;
    @NotEmpty(message = "phoneNumber should not be empty")
    @Pattern(regexp = "^\\d{10}$",message = "Invalid mobile number")
    private String phoneNumber;
}
