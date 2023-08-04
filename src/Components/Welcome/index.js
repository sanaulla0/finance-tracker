import React,{useState,useEffect} from 'react'
import SignupSignin from '../SignupSignin';
import { auth } from '../../firebase';                            
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';


function Welcome() {

 const [user, loading] = useAuthState(auth);
 const navigate = useNavigate();
                                                                                  
  useEffect(()=>{
          if(user){
             navigate("/Dashboard");
          }
  },[user,loading]);

 
  return (
    <div>
            
      </div>
  )
}

export default Welcome;