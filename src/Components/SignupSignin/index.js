import React, { useState } from 'react'
import './styles.css';
import Input from '../Input';
import Button from '../Button';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword ,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from '../../firebase';
import {useLocation, useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore"; 
import { getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { provider } from '../../firebase';
import Welcome from '../Welcome';

const SignupSignin = () => {
const[name,setName] = useState("");
const[email,setEmail] = useState('');
const[password,setPassword] = useState("");
const[confirmpassword,setConfirmpassword] = useState("");
const[loading,setLoading] = useState(false);
const[loginPage,setLoginPage] = useState(true);
const navigate = useNavigate();
const[go,setGo] = useState('');



  



 function signupWithEmail() {
  setLoading(true);
         console.log("Name",name);
         console.log("mail",email);
         console.log("password",password);
         console.log("confirmpass",confirmpassword);
         setGo(name);
         console.log("check",go);
         if(name!=="" && email!=="" && password!=="" && confirmpassword!==""){
if(password===confirmpassword){
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
console.log("user=>",user);



toast.success("User Created!");

setLoading(false);
setName("");
setEmail("");
setPassword("");
setConfirmpassword("");
createdoc(user);
navigate('/Dashboard');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    
    toast.error(errorMessage);
    setLoading(false);
  });
}
else{
    toast.error("password and confirm password should be same");
    setLoading(false);
}
}
else{
  toast.error("All fields are mandatory");
  setLoading(false);
}
}
 async function createdoc(user) {
 
  if(!user) return;

const userRef = doc(db,"users",user.uid);
    const userData = await getDoc(userRef); 
  if(!userData.exists()){
try {
  const sc = await setDoc(doc(db, "users", user.uid),{
             name : user.displayName ? user.displayName : name,
             email: user.email,
             photoURL : user.photoURL ? user.photoURL : "",
              createdAt : new Date(),
  });
  console.log("doc",sc);
  
         toast.success("Doc created!");
}
catch(e){
          toast.error(e.message);
}
}
else{
  //  toast.error("user is already exist");
}
 }
function LoginWithEmail(){
  setLoading(true);
  if(email!=="" && password!=="") {
    
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    console.log("userlogin",user);
    toast.success("user logged in!");
  
    navigate('/Dashboard');
    setLoading(false);
    createdoc(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorMessage);
    setLoading(false);
  });
}
else{
   toast.error("please enter valid email or password");
   setLoading(false);
}
}

function signUpGoogle(){
  
  try{
    setLoading(true);
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      toast.success("User authenticated");
   
      setLoading(false);
      createdoc(user);
      navigate('/Dashboard');
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(errorMessage);
      setLoading(false);
    });
  }
  catch(e){
      toast.error(e.message);
      setLoading(false);
  }
  
  
}


  return (
    <>
    {loginPage ? (
    <div className='signup-wrapper'>
     <h2 className='title'>signup on <span style={{color: 'var(--theme)' }}>Financely.</span></h2>
<form>
  <Input label={"Full Name"}  state={name} setState={setName} placeholder={"enter your name"}   />
  <Input label={"Email"}  state={email} setState={setEmail} placeholder={"enter your mail"}   />
  <Input label={"Password"} type="password" state={password} setState={setPassword} placeholder={"enter your password"}   />
  <Input label={"confirm password"} type="password" state={confirmpassword} setState={setConfirmpassword} placeholder={"confirm your password"}   />

<Button disable={loading}  text={loading ? "Loading..." :"Signup using Email and Password"} onClick={signupWithEmail} />
<p style={{textAlign:"center",margin:0}}>or</p>
<Button onClick={signUpGoogle} text={loading ? "Loading..." : "Signup using Google"} blue={true} />
<p className='p-tag' onClick={()=>setLoginPage(!loginPage)} style={{textAlign:"center",margin:0}}>or Have An Acount Already ? Click Here</p>
</form>
            
    </div>
  ):(
    
    <div className='signup-wrapper'>
     <h2 className='title'>Login to <span style={{color: 'var(--theme)' }}>Financely.</span></h2>
    <Input label={"Email"}  state={email} setState={setEmail} placeholder={"enter your mail"}   />
    <Input label={"Password"} type="password" state={password} setState={setPassword} placeholder={"enter your password"}   />
    <Button disable={loading} text={loading ? "Loading..." :" Login using Email and Password"} onClick={LoginWithEmail} />
<p style={{textAlign:"center",margin:0}}>or</p>
<Button onClick={signUpGoogle} text={loading ? "Loading..." : "Login using Google"} blue={true}  />

<p className='p-tag' onClick={()=>setLoginPage(!loginPage)} style={{textAlign:"center",margin:0}}>or Don't Have An Acount ? Click Here</p>
</div>
  )
 
    }
    
    </>
    )
}

export default SignupSignin;