import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function EmployeeForm({ employee, refEmployee }) {
  const [empName, setEmpName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [salary, setSalary] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [designationId, setDesignationId] = useState("");
  const [designations, setDesignations] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getDesignation();
    if (employee) {
      setEmpName(employee.empName);
      setDateOfBirth(employee.dateOfBirth);
      setSalary(employee.salary);
      setEmail(employee.email);
      setGender(employee.gender);
      setDesignationId(employee.designationId);
    }
  }, [employee]);

  const getDesignation = async () => {
    try {
      const response = await axios.get("http://localhost:8080/designations");
      setDesignations(response.data);
    } catch (error) {
      toast.error("Failed to load designations.");
    }
  };

  const validateForm = () => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const today = new Date().toISOString().split("T")[0];

    if (!empName) errors.empName = "Employee Name is required";
    if (!dateOfBirth) errors.dateOfBirth = "Date of Birth is required";
    if (dateOfBirth > today)
      errors.dateOfBirth = "Date of Birth cannot be a future date";
    if (!salary) errors.salary = "Salary is required";
    else if (isNaN(salary) || salary.length > 6)
      errors.salary = "Salary must be a number with up to 6 digits";
    if (!email) errors.email = "Email is required";
    else if (!emailPattern.test(email))
      errors.email = "Email format is invalid";
    if (!gender) errors.gender = "Gender is required";
    if (!designationId) errors.designationId = "Designation is required";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      empName,
      dateOfBirth,
      salary,
      email,
      gender,
      designationId,
    };

    try {
      if (employee && employee.id) {
        await axios.put(
          `http://localhost:8080/employees/${employee.id}`,
          payload
        );
        toast.success("Employee updated successfully!");
      } else {
        await axios.post("http://localhost:8080/employees", payload);
        toast.success("Employee added successfully!");
      }
      // Reset form fields
      setEmpName("");
      setDateOfBirth("");
      setSalary("");
      setEmail("");
      setGender("");
      setDesignationId("");
      // Refresh the employee list
      refEmployee();
    } catch (error) {
      toast.error("Error saving employee data.");
    }
  };

  return (
    <div className="container mt-4">
      <h1>{employee ? "Edit Employee" : "Add Employee"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Employee Name</label>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              className={`form-control ${errors.empName ? "is-invalid" : ""}`}
              value={empName}
              onChange={(e) => setEmpName(e.target.value)}
            />
            {errors.empName && (
              <div className="invalid-feedback">{errors.empName}</div>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Date Of Birth</label>
          </div>
          <div className="col-md-9">
            <input
              type="date"
              className={`form-control ${
                errors.dateOfBirth ? "is-invalid" : ""
              }`}
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            {errors.dateOfBirth && (
              <div className="invalid-feedback">{errors.dateOfBirth}</div>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Salary</label>
          </div>
          <div className="col-md-9">
            <input
              type="text"
              className={`form-control ${errors.salary ? "is-invalid" : ""}`}
              value={salary}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,6}$/.test(value)) {
                  setSalary(value);
                }
              }}
            />
            {errors.salary && (
              <div className="invalid-feedback">{errors.salary}</div>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Email</label>
          </div>
          <div className="col-md-9">
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Gender</label>
          </div>
          <div className="col-md-9">
            <div className="d-flex">
              <div className="form-check me-3">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  className="form-check-input"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="male" className="form-check-label">
                  Male
                </label>
              </div>
              <div className="form-check me-3">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  className="form-check-input"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="female" className="form-check-label">
                  Female
                </label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="Other"
                  className="form-check-input"
                  checked={gender === "Other"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="other" className="form-check-label">
                  Other
                </label>
              </div>
            </div>
            {errors.gender && (
              <div className="text-danger">{errors.gender}</div>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Designation</label>
          </div>
          <div className="col-md-9">
            <select
              className={`form-select ${
                errors.designationId ? "is-invalid" : ""
              }`}
              value={designationId}
              onChange={(e) => setDesignationId(e.target.value)}
            >
              <option value="">Select Designation</option>
              {designations.map((designation) => (
                <option key={designation.id} value={designation.id}>
                  {designation.designation}
                </option>
              ))}
            </select>
            {errors.designationId && (
              <div className="invalid-feedback">{errors.designationId}</div>
            )}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          {employee ? "Update" : "Save"}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default EmployeeForm;
