
import { Link } from 'react-router-dom';


function NavBar({isLogedIn}) {
   
  

  return (
    <nav className=" flex justify-evenly w-full  mx-2 rounded-md shadow-md shadow-blue-400 my-1 bg-gradient-to-r from-transparent via-sky-600  to-blue-200 ">
    <h3 className="font-bold font-sans text-xl mx-1 p-4 ">
      <Link style={{textDecoration:'none'}} className='' to="/">
               EmployeeManagement
      </Link>
      </h3>
      {isLogedIn ? <Link to="/login">
      <button className="font-bold relative  shadow-md shadow-violet-400  bg-gradient-to-r from-white via-slate-300  to-white p-3 my-2 text-slate-600 rounded-lg text-md">Employee Login</button>
      </Link> : <Link to="/logout">
      <button className="font-bold relative  shadow-md shadow-violet-400  bg-gradient-to-r from-indigo-300 via-pink-300  to-violet-200 p-3 my-2 text-slate-600 rounded-lg text-md">LogOut</button>
    </Link> }
      <Link to="/registeremployee" >
      <button className="font-bold mx-4 shadow-md shadow-violet-400  bg-gradient-to-r from-indigo-300 via-pink-300  to-violet-200 p-3 my-2 text-slate-600 rounded-lg text-md">Employee Registration</button>
      </Link> 
      <Link to="/registersignup" >
      <button className="font-bold mx-4 shadow-md shadow-violet-400  bg-gradient-to-r from-indigo-500 via-pink-200  to-violet-500 p-3 my-2 text-slate-600 rounded-lg text-md">Manager Registration</button>
      </Link> 
      <Link to="/managerlogin">
      <button className="font-bold relative  shadow-md shadow-violet-400  bg-gradient-to-r from-white via-slate-300  to-white p-3 my-2 text-slate-600 rounded-lg text-md">Manager Login</button>
      </Link> 
      <Link to='/createnewdep'>  <button className="font-bold relative  shadow-md shadow-violet-400  bg-gradient-to-r from-white via-slate-300  to-white p-3 my-2 text-slate-600 rounded-lg text-md">Create department</button></Link>
    </nav>
  )
}

export default NavBar