import React from 'react';
import './styles.css';
import { Card, Row } from 'antd';
import Button from '../Button';


function Cards({showExpenseModal,showIncomeModal,income,expense,totalbalance}) {
  return (
    <div>


  <Row className='my-row'>
      <Card title="Current Balance" bordered={true} className='my-card' >
      <p>₹{totalbalance}</p>
      <Button text="Reset Balance" blue={true} />
      </Card> 
      
      <Card title="Total Income" className='my-card' >
      <p>₹{income}</p>
      <Button text="Add Income" blue={true}  onClick={showIncomeModal} />
      </Card>
      
      <Card title="Add Expenses" className='my-card' >
      <p>₹{expense}</p>
      <Button text="Add Expenses" blue={true} onClick={showExpenseModal} />
      </Card>
      
  </Row>

    </div>
  )
}

export default Cards;