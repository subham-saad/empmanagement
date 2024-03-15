/* eslint-disable no-undef */


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const navigate = useNavigate();
  
  const handleLogin = async () => {
    try {
    
      const response = await fetch('http://localhost:8000/api/v1/employeemangement/loginemployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
  
        }),
      });
  
      
      if (!response.ok) {
      
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      
      const data = await response.json();
      console.log(data)
    
      const { accessToken, admin } = data.data;
      console.log('Access Token:', accessToken);
 
     
    
      localStorage.setItem('user-info', accessToken);
     
     
 
      setAccessToken(accessToken);
  
      setSuccessMessage('Login successful!');
       const employeeId = admin._id;
   
      navigate(`/employee/${employeeId}`);
   
    } catch (error) {
      console.error(error.message);
  
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };
  

  const handleLogout = async () => {
    try {
 
      const response = await fetch('http://localhost:8000/api/v1/employeemangement/logoutEmployee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('user-info')}`, 
        },
        credentials: 'include', 
      });
  
      if (!response.ok) {
       
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
  

      localStorage.removeItem('user-info');

    
       window.location.href = "/login"
   
    } catch (error) {
      console.error(error.message);
    }
  };
  

  return (
    <div className='flex justify-center relative top-40'>
    <div className='bg-emerald-500 rounded-lg p-6 flex-col justify-center mx-auto '>
      <h2 className='p-4 mx-24 font-bold text-[18px]'>EmployeeLogin</h2>
      <form className='p-2 mx-16 '>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
          className='p-2 mt-2 rounded-md'
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          className='p-2 mt-2 rounded-md'
        />
        <br />
      <button className='bg-gray-500 p-3 mx-12 w-28 rounded-md mt-6' type="button" onClick={handleLogin}>
          Login
        </button> 
      

        {successMessage && <p className="text-black">{successMessage}</p>}
        {errorMessage && <p className="text-violet-900">{errorMessage}</p>}
      </form>
    </div>
    </div>
  );
}


export default EmployeeLogin