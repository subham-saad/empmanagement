/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';


function EmployeeCard({ employee }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <div >
  
          <span className=''>Name:</span> {employee.employeeName}
        
        <p className="text-gray-700 text-base"><span>Designation:</span> {employee.designnation}</p>
        <p className="text-gray-700 text-base"><span>Location:</span> {employee.location}</p>
        <p className="text-gray-700 text-base"><span>Email:</span> {employee.email}</p>
      </div>
    </div>
  );
}

function AllTheEmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('asc');

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

  return (
    <div>
      <h1 className="text-center font-bold text-3xl py-4">All The Employees</h1>
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
        </select>
      </div>
      <div className="flex flex-wrap justify-center">
        {employees.map(employee => (
          <EmployeeCard key={employee._id} employee={employee} />
        ))}
      </div>
    </div>
  );
}

export default AllTheEmployeeList;
