import React from 'react'
import { Form, Input,message } from 'antd'
import axios from 'axios'
import '../styles/Registerstyles.css'
import { Link,useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { showLoading , hideLoading } from '../redux/features/alertSlice'

const Register = () => {

const navigate = useNavigate();
const dispatch = useDispatch();
const logo = process.env.PUBLIC_URL + "/iitp_logo.png";

  //form handler
  const onFinishHandler=async(values)=>{
    // console.log(values)
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/register',values);
      dispatch(hideLoading());

      // if(res.data.success){
      //   message.success('Registered Successfully!');
      //   navigate('/login');
      // }else{
      //   message.error(res.data.message);
      // }

      // for direct login after registering
      
      if(res.data.success){
        localStorage.setItem('token',res.data.token);
        message.success('Registered and Logged in Successfully');
        navigate('/');
      }else{
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error('Something went wrong');
    }
  }

  return (
      <>
          <div className="form-container">
              <Form
                  layout="vertical"
                  onFinish={onFinishHandler}
                  className="register-form"
              >
                  <div className="logo-container">
                      <img
                          src={logo}
                          alt="logo"
                          className="logo"
                          style={{ height: "150px" }}
                      />
                      <h3 className="logo-heading">
                          Indian Institute of Technology Patna
                      </h3>
                  </div>
                  <br></br>
                  <h3 className="text-center">Register Form</h3>
                  <Form.Item label="Name" name="name">
                      <Input type="text" required />
                  </Form.Item>
                  <Form.Item label="Email" name="email">
                      <Input type="email" required />
                  </Form.Item>
                  <Form.Item label="Password" name="password">
                      <Input type="password" required />
                  </Form.Item>

                  <Link to="/login" className="m-2">
                      Already a user? Login here.
                  </Link>

                  <button className="btn btn-primary" type="submit">
                      Register
                  </button>
              </Form>
          </div>
      </>
  );
}

export default Register