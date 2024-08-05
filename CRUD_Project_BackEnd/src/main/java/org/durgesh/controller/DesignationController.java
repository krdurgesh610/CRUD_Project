package org.durgesh.controller;

import java.util.List;

import org.durgesh.entity.Designation;
import org.durgesh.service.DesignationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/designations")
@CrossOrigin("*")
public class DesignationController {
	@Autowired
	private DesignationService designationService;

	@PostMapping
	public Designation saveDesignation(@RequestBody Designation designation) {
		return designationService.saveDesignation(designation);
	}

	@PutMapping
	public Designation updateDesignation(@PathVariable Long id, @RequestBody Designation designation) {
		return designationService.updateDesignation(id, designation);
	}

	@GetMapping
	public List<Designation> listOfDesignations() {
		return designationService.listOfDesignations();
	}

	@GetMapping("/{id}")
	public Designation findDesignationById(@PathVariable Long id) {
		return designationService.findDesignationById(id);
	}

	@DeleteMapping("/{id}")
	public void deleteDesignation(@PathVariable Long id) {
		designationService.deleteDesignation(id);
	}

}
