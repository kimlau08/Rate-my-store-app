package com.rateMyStore.rateMyStoreBackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "stores")

public class Stores {


@Id
@GeneratedValue
@Column(name = "id")
private long id;

@Column(name = "name")
private String name;

@Column(name = "street")
private String street;

@Column(name = "city")
private String city;

@Column(name = "st_zip")
private String st_zip;

@Column(name = "img_lnk")
private String img_lnk;

public Stores() {
super();
}

public long getId() {
	return id;
}

public String getName() {
	return name;
}

public String getStreet() {
	return street;
}

public String getCity() {
	return city;
}

public String getSt_zip() {
	return st_zip;
}

public String getImg_lnk() {
	return img_lnk;
}

public void setImg_lnk(String img_lnk) {
	this.img_lnk = img_lnk;
}


}
