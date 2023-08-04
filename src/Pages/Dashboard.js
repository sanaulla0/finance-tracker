import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Cards from '../Components/Cards';

import AddExpense from '../Components/Modals/AddExpense';
import AddIncome from '../Components/Modals/AddIncome';
import { addDoc, collection ,query ,getDocs } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db } from '../firebase';
import TransactionTable from '../Components/TransactionTable';
import Chart from '../Charts';
import EmptyCards from './EmptyCards';



const Dashboard = () => {

const [user] = useAuthState(auth);

  const[isExpensiveModalVisible , setIsExpensiveModalVisible] = useState(false);
  const[isIncomeModalVisible , setIsIncomeModalVisible] = useState(false);
 const [income,setIncome] = useState(0);
 const[expense,setExpense] = useState(0);
 const[totalbalance,setTotalbalance] = useState(0);


  const [transaction , setTransaction] = useState([]);
  const[loading , setLoading] = useState(false);
  

  const showExpenseModal = () => {
    setIsExpensiveModalVisible(true);
  };

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpensiveModalVisible(false);
  };
  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };

  const onFinish = (values,type) => {
        const newTransaction = {
             type : type,
             date : values.date.format("YYYY-MM-DD"),
             amount : parseFloat(values.amount),
             tag : values.tag,
             name : values.name,
        };
        addTransaction(newTransaction);
  }
                                                            
  async function addTransaction(transaction,many){
            try{
                    const docRef = await addDoc(
                         collection(db,`users/${user.uid}/transaction`),
                         transaction

                    );
                    console.log("Document written with ID:", docRef.id);
                   if(!many) toast.success("Transaction Added");
                    fetchTransaction();
            }
            catch (e) {
              console.error("Error adding document: ", e);
              if(!many) toast.error("couldn't add transaction");
            }
           
  }
  
   
           async  function fetchTransaction(){
            setLoading(true);
            if (user){

            const q = query(collection(db, `users/${user.uid}/transaction`));
            const querySnapshot = await getDocs(q);
            let transactionsArray = [];
            console.log("querysnapshot",querySnapshot);
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              transactionsArray.push(doc.data());
                      console.log("check doc",doc.data);
            });
            setTransaction(transactionsArray);
            console.log("transaction array",transactionsArray);
            toast.success("Transactions Fetched");
          
            
          }else{
            console.log("user is not there");
            
          }
          setLoading(false);
        }
        useEffect(()=>{
          console.log("started fetching data");
          fetchTransaction();
      },[user]);
      

useEffect(()=>{
          calculateBalance();
},[transaction])

        const calculateBalance = () => {
                    let incomeTotal  = 0;
                    let expenseTotal = 0;
transaction.forEach((transaction) => {
  const amount = parseFloat(transaction.amount);
    if (!isNaN(amount)) {
           if(transaction.type==="Income"){
                  incomeTotal += transaction.amount;
           }
           else{
                 expenseTotal += transaction.amount;
           }
          }
});
           setIncome(incomeTotal);
           setExpense(expenseTotal);
           setTotalbalance(incomeTotal - expenseTotal);

        }
        let sortedTransaction = transaction.sort((a,b) => {
                      return new Date(a.date) - new Date(b.date);
        })

        


                            
  return (
    <div><Header/>  
    {loading ? ( <p>loading...</p> ) : (
    <>
         <h2 style={{textAlign:"center",fontSize: "2rem" }}>Welcome!</h2>
    <Cards income={income} expense={expense} totalbalance={totalbalance} showExpenseModal={showExpenseModal} showIncomeModal={showIncomeModal} />
    {transaction.length!=0 ? <Chart sortedTransaction={sortedTransaction} /> : <EmptyCards />   } 
<AddExpense 
      isExpensiveModalVisible={isExpensiveModalVisible}
      handleExpenseCancel={handleExpenseCancel}
      onFinish={onFinish}
/>

 <AddIncome 
          isIncomeModalVisible={isIncomeModalVisible}
          handleIncomeCancel={handleIncomeCancel}
          onFinish={onFinish}
 />
       <TransactionTable transaction={transaction} addTransaction={addTransaction} fetchTransaction={fetchTransaction} />
</>
)
   
}
    </div>


  );
}

export default Dashboard;


