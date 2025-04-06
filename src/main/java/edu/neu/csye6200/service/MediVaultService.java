package edu.neu.csye6200.service;

import edu.neu.csye6200.exception.AlreadyExistsException;
import edu.neu.csye6200.request.*;
import edu.neu.csye6200.service.MediVaultServiceImpl.CommonResponse;

public interface MediVaultService {
    CommonResponse createCustomer(NewCustomerRequest request);

    CommonResponse createMedicine(NewMedicineRequest request) throws AlreadyExistsException;

    CommonResponse createOrder(NewOrderRequest request);

    CommonResponse fetchAllCustomers();

    CommonResponse fetchAllMedicines(String userHashId);

    CommonResponse fetchAllOrders(String userHashId);

    CommonResponse createUser(NewUserRequest request) throws AlreadyExistsException;

    CommonResponse loginUser(LoginRequest request);

    CommonResponse getAllUsers();

}

