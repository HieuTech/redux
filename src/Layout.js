import { Routes,Route } from 'react-router-dom';
import App from './App';
import User from './components/Users/user';
import Admin from './components/Admin/admin';
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import Dashboard from './components/Admin/Content/Dashboard';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Layout = (props)=>{
    return(
        <>
             <Routes>
        <Route path="/" element={<App />} >
          <Route index element={<HomePage/>}/>
        <Route path="/users" element={<User />} />
        </Route>

        <Route path="/admin" element={<Admin />}>
          <Route index element={<Dashboard/>}/>
        <Route path="manage-users/" element={<ManageUser/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>

      <ToastContainer 
           position= "top-center"/>
        </>
        
    )
}

export default Layout
