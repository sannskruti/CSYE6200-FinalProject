package edu.neu.csye6200.model;

import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@NoArgsConstructor
@ToString(exclude = {"customers", "cars", "orders"}) 
public class Users {
    @Id
    private UUID id;
    private String name;
    private String email;

    @JsonIgnore
    private String password;

    @JsonIgnore
    @ManyToMany(mappedBy = "users")
    private List<Customer> customers;

    @JsonIgnore
    @ManyToMany(mappedBy = "users")
    private List<Car> cars;

    @JsonIgnore
    @ManyToMany(mappedBy = "users")
    private List<Orders> orders;
}
