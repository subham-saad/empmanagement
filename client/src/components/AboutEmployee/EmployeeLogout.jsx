import { useState } from 'react'

function EmployeeLogOut({ token }) {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // const handleLogout = async () => {
    //     try {
    //       const response = await fetch('http://localhost:8000/api/v1/creator/logout', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         credentials: 'include', // include cookies in the request
    //       });
          
      
        
      
    //       if (!response.ok) {
    //         const errorData = await response.json();
    //         throw new Error(errorData.message);
    //       }
      
    //       // Display success message
    //       setSuccessMessage('Logout successful!');
      
    //       // Redirect to another page or update state accordingly
    //     } catch (error) {
    //       console.error(error.message);
      
    //       // Display error message
    //       setErrorMessage('Logout failed. Please try again.');
    //     }
    //   };
      
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
    <div>
         <button className='bg-red-500 p-3 mx-10 w-28 rounded-md mt-6' type="button" onClick={handleLogout}>
          Logout
        </button>
    </div>
  )
}

export default EmployeeLogOut