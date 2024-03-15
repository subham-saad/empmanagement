
import { Link } from 'react-router-dom';


function NavBar() {
   
    const isLogedIn = true;

  return (
    <nav className=" flex justify-between w-full  mx-2 rounded-md shadow-md shadow-blue-400 my-1 bg-gradient-to-r from-transparent via-sky-600  to-blue-200 ">
    <h3 className="font-bold font-sans text-xl mx-4 p-4 ">
      <Link style={{textDecoration:'none'}} className='' to="/">
               EmployeeManagement
      </Link>
      </h3>
      {isLogedIn ? <Link to="/login">
      <button className="font-bold relative left-48 shadow-md shadow-violet-400  bg-gradient-to-r from-white via-slate-300  to-white p-3 my-2 text-slate-600 rounded-lg text-md">Login</button>
      </Link> : <Link to="/logout">
      <button className="font-bold relative left-48 shadow-md shadow-violet-400  bg-gradient-to-r from-indigo-300 via-pink-300  to-violet-200 p-3 my-2 text-slate-600 rounded-lg text-md">LogOut</button>
    </Link> }
      <Link to="/registeremployee" >
      <button className="font-bold mx-4 shadow-md shadow-violet-400  bg-gradient-to-r from-indigo-300 via-pink-300  to-violet-200 p-3 my-2 text-slate-600 rounded-lg text-md">Employee Registration</button>
      </Link> 
    </nav>
  )
}

export default NavBar