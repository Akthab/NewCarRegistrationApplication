package net.carbackend;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity 
@Table(name= "users")


public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Column(name = "brand_name")
	private String brandName;
	
	@Column(name = "vehicle_number")
	private String vehicleNumber;
	
	@Column(name = "chasis_number")
	private String chasisNumber;
	
	public User() {
	}
	
	public User(String brandName, String vehicleNumber, String chasisNumber) {
		super();		
		this.brandName = brandName;
		this.vehicleNumber = vehicleNumber;
		this.chasisNumber = chasisNumber;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getBrandName() {
		return brandName;
	}
	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}
	public String getVehicleNumber() {
		return vehicleNumber;
	}
	public void setVehicleNumber(String vehicleNumber) {
		this.vehicleNumber = vehicleNumber;
	}
	public String getChasisNumber() {
		return chasisNumber;
	}
	public void setChasisNumber(String chasisNumber) {
		this.chasisNumber = chasisNumber;
	}
	

	
}
