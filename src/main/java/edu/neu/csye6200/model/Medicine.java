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
public class Medicine extends CommonFields {
    @Id
    private UUID id;
    private String name;
    private String content;
    private double price;

    @ManyToMany(mappedBy = "medicines")
    @JsonIgnore
    private List<Orders> orders;

    @ManyToMany
    @JoinTable(
            name = "medicine_user",
            joinColumns = @JoinColumn(name = "medicine_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private List<Users> users;

    public Medicine(UUID id, String name, String content, double price) {
        this.id = id;
        this.name = name;
        this.content = content;
        this.price = price;
    }
}
