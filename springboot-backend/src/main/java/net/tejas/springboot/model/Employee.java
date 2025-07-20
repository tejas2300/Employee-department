package net.tejas.springboot.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
@Table(name = "employees")
public class Employee {
	

@Id
@Column(name = "id")
	private String id;
	
	@Column(name = "Name")
	private String Name;


	@Column(name = "email_id")
	private String emailId;

	@Column(name = "position")
	private String position;

	@Column(name = "salary")
	private long salary;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "department_id")
	@JsonIgnore
	private Department department;


	public Employee() {
	}

	public Employee(String id, String name, String emailId, String position, long salary) {
		this.id = id;
		Name = name;
		this.emailId = emailId;
		this.position = position;
		this.salary = salary;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return Name;
	}

	public void setName(String name) {
		Name = name;
	}

	public String getEmailId() {
		return emailId;
	}

	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public long getSalary() {
		return salary;
	}

	public void setSalary(long salary) {
		this.salary = salary;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}
}
