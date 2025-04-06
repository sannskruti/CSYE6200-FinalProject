package edu.neu.csye6200.service;

import edu.neu.csye6200.exception.AlreadyExistsException;
import edu.neu.csye6200.request.*;
import edu.neu.csye6200.service.CarStoreServiceImpl.CommonResponse;

public interface CarStoreService {
    CommonResponse createCustomer(NewCustomerRequest request);

    CommonResponse createCar(NewCarRequest request) throws AlreadyExistsException;

    CommonResponse createOrder(NewOrderRequest request);

    CommonResponse fetchAllCustomers();

    CommonResponse fetchAllCars(String userHashId);

    CommonResponse fetchAllOrders(String userHashId);

    CommonResponse createUser(NewUserRequest request) throws AlreadyExistsException;

    CommonResponse loginUser(LoginRequest request);

    CommonResponse getAllUsers();

}

