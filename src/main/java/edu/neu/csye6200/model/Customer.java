package edu.neu.csye6200.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString(exclude = {"orders", "users"})
public class Customer extends CommonFields {
    @Id
    private UUID id;
    private String name;
    private String city;
    private String address;
    private String phoneNumber;

    @ManyToMany(mappedBy = "customers")
    @JsonIgnoreProperties("customers")
    private List<Orders> orders;

    @ManyToMany
    @JoinTable(
            name = "customer_user",
            joinColumns = @JoinColumn(name = "customer_id"),
            inverseJoinColumns = @JoinColumn(name = "users_id")
    )
    @JsonIgnore
    private List<Users> users;

    public Customer(UUID id, String name, String city, String address, String phoneNumber) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
}

