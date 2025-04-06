package edu.neu.csye6200.controller;

import edu.neu.csye6200.exception.AlreadyExistsException;
import edu.neu.csye6200.request.*;
import edu.neu.csye6200.service.CarStoreServiceImpl.CommonResponse;
import edu.neu.csye6200.service.CarStoreService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class CarStoreController {

    @Autowired
    private CarStoreService carStoreService;

    @PostMapping("/register")
    public CommonResponse createCustomer(@Valid @RequestBody NewUserRequest request) throws AlreadyExistsException {
        return carStoreService.createUser(request);
    }

    @PostMapping("/customer")
    public CommonResponse createCustomer(@Valid @RequestBody NewCustomerRequest request){
        return carStoreService.createCustomer(request);
    }

    @PostMapping("/car")
    public CommonResponse createCar(@Valid @RequestBody NewCarRequest request) throws AlreadyExistsException {
        return carStoreService.createCar(request);
    }

    @PostMapping("/orders")
    public CommonResponse createOrder(@Valid @RequestBody NewOrderRequest request){
        return carStoreService.createOrder(request);
    }

    @GetMapping("/customer")
    public CommonResponse fetAllCustomers(){
        return carStoreService.fetchAllCustomers();
    }

    @GetMapping("/cars")
    public CommonResponse fetchAllCars(@Valid @RequestHeader String userHashId){
        return carStoreService.fetchAllCars(userHashId);
    }

    @GetMapping("/orders")
    public CommonResponse fetAllOrders(@Valid @RequestHeader String userHashId){
        return carStoreService.fetchAllOrders(userHashId);
    }

    @PostMapping("/login")
    public CommonResponse loginUser(@Valid @RequestBody LoginRequest request){
        return carStoreService.loginUser(request);
    }
}
