import React from 'react'
import Layout from './../components/Layout'
import '../styles/addmachine.css'
import { Col, Form, Input, Row ,message} from 'antd'
import { TodoWrapper } from '../components/sampledetails/TodoWrapper'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import axios from 'axios'

const ApplyforControllerDetails = () => {
  //handle form
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const User = useSelector((state)=>state.user)  

  const handleFinish = async(values)=>{
    // console.log(params.machineId);
    const machId=params.machineId;
    const userID=User.user._id;
    console.log(User.user);
    const payload = {...values,machId,userID};
    console.log(payload);
    try {
        dispatch(showLoading());
        const res = await axios.post("/api/v1/user/applyforcontroller",payload)
        dispatch(hideLoading());
        message.success('Succesfully Applied for Controller')
      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
      }

    navigate('/');
  }

  return (
    <Layout>
        <h2 className='text-center'>Enter Details</h2>
        <Form layout='vertical' onFinish={handleFinish} className='m-3'>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Name' name='name' required rules={[{required:true}]}>
                <Input type='text' placeholder='Enter your name'/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Phone' name='phone' required rules={[{required:true}]}>
                <Input type='text' placeholder='Enter your phone number'/>
              </Form.Item>
            </Col>
            </Row>
            <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Designation' name='designation' required rules={[{required:true}]}>
                <Input type='text' placeholder='Enter your designation'/>
              </Form.Item>
            </Col>
            </Row>
            <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Some Other Proof' name='proof' required rules={[{required:true}]}>
                <Input type='text' placeholder='Enter proof'/>
              </Form.Item>
            </Col>
          </Row>
          <div className='d-flex justify-content-center'>
            <button className='btn btn-primary'>Apply</button>
          </div>
        </Form>
    </Layout>
  )
}

export default ApplyforControllerDetails