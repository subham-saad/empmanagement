import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EmployeeByEdit = ({ onUpdate, onClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employeeName: '',
    location: '',
    email: '',
  });

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/employeemangement/getemployee/${id}`);
        const employeeData = await response.json();
        setFormData((prevData) => ({
          ...prevData,
          ...employeeData
        }));
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };
  
    fetchEmployeeData();
  }, [id]);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/employeemangement/updateemployeeinfo/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onUpdate(formData);
        navigate('/');
        onClose();
      } else {
        console.error('Error updating employee:', response.status);
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div className='p-6 m-2'>
      <input
        type="text"
        placeholder="Employee Name"
        name="employeeName"
        value={formData.employeeName}
        onChange={handleInputChange}
        className="border border-gray-400 rounded-md p-2 mb-4 w-full"
      />
      <input
        type="text"
        placeholder="Location"
        name="location"
        value={formData.location}
        onChange={handleInputChange}
        className="border border-gray-400 rounded-md p-2 mb-4 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        className="border border-gray-400 rounded-md p-2 mb-4 w-full"
      />
      <button
        onClick={handleUpdate}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Update Employee Info
      </button>
    </div>
  );
};

EmployeeByEdit.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EmployeeByEdit;
