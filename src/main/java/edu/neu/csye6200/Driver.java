package edu.neu.csye6200;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * 
 * @author Gokul Jayavel
 * 
 */

@SpringBootApplication
public class Driver {
	public static void main(String[] args) {
		System.out.println("============Main Execution Start===================\n\n");

         //Add your code in between these two print statements
		SpringApplication.run(Driver.class, args);
		System.out.println("http://localhost:9999/swagger-ui/index.html");
		 
		System.out.println("\n\n============Main Execution End===================");
	}

}
