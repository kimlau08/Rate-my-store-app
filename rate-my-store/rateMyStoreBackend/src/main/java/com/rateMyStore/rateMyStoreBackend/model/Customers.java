package com.rateMyStore.rateMyStoreBackend.model;


import javax.persistence.Column;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;



@Entity
@Table(name = "customers")
public class Customers {


@Id
@GeneratedValue
@Column(name = "id")
private long id;


@Column(name = "name")
private String name;

@Column(name = "email")
private String email;

@Column(name = "password")
private String password;

public Customers() {
super();
}

public long getId() {
	return id;
}

public String getName() {
	return name;
}

public String getEmail() {
	return email;
}

public String getPassword() {
	return password;
}


}
