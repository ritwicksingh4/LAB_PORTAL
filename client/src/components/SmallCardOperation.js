import React from "react";
import { useNavigate } from "react-router-dom";

const SmallCardOperation = (props) => {
  const navigate = useNavigate();
  return (
      <>
          <div
              className="card m-2"
              style={{ cursor: "pointer" }}
              onClick={() =>
                  navigate(
                      `/machinetype/${props.machineType}/${props.equipType}/${props.opType}/`
                  )
              }
          >
              <div className="card-body">
                  <h6>{props.opType}</h6>
              </div>
          </div>
      </>
  );
};

export default SmallCardOperation;
