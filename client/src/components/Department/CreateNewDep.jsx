import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateNewDep() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/v1/employeemangement/createdepartment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('user-info')}`,
        },
        body: JSON.stringify({
          name,
          description
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setErrorMessage('');

    } catch (error) {
      console.error(error.message);
      setErrorMessage('Failed to create department. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create New Department</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Create Department</button>
      </form>
    </div>
  );
}

export default CreateNewDep;
