import React, { useEffect, useState } from 'react'
import Layout from './../components/Layout'
import '../styles/addmachine.css'
import { Col, Form, Input, Row , message , Button ,Upload} from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import { TodoWrapper } from '../components/sampledetails/TodoWrapper'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { submit1 } from '../redux/features/machineSlice'
import { submitapm } from '../redux/features/applyMachineSlice'
import axios from 'axios'
import { hideLoading, showLoading } from '../redux/features/alertSlice'

const Payment = () => {
  //handle form
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const User = useSelector((state)=>state.user)
  const applymachine = useSelector((state)=>state.applymachine)
  const [applym,setapplym] = useState(applymachine.applymachine)  
  const [pr,setpr] = useState(0);
  const [hr,sethr] = useState(0);
  const [gt,setgt] = useState(0);
  const [tpr,settpr] = useState(0);
  // var sd = [];

  const machId = params.machineId
  console.log(machId)

  const getBillAmount = async()=>{
    try {
      const utype = applym.usertype;
      const payload={machId,utype}
      // dispatch(showLoading());
      const res = await axios.post("/api/v1/user/getbillamount",payload)
      // dispatch(hideLoading());
      // sd=res.data.sds;
      sethr(applym.to-applym.from)
      setpr(res.data.sds*(hr))
      setgt(0.18*pr)
      settpr(gt+pr)
      // console.log(sd);
      // setsd(res.sds)
    } catch (error) {
      // dispatch(hideLoading());
      console.log(error);
    }
  }

  
  useEffect(()=>{
    getBillAmount();
  },[])

  const handleFinish = async(values)=>{
    // console.log(params.machineId);

    // const machId=params.machineId;

    // const userID=User.user._id;
    // console.log(User.user);
    const payload = {...applym,machineId:machId};
    // console.log(payload);
    try {
        dispatch(showLoading());
        const res = await axios.post("/api/v1/user/applyformachine",payload)
        dispatch(hideLoading());
        message.success('Succesfully Applied for Machine')
        dispatch(submitapm())
      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
      }

    navigate('/');
    // props.history.push({ 
    //   pathname: '/payment',
    //   state: payload
    //  });
  }

  return (
    <Layout>
        <h2 className='text-center'>Payment</h2>
        <Form layout='vertical' onFinish={handleFinish} className='m-3'>
            <h5>Bill :</h5>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Total Usage Hpurs' name='hours' >
                <Input type='text' placeholder={hr} disabled={true}/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Total Price' name='price' >
                <Input type='text' placeholder={pr} disabled={true}/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='18% GST' name='gst' >
                <Input type='text' placeholder={gt} disabled={true}/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label='Total' name='total'>
                <Input type='text' placeholder={tpr} disabled={true}/>
              </Form.Item>
            </Col>
          </Row>

          <h4>Payment Link : link</h4>
          <Row>
          <Col><Upload {...{name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
          }}}>
    <Button icon={<UploadOutlined />}>Upload payment screenshot</Button>
  </Upload></Col>
        </Row>
          <div className='d-flex justify-content-center'>
            <button className='btn btn-primary'>Apply</button>
          </div>
        </Form>
    </Layout>
  )
}

export default Payment