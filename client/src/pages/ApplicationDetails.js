import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {Col, Form, Input, message, Row} from 'antd'
import Layout from '../components/Layout'

const ApplicationDetails = () => {
    const [app,setApp] = useState(null)
    const params = useParams()
    const appId = params.applicationId;
    const navigate = useNavigate()
    // const [st,setSt] = useState('pending')

    const getApplication = async()=>{
        // try {
        //     console.log("here2")
        //     const res=await axios.post('/api/v1/admin/application',{appId})
        //     console.log("here3")
        //     setApp(res.data.data)
        //     console.log(app)
        // } catch (error) {
        //     console.log(error)
        // }
        console.log("23")
        try {
            const res = await axios.post("/api/v1/admin/application",{appId}, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            if (res.data.success) {
              setApp(res.data.data);
              console.log(app,"inside getApplication")
            }
          } catch (error) {
            console.log(error);
          }
    }
    console.log('38')

    useEffect(()=>{
        getApplication()
    },[])

    console.log(app,"here1")

    const onFinish = async(status)=>{
        try {
            const res=await axios.post('/api/v1/admin/changestatus',{appId,status})
            // setApp(res.data.data)
            message.success('status changed successfully')
            navigate('/')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Layout>
        {console.log(app,"here")}
            <h2 className='text-center'>Details</h2>
            <Form layout='vertical' className='m-3'>
              <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item label='Name' name='name'>
                    <Input type='text' placeholder={app?.name} disabled={true}/>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item label='Phone' name='phone'>
                    <Input type='text' placeholder={app?.phone} disabled={true}/>
                  </Form.Item>
                </Col>
                </Row>
                <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item label='Designation' name='designation' >
                    <Input type='text' placeholder={app?.designation} disabled={true}/>
                  </Form.Item>
                </Col>
                </Row>
                <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item label='Institution' name='institution' >
                    <Input type='text' placeholder={app?.institution} disabled={true}/>
                  </Form.Item>
                </Col>
                </Row>
                <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item label='Supervisor' name='supervisor' >
                    <Input type='text' placeholder={app?.supervisor} disabled={true}/>
                  </Form.Item>
                </Col>
                </Row>
                <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item label='GST registration no.' name='gst' >
                    <Input type='text' placeholder={app?.gst} disabled={true}/>
                  </Form.Item>
                </Col>
                </Row>
                <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item label='User type' name='usertype' >
                    <Input type='text' placeholder={app?.usertype} disabled={true}/>
                  </Form.Item>
                </Col>
                </Row>
                
                <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item label='Date' name='date' >
                    <Input type='text' placeholder={app?.date} disabled={true}/>
                  </Form.Item>
                </Col>
              </Row>
              <h5>Enter start and end time</h5>
              <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item label='From' name='from' >
                    <Input type='text' placeholder={app?.from} disabled={true}/>
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item label='To' name='to' >
                    <Input type='text' placeholder={app?.to} disabled={true}/>
                  </Form.Item>
                </Col>
              </Row>
              <h5>Sample details</h5>
              {/* {console.log("here:",sd)} */}
              {
                app?.sampledetails.map((item)=>{
                  {/* console.log("1") */}
                  return (
                    <Row gutter={20}>
                      <Col xs={24} md={24} lg={8}>
                        <Form.Item label={item.ind} name={item.ind}>
                          <Input type='text' placeholder={`${item.val}`} disabled={true}/>
                        </Form.Item>
                      </Col>
                    </Row>
                  )
                })
              }
              <div className='d-flex justify-content-center'>
              {/* {setSt('approved')} */}
                <button className='btn btn-primary' onClick={()=>onFinish('approved')}>Approve</button>
              </div>
              <div className='d-flex justify-content-center'>
              {/* {setSt('rejected')} */}
                <button className='btn btn-primary' onClick={()=>onFinish('rejected')}>Reject</button>
              </div>
            </Form>
        </Layout>
      )
}

export default ApplicationDetails