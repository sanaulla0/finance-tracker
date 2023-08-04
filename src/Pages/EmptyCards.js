import React from 'react'
import cards from '../assets/emptycard.png';

function EmptyCards() {

  return (
    <div style={{
         display : "flex",
         justifyContent: "center",
         alignItems : "center",
         width : "100vw",
         flexDirection: "column",
         marginBottom: "2rem",


    }}
    
    >
     
     <img src={cards} alt='emptytransaction' style={{height:"20rem",width:"25rem", backgroundColor:"white" }}  />

   <p style={{textAlign:"center", fontSize:"2rem", margin:"1rem" }}>No Transactions.</p>


    </div>
  )
}

export default EmptyCards;