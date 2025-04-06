package edu.neu.csye6200.controller;

import edu.neu.csye6200.exception.AlreadyExistsException;
import edu.neu.csye6200.request.*;
import edu.neu.csye6200.service.MediVaultServiceImpl.CommonResponse;
import edu.neu.csye6200.service.MediVaultService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class MediVaultController {

    @Autowired
    private MediVaultService mediVaultService;

    @PostMapping("/register")
    public CommonResponse createCustomer(@Valid @RequestBody NewUserRequest request) throws AlreadyExistsException {
        return mediVaultService.createUser(request);
    }

    @PostMapping("/customer")
    public CommonResponse createCustomer(@Valid @RequestBody NewCustomerRequest request){
        return mediVaultService.createCustomer(request);
    }

    @PostMapping("/medicine")
    public CommonResponse createMedicine(@Valid @RequestBody NewMedicineRequest request) throws AlreadyExistsException {
        return mediVaultService.createMedicine(request);
    }

    @PostMapping("/orders")
    public CommonResponse createOrder(@Valid @RequestBody NewOrderRequest request){
        return mediVaultService.createOrder(request);
    }

    @GetMapping("/customer")
    public CommonResponse fetAllCustomers(){
        return mediVaultService.fetchAllCustomers();
    }

    @GetMapping("/medicines")
    public CommonResponse fetAllMedicines(@Valid @RequestHeader String userHashId){
        return mediVaultService.fetchAllMedicines(userHashId);
    }

    @GetMapping("/orders")
    public CommonResponse fetAllOrders(@Valid @RequestHeader String userHashId){
        return mediVaultService.fetchAllOrders(userHashId);
    }

    @PostMapping("/login")
    public CommonResponse loginUser(@Valid @RequestBody LoginRequest request){
        return mediVaultService.loginUser(request);
    }
}
