import React from 'react'
import Header from './Components/Header'
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Signup from './Pages/Signup';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
   <> <ToastContainer /> 
<Routes>
     <Route path='/' element={<Signup/>} />
     <Route path='/Dashboard'element={<Dashboard/>} />
     </Routes>
     </>
   
  )
}

export default App;