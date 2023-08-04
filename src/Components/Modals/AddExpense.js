import React from 'react'
import { Button,Modal, Form, Input,DatePicker,Select } from 'antd';
const { Option } = Select;
                  
function AddExpense({
isExpensiveModalVisible,
handleExpenseCancel,
onFinish,

}) {
const [form] = Form.useForm();

  return (
   <Modal style={{fontWeight :600}} open={isExpensiveModalVisible} onCancel={handleExpenseCancel} footer={null}>All Expenses
     <Form form={form} layout='vertical' 
     onFinish={(values)=>{
        onFinish(values,"expense");
        form.resetFields();
     }}
     >
<Form.Item 
style={{fontWeight:600}}
label="Name"
name='name'
rules={[
 {required:true ,
   message:"Please Input the name of the transaction!" },
]}
>

<Input type='text' className='custom-input' />

</Form.Item>
<Form.Item 
style={{fontWeight:600}}
label="Amount"
name='amount'
rules={[
 {required:true ,
   message:"Please Input the expense amount!" },
]}
>

<Input type='number' className='custom-input' />

</Form.Item>
<Form.Item 
style={{fontWeight:600}}
label="Date"
name='date'
rules={[
 {required:true ,
   message:"Please select the expense date!" },
]}
>

<DatePicker format="YYYY-MM-DD" className='custom-input' />

</Form.Item>

<Form.Item 
style={{fontWeight:600}}
label="Tag"
name='tag'
rules={[
{required:true ,
 message:"Please select a tag"},
]}
>

<Select className='select-input-2'>

<Option value="education" >Education</Option>
<Option value="clothes" >Clothes</Option>
<Option value="food" >Food</Option>

</Select>


</Form.Item>


<Button type="primary" className='.btn-blue' htmlType='submit'>
        add Expenses
      </Button>

     </Form>


    </Modal>
  )
}

export default AddExpense;