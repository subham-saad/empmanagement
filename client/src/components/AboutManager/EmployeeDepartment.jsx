/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function EmployeeCard({ employee, onDelete, employeeId }) {
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/employeemanagement/deleteemployee/${employee._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }
      const deletedPost = await response.json();
      console.log(deletedPost)
      onDelete(deletedPost)
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div className="max-w-sm rounded-md p-2 overflow-hidden shadow-lg m-4">
      <div>
      <Link to={`/employeemanage/${employee._id}`}>
        <span className=''>Name:</span> {employee.employeeName}
      </Link>
        <p className="text-gray-700 text-base"><span>Designation:</span> {employee.designation}</p>
        <p className="text-gray-700 text-base"><span>Location:</span> {employee.location}</p>
        <p className="text-gray-700 text-base"><span>Email:</span> {employee.email}</p>
        <p className="text-gray-700 text-base"><span>Department:</span> {employee.department}</p>
        <span className='flex justify-center'>
          <button className='bg-sky-500 rounded-md px-2 py-1 text-[14px] my-2' onClick={handleDelete}>Delete</button>
        </span>
      </div>
    </div>
  );
}

function EmployeeDepartment() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('asc');
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/employeemangement/getemployee?search=${searchTerm}&sortBy=${sortBy}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchEmployees();
  }, [searchTerm, sortBy]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleDeleteEmployee = (employeeId) => {
    setEmployees(employees.filter(employee => employee._id !== employeeId._id));
  };


  return (
    <div>
      <h1 className="text-center font-bold text-3xl py-4">The Employees data</h1>
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search employees"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-md px-4 py-2 mr-2"
        />
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="border border-gray-300 rounded-md px-4 py-2"
        >
          <option value="asc">Sort by Name (Asc)</option>
          <option value="desc">Sort by Name (Desc)</option>
          <option value="location_asc">Sort by Location (Asc)</option>
          <option value="location_desc">Sort by Location (Desc)</option>
        </select>
      </div>
      {error && <p>Error: {error}</p>}
      <div className="flex flex-wrap justify-center">
        {employees.map(employee => (
          <EmployeeCard key={employee._id} employeeId={employee._id} employee={employee} onDelete={handleDeleteEmployee} /> 
        ))}
      </div>
    </div>
  );
}

export default EmployeeDepartment;
