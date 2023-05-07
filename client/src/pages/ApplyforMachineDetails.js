import React, { useEffect, useState } from 'react'
import Layout from './../components/Layout'
import '../styles/addmachine.css'
import { Col, Form, Input, message, Row } from 'antd'
import { TodoWrapper } from '../components/sampledetails/TodoWrapper'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import axios from 'axios'
import { submitapm1 } from '../redux/features/applyMachineSlice'

const ApplyforMachineDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const User = useSelector((state)=>state.user)  
  const [sd,setsd] = useState([]);
  // var sd = [];

  const machId = params.machineId
  console.log(machId)

  const getSampleDetails = async()=>{
    try {
      const payload={machId}
      // dispatch(showLoading());
      const res = await axios.post("/api/v1/user/getsampledetails",payload)
      // dispatch(hideLoading());
      // sd=res.data.sds;
      setsd(res.data.sds)
      // console.log(sd);
      // setsd(res.sds)
    } catch (error) {
      // dispatch(hideLoading());
      console.log(error);
    }
  }

  
  useEffect(()=>{
    getSampleDetails();
  },[])

  const handleFinish = async(values)=>{
    // console.log(params.machineId);

    const machId=params.machineId;

    const userID=User.user._id;
    // console.log(User.user);
    const payload = {...values,machId,userID};
    // console.log(payload);
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/applyforsd",payload)
      dispatch(hideLoading());
      // console.log(res.data.data)
      dispatch(submitapm1(res.data.data));
      // message.success('Succesfully Applied for Machine')
      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
      }
      
    navigate(`/payment/${machId}`);
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
              <Form.Item label='Institution' name='institution' required rules={[{required:true}]}>
                <Input type='text' placeholder='Enter the name of your institution/industry'/>
              </Form.Item>
            </Col>
            </Row>
            <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Supervisor' name='supervisor' required rules={[{required:true}]}>
                <Input type='text' placeholder='Enter the name of your supervisor'/>
              </Form.Item>
            </Col>
            </Row>
            <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='GST registration no.' name='gst' required rules={[{required:true}]}>
                <Input type='text' placeholder='Enter the GST registration no. of your institution/industry'/>
              </Form.Item>
            </Col>
            </Row>
            <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='User type' name='usertype' required rules={[{required:true}]}>
                <Input type='text' placeholder='User Type'/>
              </Form.Item>
            </Col>
            </Row>
            
            <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Date' name='date' required rules={[{required:true}]}>
                <Input type='text' placeholder='Enter date'/>
              </Form.Item>
            </Col>
          </Row>
          <h5>Enter start and end time</h5>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='From' name='from' required rules={[{required:true}]}>
                <Input type='text' placeholder='Enter start time'/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='To' name='to' required rules={[{required:true}]}>
                <Input type='text' placeholder='Enter end time'/>
              </Form.Item>
            </Col>
          </Row>
          <h5>Enter sample details</h5>
          {/* {console.log("here:",sd)} */}
          {
            sd.map((item)=>{
              {/* console.log("1") */}
              return (
                <Row gutter={20}>
                  <Col xs={24} md={24} lg={8}>
                    <Form.Item label={item} name={item} required rules={[{required:true}]}>
                      <Input type='text' placeholder={`Enter ${item}`}/>
                    </Form.Item>
                  </Col>
                </Row>
              )
            })
          }
          <div className='d-flex justify-content-center'>
            <button className='btn btn-primary'>Next</button>
          </div>
        </Form>
    </Layout>
  )
}

export default ApplyforMachineDetails