package com.rateMyStore.rateMyStoreBackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "reviews")
public class Reviews {


@Id
@GeneratedValue
@Column(name = "id")
private long id;
	
@Column(name = "customer")
private long customer;

@Column(name = "store")
private long store;

@Column(name = "product")
private long product;

@Column(name = "service")
private long service;

@Column(name = "cleanliness")
private long cleanliness;

@Column(name = "overall")
private long overall;

@Column(name = "comment")
private String comment;

public Reviews() {
	super();
}

public long getId() {
	return id;
}

public void setId(long id) {
	this.id = id;
}

public long getCustomer() {
	return customer;
}

public void setCustomer(long customer) {
	this.customer = customer;
}

public long getStore() {
	return store;
}

public void setStore(long store) {
	this.store = store;
}

public long getProduct() {
	return product;
}

public void setProduct(long product) {
	this.product = product;
}

public long getService() {
	return service;
}

public void setService(long service) {
	this.service = service;
}

public long getCleanliness() {
	return cleanliness;
}

public void setCleanliness(long cleanliness) {
	this.cleanliness = cleanliness;
}

public long getOverall() {
	return overall;
}

public void setOverall(long overall) {
	this.overall = overall;
}

public String getComment() {
	return comment;
}

public void setComment(String comment) {
	this.comment = comment;
}



}
