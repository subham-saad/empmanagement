import { useState } from 'react';


function EmployeeSignUp() {
    const [formData, setFormData] = useState({
        employeeName: "",
        designnation: "",
        location: "",
        email: "",
        password: "",
     
      });
      const [successMessage, setSuccessMessage] = useState('Your Registering successfully');
      const [openSnackbar, setOpenSnackbar] = useState(false);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
   
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:8000/api/v1/employeemangement/registeremployee', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
      
          const data = await response.json();
      
          setSuccessMessage(data.message);
          setOpenSnackbar(true);
        } catch (error) {
          console.error('Error creating employee:', error.message);
        }
      };


      return (
    <div className='flex justify-center items-center relative top-20'>
        <div className="p-8 w-[50rem] h-[30rem]   rounded-md shadow-md shadow-blue-400 my-6 bg-gradient-to-r from-transparent via-sky-600  to-blue-200  ">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="employeeName"
              placeholder="Employee Name"
              value={formData.employeeName}
              onChange={handleChange}
              className="border border-gray-400 rounded-md p-2 mb-4 w-full"
            />
            <input
              type="text"
              name="designnation"
              placeholder="Designation"
              value={formData.designnation}
              onChange={handleChange}
              className="border border-gray-400 rounded-md p-2 mb-4 w-full"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="border border-gray-400 rounded-md p-2 mb-4 w-full"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-400 rounded-md p-2 mb-4 w-full"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-400 rounded-md p-2 mb-4 w-full"
            />
           
           <span className='flex justify-center align-middle items-center'><button
              type="submit"
              className="bg-slate-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded"
            >
              Create Employee
            </button>
            </span> 
          </form>
    
          {openSnackbar && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4" role="alert">
              <span className="block p-0 m-0 ">{successMessage}</span>
              <button className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setOpenSnackbar(false)}>
                <svg className="fill-current h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <title>Close</title>
                  <path fillRule="evenodd" d="M14.348 14.849a1 1 0 0 1-1.414 1.414l-3.535-3.536-3.536 3.536a1 1 0 1 1-1.414-1.414l3.536-3.536-3.536-3.535a1 1 0 0 1 1.414-1.414l3.536 3.535 3.535-3.535a1 1 0 0 1 1.414 1.414l-3.535 3.535 3.535 3.536z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>
          )}
        </div>
        </div>
      );
    }

export default EmployeeSignUp