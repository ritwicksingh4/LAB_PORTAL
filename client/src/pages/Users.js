import React, { useEffect, useState } from "react";
import axios from "axios";
import { message, Table } from "antd";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()
  //getUsers
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleClick = async(record)=>{
    try {
        const id=record._id
        const res = await axios.post("/api/v1/admin/deleteUser", {id} ,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if(res.data.success){
            message.success("User deleted Successfull")
          }else{
            message.error("Error while deleting user")
          }
    } catch (error) {
        message.error("Error while deleting user")
        console.log(error);
    }
    navigate('/')
  }

  // antD table col
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    // {
    //   title: "Doctor",
    //   dataIndex: "isDoctor",
    //   render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    // },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger" onClick={()=>handleClick(record)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-2">Users List</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default Users;
