import React, { useState } from 'react'
import Layout from '../components/Layout'
import '../styles/addmachinesd.css'
import { Col, Form, Input, Row } from 'antd'
import { TodoWrapper } from '../components/sampledetails/TodoWrapper'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { submit2 } from '../redux/features/machineSlice'

const AddMachineSD = () => {
  //handle form
  const [arr,setArr] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleFinish = ()=>{
    // console.log(values);
    var arr1=[];
    arr.map((item)=>{
      arr1.push(item.task)
    })
    dispatch(submit2(arr1));
    console.log(arr1);
    navigate('/addmachinehd');
  }

  return (
    <Layout>
        <h2 className='text-center'>Add Sample Details required for the machine</h2>
        <TodoWrapper setArrFunc={setArr}/>
        <button onClick={handleFinish} className='btn btn-primary'>Next</button>
    </Layout>
  )
}

export default AddMachineSD;