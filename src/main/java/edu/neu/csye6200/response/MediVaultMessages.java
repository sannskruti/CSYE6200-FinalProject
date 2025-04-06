package edu.neu.csye6200.response;

public class MediVaultMessages {
    public static final String success = "SUCCESS";
    public static final String successful = "_SUCCESSFUL";

    public static final String failure = "FAILURE";
    public static final String user = "USER";
    public static final String customer = "CUSTOMER";
    public static final String order = "ORDER";
    public static final String medicine = "MEDICINE";
    public static final String underScore = "_";
    public static final String created = underScore+"CREATED";
    public static final String fetched = underScore+"DATA_FETCHED";
    public static final String notFound = underScore+"NOT_FOUND";
    public static final String successfully = underScore+"SUCCESSFULLY";
    public static final String alreadyExists = underScore+"ALREADY_EXISTS";
    public static final String customerAlreadyExists = customer+alreadyExists;
    public static final String userAlreadyExists = user+alreadyExists;
    public static final String medicineAlreadyExists = medicine+alreadyExists;
    public static final String login = "_LOGIN";
    public static final String plural = "'S";
    public static final String orderCreated = order+created+successfully;
    public static final String userCreated = user+created+successfully;
    public static final String medicineCreated = medicine+created+successfully;
    public static final String customerCreated = customer+created+successfully;
    public static final String customerNotFound = customer+notFound;
    public static final String medicineNotFound = medicine+notFound;
    public static final String userNotFound = user+notFound;
    public static final String customersFetched = customer+plural+fetched+successfully;
    public static final String medicinesFetched = medicine+plural+fetched+successfully;
    public static final String ordersFetched = order+plural+fetched+successfully;
    public static final String usersFetched = user+plural+fetched+successfully;
    public static final String usersLoggedInSuccessfully = user+login+successful;
}
