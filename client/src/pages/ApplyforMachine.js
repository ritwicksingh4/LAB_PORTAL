import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import DisplayCard from "../components/Card";
import {Row} from 'antd'
import ControllerCard from "../components/ControllerCard";
import ApplyforMachineCard from "../components/ApplyforMachineCard";

const ApplyforMachine = () => {
  const [machines,setMachines] = useState([]);
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getAllMachines",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if(res.data.success){
        setMachines(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      <h1 className="text-center">Select a Machine</h1>
      <Row>
        {machines && machines.map((machine) => <ApplyforMachineCard machine={machine} />)}
      </Row>
    </Layout>
  );
};

export default ApplyforMachine;