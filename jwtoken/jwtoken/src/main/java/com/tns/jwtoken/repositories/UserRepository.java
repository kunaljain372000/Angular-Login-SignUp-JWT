package com.tns.jwtoken.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tns.jwtoken.entites.User;

public interface  UserRepository extends JpaRepository<User,String>{

	public Optional<User> findByEmail(String email);

	
	
	
}
