import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import SmallCard from "../components/SmallCard";
import { Row } from "antd";
import { useParams } from "react-router-dom";
import ApplyForControllerCard1 from "../components/ApplyforControllerCard1";

const ApplyForControllerPg2 = () => {
    const [Equipments, setEquipments] = useState([]);

    const { machineType } = useParams();
    const getUserData = async () => {
        try {
            const res = await axios.post("/api/v1/user/getmachinesbytype", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: {
                    type: machineType,
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
                <h5 className="pb-3">Type of Equipments</h5>
                <div className="card-box">
                    {console.log(Equipments)}
                    <div>
                        {Equipments.map((machine) => (
                            <ApplyForControllerCard1
                                machineType={machineType}
                                equipType={machine}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ApplyForControllerPg2;
