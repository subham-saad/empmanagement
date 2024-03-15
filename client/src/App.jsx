import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import EmployeeSignUp from './components/AboutEmployee/EmployeeSignUp';
import EmployeeLogin from './components/AboutEmployee/EmployeeLogin';
import AllTheEmployeeList from './components/AboutEmployee/AllTheEmployeeList';
import EmployeeDetailsPage from './components/AboutEmployee/EmployeeDetailsPage';
import EmployeeLogOut from './components/AboutEmployee/EmployeeLogout';
import EmployeeByEdit from './components/AboutEmployee/EmployeeByEdit';
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
              <Route path="/registeremployee" element={<EmployeeSignUp/>}/>
              <Route path="/login" element={<EmployeeLogin />} />
              <Route path="/logout" element={<EmployeeLogOut/>} />
              <Route path="/" element={<AllTheEmployeeList/>} />
              <Route path="/employee/:id" element={<EmployeeDetailsPage  isLogedIn={isLogedIn }/>} />
              <Route path="/edit/:id" element={<EmployeeByEdit onUpdate={handleUpdate} onClose={handleClose} />}/>
          {/*  <Route path="/" element={<BlogPost />} />
           <Route path="/logout" element={<LogOut/>} />
        <Route path="/createblog" element={<CreateBlogForm/>}/>
        <Route path="/oneblogpost" element={<OneBlogPost />} />
        */}
      </Routes>
    </Router>
  );
}

export default App;

