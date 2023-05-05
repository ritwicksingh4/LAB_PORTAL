import React from "react";
import { useNavigate } from "react-router-dom";

const ApplyForMachineCard1 = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <div
                className="card m-2"
                style={{ cursor: "pointer" }}
                onClick={() =>
                    navigate(
                        `/applyformachine/${props.machineType}/${props.equipType}/`
                    )
                }
            >
                <div className="card-body">
                    <h6>{props.equipType}</h6>
                </div>
            </div>
        </>
    );
};

export default ApplyForMachineCard1;
