package edu.neu.csye6200.context;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class CurrentUserUtil {

    public static String getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
            if (principal instanceof UserDetails) {
                // If you are using UserDetails, you can return the username
                return ((UserDetails) principal).getUsername();
            } else {
                // This case can happen if authentication is not a UserDetails object
                return authentication.getName(); // Return the username
            }
        }
        return null;
    }

}
