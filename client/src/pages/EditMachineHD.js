import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import '../styles/addmachinesd.css'
import { message} from 'antd'
import { TodoWrapper } from '../components/sampledetails/TodoWrapper'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getmachine, submit, submit3 } from '../redux/features/machineSlice'
import { showLoading , hideLoading } from '../redux/features/alertSlice'
import axios from 'axios'

const EditMachineHD = () => {
  //handle form
  const [arr,setArr] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state)=>state.machine)
  const [machine,setMachine] = useState(state.machine)
  
useEffect(()=>{
  setMachine(state.machine)
},[state])

  const handleFinish = async()=>{
    // console.log(values);
    
    var arr1=[];
    console.log(arr)
    arr.map((item)=>{
      arr1.push(item.task)
    })
    ////////// TA
    const payload = {...machine,holidays:arr1}
    console.log(payload,"line 34 pay")
    ////////
    console.log(arr1,"arr1")
    dispatch(submit3(arr1));
    console.log(arr1);
    // console.log(arr1);
    // const machine = dispatch(getmachine());
    console.log(machine,"line 37");
    //save the machine created
    // kalakari chalu

    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/editmachine',payload);
      console.log(res,"res 44")
      dispatch(hideLoading());
      
      if(res.data.success){
        message.success('Machine Edited Successfully');
        dispatch(submit());
        navigate('/');
      }else{
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(submit());
      dispatch(hideLoading());
      navigate('/editmachine');
      console.log(error);
      message.error('Something went wrong');
    }

    // kalakari khatam

    // dispatch(submit());
    // navigate('/');
  }

  return (
    <Layout>
        <h2 className='text-center'>Add The Non working days for the machine</h2>
        <TodoWrapper setArrFunc={setArr}/>
        <button onClick={handleFinish} className='btn btn-primary'>Submit</button>
    </Layout>
  )
}

export default EditMachineHD;