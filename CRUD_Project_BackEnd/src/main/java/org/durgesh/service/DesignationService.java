package org.durgesh.service;

import java.util.List;

import org.durgesh.entity.Designation;
import org.durgesh.repository.DesignationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DesignationService {
	@Autowired
	private DesignationRepository designationRepository;

	public Designation saveDesignation(Designation designation) {
		return designationRepository.save(designation);
	}

	public Designation updateDesignation(Long id, Designation designation) {
		if (designationRepository.existsById(id)) {
			designation.setId(id);
			return designationRepository.save(designation);
		}
		return null;
	}

	public List<Designation> listOfDesignations() {
		return designationRepository.findAll();
	}

	public Designation findDesignationById(Long id) {
		return designationRepository.findById(id).orElse(null);
	}

	public void deleteDesignation(Long id) {
		designationRepository.deleteById(id);
	}

}
