import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import ApplyForMachineCard from "../components/ApplyforMachineCard";

const ApplyForMachinePg1 = () => {
    const [machines, setMachines] = useState([]);
    // login user data
    const getUserData = async () => {
        try {
            const res = await axios.post(
                "/api/v1/user/getuniquetypes",
                {},
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("token"),
                    },
                }
            );
            if (res.data.success) {
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
            <h1 className="text-center">Machines</h1>
            <div className="text-center pt-5">
                <h5 className="pb-3">Type of Machine</h5>
                <div className="card-box">
                    <div>
                        {machines.map((machinetypes) => (
                            <ApplyForMachineCard machineType={machinetypes} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ApplyForMachinePg1;
