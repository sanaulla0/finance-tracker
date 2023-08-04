import React from 'react'
import { Button, Form, Input,Modal,DatePicker,Select } from 'antd';
const { Option } = Select;

function AddIncome(
{isIncomeModalVisible,handleIncomeCancel,onFinish}

) {
 const [form] = Form.useForm();
  return (

   <Modal style={{fontWeight:600}} open={isIncomeModalVisible}  onCancel={handleIncomeCancel} footer={null} >Income

   <Form form={form} layout='vertical' 
   onFinish={(values)=>{
      onFinish(values,"Income");
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
 message:"Please select the income date!"},
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

<Select className='select-input-2' >

<Option value="salary" >Salary</Option>
<Option value="Freelancer" >Freelancer</Option>
<Option value="investment" >Investment</Option>

</Select>


</Form.Item>

<Button type="primary" className='.btn-blue' htmlType='submit'>
        add Income
      </Button>

   </Form>


  </Modal>
  )
}

export default AddIncome