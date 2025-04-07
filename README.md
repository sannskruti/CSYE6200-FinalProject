# CSYE6200-FinalProject



<!-- [![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/1MZiuvVq)
# Welcome to the course CSYE6200 - Concepts Of OOD
> Northeastern University, College of Engineering


## Professor: Daniel Peters

### Requirements
1. Eclipse or VS Code or IntelliJ.

Note: If you are using Eclipse, please have git CLI installed on your system or GitHub Desktop to commit the code in this repository

### SetUp Instructions
1. Please clone the repository on your local system
2. For Eclipse Import the project as Existing Maven Project, For IntelliJ you can directlty open it using 'Get from VCS'.
4. All code should be pushed to the main branch
3. Ensure the GitHub actions are successful post push

Submissions will have deadlines, failed GitHub Actions would result in point deductions.

### References
1. Cloning a Repository: <https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository>
2. Any GitHub Setup: Please refer to the Git & GitHub Fundamentals Repository shared to you by your respective TA and refer the README.md section

Please reach out to your respective TA if you need any help in regards with submission/ GitHub

Author:
- Gokul Jayavel (jayavel.g@northeastern.edu)
- Siddharth Dumbre (dumbre.si@northeastern.edu)
- Vamsi Naradasu (naradasu.v@northeastern.edu) -->
# Pharmacy Management System

This project is a web application developed for a pharmacy company to streamline the management of pharmacists, customers, and billing medicines. The application consists of a backend developed in Java and a frontend built using React with TypeScript.

## Features
- Pharmacists can create an account by signing up.
- Pharmacists can add customers under their profile.
- Medicines can be billed for a specific customer under the pharmacist's account.

## Project Structure
- **Backend**: Implemented using Java. The entry point is `driver.java`.
- **Frontend**: Implemented using React and TypeScript. The code is located in the `react/medivault` folder.

## Prerequisites
Before running the project, ensure you have the following installed:
- **Java Development Kit (JDK)**: Version 8 or higher.
- **Node.js**: Version 14 or higher (ensure `npm` is installed as well).

## Setup and Execution

### Backend
1. Navigate to the folder containing `driver.java`.
2. Compile and run the `driver.java` file:
   ```sh
   javac driver.java
   java driver
   ```

### Frontend
1. Navigate to the `react/medivault` folder:
   ```sh
   cd react/medivault
   ```
2. Install the required dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   This will start the frontend and make it accessible at a local development URL.

## Usage
1. Run the backend by following the steps in the [Backend](#backend) section.
2. Start the frontend as described in the [Frontend](#frontend) section.
3. Open your browser and navigate to the frontend URL.
4. Sign up as a pharmacist to create your account.
5. Add customers under your account and manage their details.
6. Bill medicines for customers by adding the required items under their profiles.

## Technologies Used
- **Backend**: Java
- **Frontend**: React with TypeScript

## Contributing
If you wish to contribute to this project, feel free to submit pull requests or report issues.

## License
This project is licensed under [MIT License](LICENSE).

