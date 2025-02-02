package org.durgesh.service;

import java.util.List;

import org.durgesh.entity.Designation;
import org.durgesh.entity.Employee;
import org.durgesh.repository.DesignationRepository;
import org.durgesh.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService {
	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private DesignationRepository designationRepository;

	public Employee saveEmployee(Employee employee) {
		Designation designation = designationRepository.findById(employee.getDesignationId()).orElse(null);
		if (designation != null) {
			employee.setDesignation(designation.getDesignation());
			return employeeRepository.save(employee);
		}
		return null;
	}

	public Employee updateEmployee(Long id, Employee employee) {
		if (employeeRepository.existsById(id)) {
			Designation designation = designationRepository.findById(employee.getDesignationId()).orElse(null);
			if (designation != null) {
				employee.setDesignation(designation.getDesignation());
				employee.setId(id);
				return employeeRepository.save(employee);
			}
		}
		return null;
	}

	public List<Employee> listOfEmployees() {
		return employeeRepository.findAll();
	}

	public Employee findEmployeeById(Long id) {
		return employeeRepository.findById(id).orElse(null);
	}

	public void deleteEmployee(Long id) {
		employeeRepository.deleteById(id);
	}

}
