import React from 'react'
import profile from '../../assets/3135715.png';

function Pics() {
  return (
   
    <div>
           <img src={profile}   alt='image' style={{borderRadius:"50%",height:"2rem", width:'2rem',gap:"0.2rem"}} 
                  /> 
       </div>
  )
}

export default Pics;