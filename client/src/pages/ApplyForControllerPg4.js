import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import Card from "../components/Card";
import { useParams } from "react-router-dom";
import ApplyForControllerCard3 from "../components/ApplyforControllerCard3";

const ApplyForControllerPg4 = ({ machinetypes }) => {
    const [Equipments, setEquipments] = useState([]);

    const { machineType, equipType, opType } = useParams();
    const getUserData = async () => {
        try {
            const res = await axios.post("/api/v1/user/getmachinesbyop", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: {
                    type: machineType,
                    equiptype: equipType,
                    optype: opType,
                },
            });

            if (res.data.success) {
                setEquipments(res.data.data);
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
            <h1 className="text-center">Machines</h1>
            <div className="text-center pt-5">
                <div className="card-box">
                    {console.log(Equipments)}
                    <div>
                        {Equipments.map((machine) => (
                            <ApplyForControllerCard3 machine={machine} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ApplyForControllerPg4;
