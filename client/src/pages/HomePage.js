import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import SmallCard1 from "../components/SmallCard1";

const HomePage = () => {
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
                            <SmallCard1 machineType={machinetypes} />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
