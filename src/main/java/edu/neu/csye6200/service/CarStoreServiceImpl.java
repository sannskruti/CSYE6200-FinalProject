package edu.neu.csye6200.service;

import edu.neu.csye6200.context.CurrentUserUtil;
import edu.neu.csye6200.model.Car;
import edu.neu.csye6200.model.Customer;
import edu.neu.csye6200.model.Orders;
import edu.neu.csye6200.model.Users;
import edu.neu.csye6200.repo.CarRepo;
import edu.neu.csye6200.repo.CustomerRepo;
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

import static edu.neu.csye6200.response.CarWiseMessages.*;

@Service
public class CarStoreServiceImpl implements CarStoreService {

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private CarRepo carRepo;

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
    public CommonResponse createCar(NewCarRequest request) {
        Users user = usersRepo.findByEmail(CurrentUserUtil.getCurrentUser());

        return Optional.ofNullable(carRepo.findByBrandAndModelAndYear(request.getBrand(), request.getModel(), request.getYear()))
                .map(car -> {
                    if (car.getUsers().isEmpty()) {
                        car.setUsers(Stream.of(user).collect(Collectors.toList()));
                        carRepo.save(car);
                        return new CommonResponse(success, carCreated, car);
                    }
                    if (car.getUsers().stream().anyMatch(u -> u.equals(user))) {
                        return new CommonResponse(failure, carAlreadyExists, null);
                    }
                    car.setUsers(Stream.concat(car.getUsers().stream(), Stream.of(user))
                            .collect(Collectors.toList()));
                    carRepo.save(car);
                    return new CommonResponse(success, carCreated, car);
                })
                .orElseGet(() -> {
                    Car newCar = new Car(
                            UUID.randomUUID(),
                            request.getBrand(),
                            request.getModel(),
                            request.getYear(),
                            request.getColor(),
                            request.getFuelType(),
                            request.getMileage(),
                            request.getPrice(),
                            request.getDescription(),
                            request.isUsed(),
                            request.isAvailable(),
                            request.getEngineType(),
                            request.getSeatingCapacity(),
                            request.getLocation(),
                            request.getImageUrl()
                    );
                    newCar.setUsers(Stream.of(user).collect(Collectors.toList()));
                    carRepo.save(newCar);
                    return new CommonResponse(success, carCreated, newCar);
                });
    }

    @Override
    public CommonResponse createOrder(NewOrderRequest request) {
        Users users = usersRepo.findByEmail(CurrentUserUtil.getCurrentUser());
        Car car = Optional.ofNullable(carRepo.findByModel(request.getCarModel()))
                .orElseThrow(() -> new IllegalArgumentException(carNotFound));

        return customerRepo.findByPhoneNumber(request.getCustomerMobileNumber())
                .map(customer -> {
                    Orders orders = new Orders();
                    orders.setUsers(List.of(users));
                    orders.setCustomers(List.of(customer));
                    orders.setCars(List.of(car));
                    orders.setId(UUID.randomUUID());
                    orders.setQuantity(request.getQuantity());
                    orders.setOrderTotal(car.getPrice() * request.getQuantity());
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
    public CommonResponse fetchAllCars(String userHashId) {
        List<Car> carList = carRepo.findByUsers_Id(UUID.fromString(userHashId));
        return new CommonResponse(success, carsFetched, carList);
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
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        Users users = usersRepo.findByEmail(request.getUsername());
        Map<String, String> userDetails = new HashMap<>();
        userDetails.put("id", users.getId().toString());
        userDetails.put("token", jwtUtil.generateToken(request.getUsername()));

        if (authentication.isAuthenticated()) {
            return new CommonResponse("OK", usersLoggedInSuccessfully, userDetails);
        } else {
            return new CommonResponse("Failed", userNotFound, "User not authenticated");
        }
    }

    @Override
    public CommonResponse getAllUsers() {
        List<Users> users = usersRepo.findAll();
        if (users.isEmpty()) return new CommonResponse(failure, userNotFound);
        return new CommonResponse(success, usersFetched, users);
    }

    private Users findUserByHashId(String userHashId) {
        return usersRepo.findById(UUID.fromString(userHashId))
                .orElseThrow(() -> new NullPointerException(userNotFound));
    }
}
