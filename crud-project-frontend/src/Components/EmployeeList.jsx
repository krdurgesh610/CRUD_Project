import axios from "axios";
import React, { useEffect, useState } from "react";
import EmployeeForm from "./EmployeeForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8080/employees");
      setEmployees(response.data);
    } catch (error) {
      toast.error("Failed to fetch employees.");
    }
  };

  const editEmployeeHandler = (employee) => {
    setEditEmployee(employee);
  };

  const deleteEmployeeHandler = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:8080/employees/${employeeId}`);
      setEmployees(employees.filter((employee) => employee.id !== employeeId));
      toast.success("Employee deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete employee.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">List Of Employees</h1>
      <table className="table custom-table">
        <thead>
          <tr>
            <th className="col-name">Employee Name</th>
            <th className="col-dob">Date Of Birth</th>
            <th className="col-salary">Salary</th>
            <th className="col-email">Email</th>
            <th className="col-gender">Gender</th>
            <th className="col-designation">Designation</th>
            <th className="col-actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="col-name">{employee.empName}</td>
              <td className="col-dob">{employee.dateOfBirth}</td>
              <td className="col-salary">{employee.salary}</td>
              <td className="col-email">{employee.email}</td>
              <td className="col-gender">{employee.gender}</td>
              <td className="col-designation">{employee.designation}</td>
              <td className="col-actions">
                <button
                  className="btn btn-primary btn-sm mr-2"
                  onClick={() => editEmployeeHandler(employee)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteEmployeeHandler(employee.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EmployeeForm employee={editEmployee} refEmployee={getEmployees} />
      <ToastContainer />
    </div>
  );
}

export default EmployeeList;

// ============================================================

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import EmployeeForm from "./EmployeeForm";

// function EmployeeList() {
//   const [employees, setEmployees] = useState([]);

//   const [editEmployees, setEditEmployees] = useState(null);

//   useEffect(() => {
//     getEmployees();
//   }, []);

//   const getEmployees = async () => {
//     const response = await axios.get("http://localhost:8080/employees");
//     setEmployees(response.data);
//   };

//   const editEmployee = (employee) => {
//     setEditEmployees(employee);
//   };

//   const deleteHandle = async (employeeId) => {
//     await axios.delete(`http://localhost:8080/employees/${employeeId}`);
//     setEmployees(employees.filter((employee) => employee.id !== employeeId));
//   };

//   return (
//     <div>
//       <h1>List Of Employees</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Employee Name</th>
//             <th>Date Of Birth</th>
//             <th>Salary</th>
//             <th>Email</th>
//             <th>Gender</th>
//             <th>Designation</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((employee) => (
//             <tr key={employee.id}>
//               <td>{employee.empName}</td>
//               <td>{employee.dateOfBirth}</td>
//               <td>{employee.salary}</td>
//               <td>{employee.email}</td>
//               <td>{employee.gender}</td>
//               <td>{employee.designation}</td>
//               <td>
//                 <button onClick={() => editEmployee(employee)}>Edit</button>
//               </td>
//               <td>
//                 <button onClick={() => deleteHandle(employee.id)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <EmployeeForm employee={editEmployees} refEmployee={getEmployees} />
//     </div>
//   );
// }

// export default EmployeeList;

// ======================================================================================
