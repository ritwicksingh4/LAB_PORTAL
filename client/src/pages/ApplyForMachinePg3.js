import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import SmallCardOperation from "../components/SmallCardOperation";
import { Row } from "antd";
import { useParams } from "react-router-dom";
import ApplyForMachineCard3 from "../components/ApplyforMachineCard3";
import ApplyForMachineCard2 from "../components/ApplyforMachineCard2";

const ApplyForMachinePg3 = ({ machinetypes }) => {
    const [Equipments, setEquipments] = useState([]);

    const { machineType, equipType } = useParams();
    const getUserData = async () => {
        try {
            const res = await axios.post("/api/v1/user/getmachinesbyequip", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: {
                    type: machineType,
                    equiptype: equipType,
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
                <h5 className="pb-3">Type of Operations</h5>
                <div className="card-box">
                    {console.log(Equipments)}
                    <div>
                        {Equipments.map((machine) => (
                            <ApplyForMachineCard2
                                machineType={machineType}
                                equipType={equipType}
                                opType={machine}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ApplyForMachinePg3;
