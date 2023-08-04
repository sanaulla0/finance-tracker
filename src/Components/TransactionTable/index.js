
import React, { useState } from 'react';
import './styles.css';
import { Select, Table,Radio } from 'antd';
import searchImg from "../../assets/images.jpg";
import { unparse } from 'papaparse'; 
import { parse } from 'papaparse';
import { toast } from 'react-toastify';

const { Option } = Select;

function TransactionTable({transaction,addTransaction,fetchTransacion}) {

 const [search,setSearch] = useState('');
 const [typeFilter,setTypeFilter] = useState("");
 const [sortKey,setSortKey] = useState("");
 
 
 
   const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

       let filtertransaction = transaction.filter((item) => 
      
  // item.name.toLowerCase().includes(search.toLowerCase()) && item.type.includes(typeFilter) 
  
       // Check if item.type exists and is not null or undefined before using includes()
       item.name?.toLowerCase().includes(search.toLowerCase()) && (item.type ?? '').includes(typeFilter)

      
       )
      
       console.log("ttrr",transaction);
        let sortedtransaction = filtertransaction.sort((a,b) => {
                 if(sortKey === "date"){
                       return new Date(a.date) - new Date(b.date);
                 }
                 else if(sortKey === "amount"){
                   return (a.amount -b.amount);
                 }
                 else{
                  return 0;
                 }
        })

        function exportCSV(){
          var csv = unparse({
            fields: ["name", "amount","type","tag","date"],
            data: transaction,
          });

          var blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
          var  URL = window.URL.createObjectURL(blob);
         const link = document.createElement('a');
         link.href = URL;
         link.setAttribute('download', 'transaction.csv');
         document.body.appendChild(link);
         link.click();
          document.body.removeChild(link);

        }
             
         function importFROMCSV(event){
                   event.preventDefault();
                   try{
                          parse(event.target.files[0],{
                                header : true,
                                complete : async function (results) {
                                 
                                  console.log("results",results);
                                  for(const tra of results.data){
                                     
                                    const  newTransaction = {
                                             ...tra,
                                             amount: parseFloat(tra.amount),
                                    };
                                       await addTransaction(newTransaction,true);
                                  }
                                         
                                },

                          });
                          toast.success("All transaction Added");
                           fetchTransacion();
                          event.target.files = null;
                   } catch(e){
                          toast.error(e.message);
                   }
        }


  
 return (

   <div
   style={{
     width: "97vw",
     padding: "0rem 0.5rem",
   }}
   >
   <div 
   style={{
    display :"flex",
    justifyContent : "space-between",
    gap : "1rem",
    alignItems : "center",
    marginBottom : "1rem",

   }}>
  
<div className='input-flex'>
<img src= {searchImg} style={{width:"2rem", height:"2rem", gap:"0.2rem" }} />
<input value={search} onChange={(e) => setSearch(e.target.value)}   placeholder='search from here'   /> 

</div>
<Select className='select-input'
   onChange={(value) => setTypeFilter(value)}
 
   value={typeFilter}
   placeholder="Filter"
  defaultValue=""
   allowClear
>

<Option value="">All</Option>
<Option value="expense" >Expense</Option>
<Option value="Income" >Income</Option>


</Select>

</div>
&nbsp;
<div className='my-table'>
  <div 
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems : "center",
    width: "100v",
    marginBottom: "1rem"
  }}
  >
<h2>My Transaction</h2>

<Radio.Group defaultValue="No sort" className='input-radio' value={sortKey} onChange={(e)=>setSortKey(e.target.value)} buttonStyle="solid">

      <Radio.Button value="No sort">No Sort</Radio.Button>
      <Radio.Button value="date">Sort by Date</Radio.Button>
      <Radio.Button value="amount">Sort by Amount</Radio.Button>
    </Radio.Group>
    <div 
    style={{
      display : "flex",
      justifyContent : "center",
      gap : "1rem",
      width : "400px"

    }}
    >
          <button className='btn' onClick={exportCSV} >Export to CSV</button>
          <label for="file-csv" className='btn btn-blue' >Import from CSV</label>
          <input id='file-csv' type="file" accept='.csv' required onChange={importFROMCSV} style={{display:"none"}}   />
    </div>
    </div>
   <Table dataSource={sortedtransaction}  columns={columns} />


   </div>
   </div>
 )
 
 

    
  
}

export default TransactionTable;