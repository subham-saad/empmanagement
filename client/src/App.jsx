import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import EmployeeSignUp from './components/AboutEmployee/EmployeeSignUp';
import EmployeeLogin from './components/AboutEmployee/EmployeeLogin';
import AllTheEmployeeList from './components/AboutEmployee/AllTheEmployeeList';
import EmployeeDetailsPage from './components/AboutEmployee/EmployeeDetailsPage';
import EmployeeLogOut from './components/AboutEmployee/EmployeeLogout';
import EmployeeByEdit from './components/AboutEmployee/EmployeeByEdit';
import MangerSignUp from './components/AboutManager/MangerSignUp';
import ManagerLogin from './components/AboutManager/ManagerLogin';
import EmployeeDepartment from './components/AboutManager/EmployeeDepartment';
import EmployeeDeatilPageManager from './components/AboutManager/EmployeeDeatilPageManager';
import AssignDepartmentForm from './components/Department/AssignDepartment';
import PopulateDep from './components/Department/PopulateDep';
import CreateNewDep from './components/Department/CreateNewDep';
function App() {
  const isLogedIn = true;
  const [updatedPost, setUpdatedPost] = useState(null);

  const handleUpdate = (updatedPostData) => {
     setUpdatedPost(updatedPostData);
  };

  const handleClose = () => {
    setUpdatedPost(null);
  };

  return (
    <Router>
      <NavBar  isLogedIn={isLogedIn } />
    
   <Routes>
            {/* Manager Routes */}
              <Route path="/registersignup" element={<MangerSignUp/>}/>
              <Route path="/managerlogin" element={<ManagerLogin />} />
              <Route path="/employeedepartment" element={<EmployeeDepartment />} />
              <Route path="/employeemanage/:id" element={<EmployeeDeatilPageManager />} />
              <Route path="/populatedep" element={<PopulateDep />} />
              <Route path="/assign" element={<AssignDepartmentForm />} />
              <Route path='/createnewdep' element={<CreateNewDep/>} />
            {/* employee routes */}
              <Route path="/registeremployee" element={<EmployeeSignUp/>}/>
              <Route path="/login" element={<EmployeeLogin />} />
              <Route path="/logout" element={<EmployeeLogOut/>} />
              <Route path="/" element={<AllTheEmployeeList/>} />
              <Route path="/employee/:id" element={<EmployeeDetailsPage  isLogedIn={isLogedIn }/>} />
              <Route path="/edit/:id" element={<EmployeeByEdit onUpdate={handleUpdate} onClose={handleClose} />}/>
      </Routes>
    </Router>
  );
}

export default App;

