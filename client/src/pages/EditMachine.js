import React, { useEffect, useState } from 'react'
import Layout from './../components/Layout'
import '../styles/addmachine.css'
import { Col, Form, Input, Row ,message} from 'antd'
import { TodoWrapper } from '../components/sampledetails/TodoWrapper'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { submit1 } from '../redux/features/machineSlice'
import axios from 'axios'

const EditMachine = () => {
  //handle form
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state)=>state.machine)
  const [mach,setMach] = useState(state.machine)
  const params = useParams()
  const machId=params.machineId;

  const getAllData = async()=>{
    try {
      // dispatch(showLoading());
      const res = await axios.post('/api/v1/user/getAllData',{machId});
      // console.log(res,"res 44")
      // dispatch(hideLoading());
      console.log(res.data.data)
      setMach(res.data.data)
      mach && console.log(mach)
    } catch (error) {
      // dispatch(submit1());
      // dispatch(hideLoading());
      // navigate('/editmachine');
      console.log(error);
      message.error('Something went wrong');
    }
  }

  useEffect(()=>{
    getAllData();
  },[])

  const handleFinish = (values)=>{
    const val = {...mach,billcharge1:(values.billcharge1 || mach.billcharge1),billcharge2:(values.billcharge2|| mach.billcharge2),billcharge3:(values.billcharge3|| mach.billcharge3)}
    console.log(val);
    dispatch(submit1(val));
    navigate('/editmachinesd');
  }

  return (
    <Layout>
        <h2 className='text-center'>Edit Machine</h2>
        <Form layout='vertical' onFinish={handleFinish} className='m-3'>
            <h5>Machine Details :</h5>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Name' name='name' >
                <Input type='text' placeholder={`${mach?.name}`} disabled={true} value={mach?.name}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Type of machine' name='typeofmachine' >
                <Input type='text' placeholder={`${mach?.typeofmachine}`} disabled={true} value={mach?.typeofmachine}/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Type of equipment' name='typeofequip' >
                <Input type='text' placeholder={`${mach?.typeofequip}`} disabled={true} value={mach?.typeofequip}/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Type of operation' name='typeofop' >
                <Input type='text' placeholder={`${mach?.typeofop}`} disabled={true} value={mach?.typeofop}/>
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
              <Form.Item label='Bill Charge 1' name='billcharge1' >
                <Input type='text' placeholder={`${mach?.billcharge1}`} value={mach?.billcharge1}/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Bill Charge 2' name='billcharge2' >
                <Input type='text' placeholder={`${mach?.billcharge2}`} value={mach?.billcharge2}/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Bill Charge3' name='billcharge3' >
                <Input type='text' placeholder={`${mach?.billcharge3}`} value={mach?.billcharge3}/>
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

export default EditMachine