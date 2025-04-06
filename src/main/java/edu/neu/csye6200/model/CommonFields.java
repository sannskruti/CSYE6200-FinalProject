package edu.neu.csye6200.model;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@MappedSuperclass
public class CommonFields {
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Timestamp createdDate;
    @UpdateTimestamp
    private Timestamp modifiedDate;
}