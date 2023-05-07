import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";

const BookAppointment = () => {
    const { machineId } = useParams();
    const [machine, setMachine] = useState([]);
    const [date, setDate] = useState();
    const [fromTime, setFromTime] = useState();
    const [toTime, setToTime] = useState();
    const [isAvailable, setIsAvailable] = useState();
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    // login user data
    const getUserData = async () => {
        try {
            const res = await axios.post("/api/v1/user/getmachinebyid", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: {
                    machineId: machineId,
                    fromTime,
                    toTime,
                    date
                },
            });
            if (res.data.success) {
                setMachine(res.data.data[0]);
                // console.log(res.data.data[0])
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    const handleAvailability = async () => {
        try {
            dispatch(showLoading());
            console.log(date,fromTime,toTime)
            const res = await axios.post(
                "/api/v1/user/booking-availbility",
                { machineId: params.machineId, date, fromTime, toTime },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                setIsAvailable(true);
                console.log(isAvailable);
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }
    };

    const handleBooking = async() => {
        navigate('/applyformachine')
    }

    return (
        <Layout>
            <div className="center">
                <h3>Booking Page</h3>
            </div>
            <div className="container m-2">
                {machine && (
                    <div>
                        <h4>Machine : {machine?.name}</h4>

                        <div className="d-flex flex-column w-50">
                            <DatePicker
                                aria-required={"true"}
                                format="YYYY-MM-DD"
                                onChange={(value,timestring) => {
                                    setDate(timestring);
                                }}
                            />
                            <TimePicker
                                aria-required={"true"}
                                format="HH:mm"
                                className="mt-3"
                                onChange={(value,timestring) => {
                                    // console.log(moment(value).format("HH:mm"),"Here",timestring)
                                    setFromTime(timestring);
                                }}
                            />
                            <TimePicker
                                aria-required={"true"}
                                format="HH:mm"
                                className="mt-3"
                                onChange={(value,timestring) => {
                                    setToTime(timestring);
                                }}
                            />

                            <div className="text-center">
                                <button
                                    className="btn btn-primary mt-2"
                                    onClick={handleAvailability}
                                >
                                    Check Availability
                                </button>
                            </div>

                            <button
                                className="btn btn-primary mt-2"
                                onClick={handleBooking}
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default BookAppointment;
