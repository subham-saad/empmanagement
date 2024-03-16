import  { useState } from 'react';

const AssignDepartmentForm = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [departmentId, setDepartmentId] = useState('');
  const [message, setMessage] = useState('');

  const handleAssignDepartment = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/employeemangement/assignderpartment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employeeId, departmentId }),
      });
      const responseData = await response.json();
      setMessage(responseData.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Assign Department to Employee</h2>
      <input
        type="text"
        placeholder="Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Department ID"
        value={departmentId}
        onChange={(e) => setDepartmentId(e.target.value)}
      />
      <button onClick={handleAssignDepartment}>Assign Department</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AssignDepartmentForm;
