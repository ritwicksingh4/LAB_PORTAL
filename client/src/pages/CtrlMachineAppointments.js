import React, { useState, useEffect } from "react";
import axios from "axios";
import { message, Table } from "antd";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CtrlMachineAppointments = () => {
    const [app, setApp] = useState([]);
    const state = useSelector((state) => state.user);
    const navigate = useNavigate();

    //getUsers
    const getApp = async () => {
        try {
            const machines = state.user.machine;
            const res = await axios.post(
                "/api/v1/controller/getAllApps",
                { machines },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            if (res.data.success) {
                setApp(res.data.data);
                console.log("here");
            }
        } catch (error) {
            console.log(error);
            console.log("error");
        }
    };

    const details = async (record) => {
        // console.log(record)
        navigate(`/controller/applicationdetails/${record._id}`);
    };


    useEffect(() => {
        getApp();
    }, []);

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => <span>{record.name}</span>,
        },
        {
            title: "Machine",
            dataIndex: "machine",
            render: (text, record) => <span>{record.nameofthemachine}</span>,
        },
        {
            title: "Machine Type",
            dataIndex: "machinetype",
            render: (text, record) => <span>{record.typeofmachine}</span>,
        },
        {
            title: "Equipment Type",
            dataIndex: "equiptype",
            render: (text, record) => <span>{record.typeofequip}</span>,
        },
        {
            title: "Operation Type",
            dataIndex: "optype",
            render: (text, record) => <span>{record.typeofop}</span>,
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
                        <button
                            className="btn btn-primary"
                            onClick={() => details(record)} //handleAccountStatus(record, "approved")
                        >
                            Details
                        </button>
                    ) : (
                        <span>NA</span>
                    )}
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

export default CtrlMachineAppointments;
