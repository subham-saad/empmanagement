import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import EmployeeSignUp from './components/AboutEmployee/EmployeeSignUp';
import EmployeeLogin from './components/AboutEmployee/EmployeeLogin';
import AllTheEmployeeList from './components/AboutEmployee/AllTheEmployeeList';
import EmployeeDetailsPage from './components/AboutEmployee/EmployeeDetailsPage';

function App() {

  return (
    <Router>
      <NavBar />
      {/* <BlogPost /> */}
      {/* <OneBlogPost /> */}
   <Routes>
              <Route path="/registeremployee" element={<EmployeeSignUp/>}/>
              <Route path="/login" element={<EmployeeLogin />} />
              <Route path="/" element={<AllTheEmployeeList/>} />
              <Route path="/employee/:id" element={<EmployeeDetailsPage/>} />
          {/*  <Route path="/" element={<BlogPost />} />
           <Route path="/logout" element={<LogOut/>} />
        <Route path="/createblog" element={<CreateBlogForm/>}/>
        <Route path="/oneblogpost" element={<OneBlogPost />} />
        <Route path="/edit/:postId" element={<EditBlogForm onUpdate={handleUpdate} onClose={handleClose} />}/> */}
      </Routes>
    </Router>
  );
}

export default App;

