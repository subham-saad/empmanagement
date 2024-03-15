/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function EmployeeDetailsPage({isLogedIn}) {
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
        // const { admin } = data.data;
        // const empployeeId = admin._id

        setEmployee(data);
      } catch (error) {
        console.error('Error fetching employee details:', error);
      }
    }

    fetchEmployeeDetails();
  }, [id]); // Ensure useEffect re-runs when the `id` changes

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
          <strong>Designation:</strong> {employee.designnation}
        </div>
        <div className="mb-4">
          <strong>Location:</strong> {employee.location}
        </div>
       {isLogedIn ? <Link to="/login">
      <button className="font-bold bg-red-600 p-2 text-white rounded-lg text-md">LogOut</button>
      </Link> : null}
      <Link to={`/edit/${id}`}><button className="font-bold bg-red-600 p-2 text-white rounded-lg text-md">Edit your detail</button> </Link>
      </div>
    </div>
  );
}

export default EmployeeDetailsPage;
