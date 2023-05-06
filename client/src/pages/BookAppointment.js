import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
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
                },
            });
            if (res.data.success) {
                setMachine(res.data.data);
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

    return (
        <Layout>
            <div className="center">
                <h3>Booking Page</h3>
            </div>
            <div className="container m-2">
                {machine && (
                    <div>
                        <h4>Machine : {machine.name}</h4>
                        <h4>Fees : {machine.fees}</h4>

                        <div className="d-flex flex-column w-50">
                            <DatePicker
                                aria-required={"true"}
                                format="DD-MM-YYYY"
                                onChange={(value) => {
                                    setDate(moment(value).format("DD-MM-YYYY"));
                                }}
                            />
                            <TimePicker
                                aria-required={"true"}
                                format="HH:mm"
                                className="mt-3"
                                onChange={(value) => {
                                    setFromTime(moment(value).format("HH:mm"));
                                }}
                            />
                            <TimePicker
                                aria-required={"true"}
                                format="HH:mm"
                                className="mt-3"
                                onChange={(value) => {
                                    setToTime(moment(value).format("HH:mm"));
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
                                // onClick={handleBooking}
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
