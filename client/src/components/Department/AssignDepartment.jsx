import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AssignDepartmentForm = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [departmentName, setDepartmentName] = useState('');
  const [message, setMessage] = useState('');
  const navigate =  useNavigate()
  const handleAssignDepartment = async () => {
    try {
      const accessToken = localStorage.getItem('user-info');
      const response = await fetch('http://localhost:8000/api/v1/employeemangement/assignderpartment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ employeeName, departmentName }),
      });
      const responseData = await response.json();

      setMessage(responseData.message);
      navigate(`/populatedep`)
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2 className='m-2 p-4'>Assign Department to Employee</h2>
      <input
        className='mx-2 px-4 my-2'
        type="text"
        placeholder="Employee Name"
        value={employeeName}
        onChange={(e) => setEmployeeName(e.target.value)}
      />
      <input
        className='mx-2 px-4 my-2'
        type="text"
        placeholder="Department Name"
        value={departmentName}
        onChange={(e) => setDepartmentName(e.target.value)}
      />
      <button className='px-4 mx-2 my-2 bg-slate-400' onClick={handleAssignDepartment}>Assign Department</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AssignDepartmentForm;

