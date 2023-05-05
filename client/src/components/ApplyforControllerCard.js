import React from "react";
import { useNavigate } from "react-router-dom";

const ApplyForControllerCard = (props) => {
    const navigate = useNavigate();
    return (
        <>
            <div
                className="card m-2"
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/applyforcontroller/${props.machineType}/`)}
            >
                <div className="card-body">
                    <h6>{props.machineType}</h6>
                </div>
            </div>
        </>
    );
};

export default ApplyForControllerCard;
