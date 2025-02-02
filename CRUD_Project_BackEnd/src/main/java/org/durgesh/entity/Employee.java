package org.durgesh.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(nullable = false)
	private String empName;
	@Column(nullable = false)
	private String dateOfBirth;
	@Column(nullable = false)
	private double salary;
	@Column(nullable = false)
	private String email;
	@Column(nullable = false)
	private String gender;

	private long designationId;
	private String designation;

}
