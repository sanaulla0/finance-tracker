import React, { useEffect } from 'react';
import './styles.css';
import { auth } from '../../firebase';                            
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from "firebase/auth";
                         
import Pics from '../Pics';

const Header = () => {

const [user, loading] = useAuthState(auth);
const navigate = useNavigate();
                                                                                  
  useEffect(()=>{
          if(user){
             navigate("/Dashboard");
            console.log("finduser",user);
          }
  },[user,loading]);

function logoutfun(){
   try{
    signOut(auth).then(() => {
      // Sign-out successful.
      toast.success("Logout Successfully");
    
      navigate('/');
    }).catch((error) => {
      // An error happened.
             toast.error('error');
    });
   }
   catch(e){
          toast.error(e.message);
   }
}
                                                                     
  return (
    <div className='nav'>
      <p className='logo'>Financely.</p>
    {user && (
       
      <div style={{display:"flex",alignItems:"center",gap:"0.5rem"}}>
        
     {user.photoURL ?  <img  src= { user.photoURL}  style={{borderRadius:"50%",height:"2rem", width:'2rem',gap:"0.2rem"}} /> 
     
                : <Pics />
    }
       
  <p className='logo link' onClick={logoutfun}>Logout</p>
  </div>
  
    )}
    
</div>
  )
}

export default Header;