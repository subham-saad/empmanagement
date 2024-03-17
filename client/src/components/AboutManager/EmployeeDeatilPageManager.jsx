import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function EmployeeDeatilPageManager({ isLogedIn }) {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    async function fetchEmployeeDetails() {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/employeemangement/getemployee/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch employee details');
        }
        const data = await response.json();
     
        const populatedEmployee = await populateEmployeeDepartment(data);
        setEmployee(populatedEmployee);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    }

    async function populateEmployeeDepartment(employeeData) {
      try {
        if (!employeeData.department) {
          throw new Error('Department ID is missing');
        }
        const departmentResponse = await fetch(`http://localhost:8000/api/v1/employeemangement/getdepartment/${employeeData.department}`);
        if (!departmentResponse.ok) {
          throw new Error('Failed to fetch department details');
        }
        const departmentData = await departmentResponse.json();
       
        const populatedEmployee = { ...employeeData, department: departmentData.name };
        return populatedEmployee;
      } catch (error) {
        console.error('Error populating department information:', error);
     
        return employeeData;
      }
    }

    fetchEmployeeDetails();
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-center font-bold text-3xl py-4">Employee Details</h1>
      <div className="max-w-lg mx-auto border border-gray-300 rounded-md p-4">
        <div className="mb-4">
          <strong>Name:</strong> {employee.employeeName}
        </div>
        <div className="mb-4">
          <strong>Email:</strong> {employee.email}
        </div>
        <div className="mb-4">
          <strong>Designation:</strong> {employee.designation}
        </div>
        <div className="mb-4">
          <strong>Location:</strong> {employee.location}
        </div>
        <div className="mb-4">
        <strong>Department:</strong> 
        {employee.departments.map((departments, id) => (
              <span key={id}>{departments.name}</span>
            ))}
        </div>
        <Link to={`/edit/${id}`}>
          <button className="font-bold bg-red-600 p-2 text-white rounded-lg text-md">Edit employee info</button>
        </Link>
        <Link to={`/assign`}>
          <button className="font-bold bg-red-600 p-2 text-white rounded-lg text-md">Assign department</button>
        </Link>
      </div>
    </div>
  );
}

export default EmployeeDeatilPageManager;
