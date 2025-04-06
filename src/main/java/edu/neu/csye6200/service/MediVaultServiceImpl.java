package edu.neu.csye6200.service;

import edu.neu.csye6200.context.CurrentUserUtil;
import edu.neu.csye6200.model.Customer;
import edu.neu.csye6200.model.Medicine;
import edu.neu.csye6200.model.Orders;
import edu.neu.csye6200.model.Users;
import edu.neu.csye6200.repo.CustomerRepo;
import edu.neu.csye6200.repo.MedicineRepo;
import edu.neu.csye6200.repo.OrdersRepo;
import edu.neu.csye6200.repo.UsersRepo;
import edu.neu.csye6200.request.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static edu.neu.csye6200.response.MediVaultMessages.*;

@Service
public class MediVaultServiceImpl implements MediVaultService {

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private MedicineRepo medicineRepo;

    @Autowired
    private OrdersRepo ordersRepo;

    @Autowired
    private UsersRepo usersRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Autowired
    private JwtUtil jwtUtil;


    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CommonResponse {
        private String status;
        private String message;
        private Object data;
        private Date time;

        public CommonResponse(String status, String message, Object data) {
            this(status, message, data, new Date());
        }

        public CommonResponse(String status, String message) {
            this(status, message, null, new Date());
        }
    }

    @Override
    public CommonResponse createCustomer(NewCustomerRequest request) {
//        Users users = findUserByHashId(userHashId);
        Users users = usersRepo.findByEmail(CurrentUserUtil.getCurrentUser());
        return customerRepo.findByPhoneNumber(request.getPhoneNumber())
                .map(customer -> {
                    if (customer.getUsers().stream().anyMatch(u -> u.equals(users))) {
                        return new CommonResponse(failure, customerAlreadyExists);
                    }
                    customer.setUsers(Stream.concat(customer.getUsers().stream(), Stream.of(users))
                            .collect(Collectors.toList()));
                    customerRepo.save(customer);
                    return new CommonResponse(success, customerCreated, customer);
                })
                .orElseGet(() -> {
                    Customer newCustomer = new Customer(UUID.randomUUID(), request.getName(), request.getCity(), request.getAddress(), request.getPhoneNumber());
                    newCustomer.setUsers(Stream.of(users).collect(Collectors.toList()));
                    customerRepo.save(newCustomer);
                    return new CommonResponse(success, customerCreated, newCustomer);
                });
    }

    @Override
    public CommonResponse createMedicine(NewMedicineRequest request) {
//        Users users = findUserByHashId(userHashId);
        Users users = usersRepo.findByEmail(CurrentUserUtil.getCurrentUser());
        return Optional.ofNullable(medicineRepo.findByName(request.getName()))
                .map(medicine -> {
                    if (medicine.getUsers().isEmpty()) {
                        medicine.setUsers(Stream.of(users).collect(Collectors.toList()));
                        medicineRepo.save(medicine);
                        return new CommonResponse(success, medicineCreated, medicine);
                    }
                    if (medicine.getUsers().stream().anyMatch(u -> u.equals(users))) {
                        return new CommonResponse(failure, medicinesFetched);
                    }
                    medicine.setUsers(Stream.concat(medicine.getUsers().stream(), Stream.of(users))
                            .collect(Collectors.toList()));
                    medicineRepo.save(medicine);
                    return new CommonResponse(success, medicineCreated, medicine);
                })
                .orElseGet(() -> {
                    Medicine newMedicine = new Medicine(UUID.randomUUID(), request.getName(), request.getContent(), request.getPrice());
                    newMedicine.setUsers(Stream.of(users).collect(Collectors.toList()));
                    medicineRepo.save(newMedicine);
                    return new CommonResponse(success, medicineCreated, newMedicine);
                });
    }

    @Override
    public CommonResponse createOrder(NewOrderRequest request) {
        Users users = usersRepo.findByEmail(CurrentUserUtil.getCurrentUser());
        Medicine medicine = Optional.ofNullable(medicineRepo.findByName(request.getMedicineName()))
                .orElseThrow(() -> new IllegalArgumentException(medicineNotFound));

        return customerRepo.findByPhoneNumber(request.getCustomerMobileNumber())
                .map(customer -> {
                    Orders orders = new Orders();
                    orders.setUsers(Stream.of(users).collect(Collectors.toList()));
                    orders.setCustomers(Stream.of(customer).collect(Collectors.toList()));
                    orders.setId(UUID.randomUUID());
                    orders.setMedicines(Stream.of(medicine).collect(Collectors.toList()));
                    orders.setQuantity(request.getQuantity());
                    orders.setOrderTotal(medicine.getPrice() * request.getQuantity());
                    ordersRepo.save(orders);
                    return new CommonResponse(success, orderCreated, orders);
                })
                .orElse(new CommonResponse(failure, customerNotFound));
    }

    @Override
    public CommonResponse fetchAllCustomers() {
        UUID userHashId = usersRepo.findByEmail(CurrentUserUtil.getCurrentUser()).getId();
        List<Customer> customerList = customerRepo.findByUsers_Id(userHashId);
        return new CommonResponse(success, customersFetched, customerList);
    }

    @Override
    public CommonResponse fetchAllMedicines(String userHashId) {
        List<Medicine> medicineList = medicineRepo.findByUsers_Id(UUID.fromString(userHashId));
        return new CommonResponse(success, medicinesFetched, medicineList);
    }

    @Override
    public CommonResponse fetchAllOrders(String userHashId) {
        List<Orders> orders = ordersRepo.findByUsers_Id(UUID.fromString(userHashId));
        return new CommonResponse(success, ordersFetched, orders);
    }

    @Override
    public CommonResponse createUser(NewUserRequest request) {
        return Optional.ofNullable(usersRepo.findByEmail(request.getEmail()))
                .map(user -> new CommonResponse(failure, userAlreadyExists))
                .orElseGet(() -> {
                    Users newUser = new Users();
                    newUser.setId(UUID.randomUUID());
                    newUser.setName(request.getName());
                    newUser.setEmail(request.getEmail());
                    newUser.setPassword(encoder.encode(request.getPassword()));
                    usersRepo.save(newUser);
                    return new CommonResponse(success, userCreated, newUser);
                });
    }

    @Override
    public CommonResponse loginUser(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate( new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        Users users = usersRepo.findByEmail(request.getUsername());
        Map<String,String> userDetails = new HashMap<>();
        userDetails.put("id",users.getId().toString());
        userDetails.put("token", jwtUtil.generateToken(request.getUsername()));
        if (authentication.isAuthenticated()){
            return new CommonResponse("OK",usersLoggedInSuccessfully, userDetails);
        } else
            return new CommonResponse("Failed",userNotFound, "User not authenticated");
    }

    @Override
    public CommonResponse getAllUsers() {
        List<Users> users = usersRepo.findAll();
        if(users.isEmpty())
            return new CommonResponse(failure,userNotFound);
        return new CommonResponse(success, "Successfully got all users", users);
    }

    private Users findUserByHashId(String userHashId) {
        return usersRepo.findById(UUID.fromString(userHashId))
                .orElseThrow(() -> new NullPointerException(userNotFound));
    }
}