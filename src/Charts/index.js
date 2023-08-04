import React from 'react';
import { Line , Pie } from '@ant-design/charts';
 


function Chart({sortedTransaction}) {


        const data = sortedTransaction.map((item)=>{
                      return {date :item.date, amount : item.amount };
        })
 const spendingData = sortedTransaction.filter((item)=>{
          if(item.type == "expense"){
                   return { tag: item.tag , amount: item.amount };
         } 
 })

const config = {
 data : data,
 width : 500,
 autoFit: true,
 xField: 'date',
 yField: 'amount',

};
const spendingConfig = {
 data:  Object.values(spendingData),
 width: 500,
 angleField : "amount",
 colorField : "tag",

};

let chart;
let pieChart;

  return (
    <div className='charts-wrapper'>
     <div>
     <h2 style={{marginTop: 0}} >Your Analytics</h2>
     <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
     </div>
    <div>
     <h2 style={{marginTop: 0}}>Your Spendings</h2>
    <Pie {...spendingConfig} onReady ={(chartInstance) => (pieChart = chartInstance ) } />
   
   </div>
    </div>
  )
}

export default Chart;