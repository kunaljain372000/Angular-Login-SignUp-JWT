package com.tns.jwtoken.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tns.jwtoken.entites.User;
import com.tns.jwtoken.service.UserService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/home")
public class HomeController {

	@Autowired	
	private UserService userService;
	
	@GetMapping("/users")
	public List<User> getUser() {
		System.out.println("Getting User");
		return userService.getUsers();
	}
	
	@GetMapping("/current-user")
	public String getLoggedInUser(Principal principal) 
	{
		return 	principal.getName();
	}
}
