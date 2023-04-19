import React from "react";
import { useNavigate } from "react-router-dom";

const EditMachineCard = ({ machine }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="card m-2"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/controller/editmachine/${machine._id}`)}
      >
        <div className="card-header">
          {machine.name.toUpperCase()}
        </div>
        <div className="card-body">
          <p>
            <b>Type of Machine :</b> {machine.typeofmachine}
          </p>
          <p>
            <b>Type of Equipment :</b> {machine.typeofequip}
          </p>
          <p>
            <b>Type of Operation :</b> {machine.typeofop}
          </p>
        </div>
      </div>
    </>
  );
};

export default EditMachineCard;
