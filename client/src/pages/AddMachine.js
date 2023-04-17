import React from 'react'
import Layout from './../components/Layout'
import '../styles/addmachine.css'
import { Col, Form, Input, Row } from 'antd'
import { TodoWrapper } from '../components/sampledetails/TodoWrapper'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { submit1 } from '../redux/features/machineSlice'

const AddMachine = () => {
  //handle form
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFinish = (values)=>{
    console.log(values);
    dispatch(submit1(values));
    navigate('/addmachinesd');
  }

  return (
    <Layout>
        <h2 className='text-center'>Add Machine</h2>
        <Form layout='vertical' onFinish={handleFinish} className='m-3'>
            <h5>Machine Details :</h5>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Name' name='name' required rules={[{required:true}]}>
                <Input type='text' placeholder='name of the machine'/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Type of machine' name='typeofmachine' required rules={[{required:true}]}>
                <Input type='text' placeholder='Type of the machine'/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Type of equipment' name='typeofequip' required rules={[{required:true}]}>
                <Input type='text' placeholder='Type of the equipment'/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Type of operation' name='typeofop' required rules={[{required:true}]}>
                <Input type='text' placeholder='Type of the operation'/>
              </Form.Item>
            </Col>
          </Row>
          {/* <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Holidays' name='holidays' required rules={[{required:true}]}>
                <Input type='text' placeholder='Add the days which will be holidays'/>
              </Form.Item>
            </Col>  
          </Row> */}
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Bill Charge 1' name='billcharge1' required rules={[{required:true}]}>
                <Input type='text' placeholder='bill charges for external user'/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Bill Charge 2' name='billcharge2' required rules={[{required:true}]}>
                <Input type='text' placeholder='bill charges for internal user'/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Bill Charge3' name='billcharge3' required rules={[{required:true}]}>
                <Input type='text' placeholder='bill charges for internal-AOH user'/>
              </Form.Item>
            </Col>
          </Row>
          {/* <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Sample Details' name='sampledetails' required rules={[{required:true}]}>
                <Input type='text' placeholder='add the fields which you want as sample details'/>
              </Form.Item>
            </Col>
              <TodoWrapper/>
          </Row> */}
          <div className='d-flex justify-content-center'>
            <button className='btn btn-primary'>Next</button>
          </div>
        </Form>
    </Layout>
  )
}

export default AddMachine