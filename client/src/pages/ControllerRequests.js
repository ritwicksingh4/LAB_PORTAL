import React, { useState, useEffect } from "react";
import axios from "axios";
import { message, Table } from "antd";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

const CtrlAdminAppointments = () => {
  const [app, setApp] = useState([]);
  const navigate = useNavigate()
  //getUsers
  const getApp = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllCtrlApps", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setApp(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApp();
  }, []);

  const onFinish = async(status,record) => {
    try {
        const appId=record._id;
        const res=await axios.post('/api/v1/admin/changectrlstatus',{appId,status})
        // setApp(res.data.data)
        message.success('status changed successfully')
        navigate('/')
    } catch (error) {
        console.log(error)
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.name}
        </span>
      ),
    },
    {
        title: "Machine",
        dataIndex: "machine",
        render: (text,record) => (
            <span>
                {record.nameofthemachine}
            </span>
        )
    },
    {
        title: "Machine Type",
        dataIndex: "machinetype",
        render: (text,record) => (
            <span>
                {record.typeofmachine}
            </span>
        )
    },
    {
        title: "Equipment Type",
        dataIndex: "equiptype",
        render: (text,record) => (
            <span>
                {record.typeofequip}
            </span>
        )
    },
    {
        title: "Operation Type",
        dataIndex: "optype",
        render: (text,record) => (
            <span>
                {record.typeofop}
            </span>
        )
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <span>
            <button
              className="btn btn-primary"
              onClick={() => onFinish('Approved',record)} //handleAccountStatus(record, "approved")
            >
              Approve
            </button>
            <button
              className="btn btn-primary"
              onClick={() => onFinish('Rejected',record)} //handleAccountStatus(record, "approved")
            >
              Reject
            </button>
            </span>
          ) : (<span>NA</span>)
          }
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-3">All Applications</h1>
      <Table columns={columns} dataSource={app} />
    </Layout>
  );
};

export default CtrlAdminAppointments;
