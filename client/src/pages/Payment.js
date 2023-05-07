import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout";
import "../styles/addmachine.css";
import { Col, Form, Input, Row, message, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { submitapm } from "../redux/features/applyMachineSlice";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import FileBase64 from "react-file-base64";

const Payment = () => {
    //handle form
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const applymachine = useSelector((state) => state.applymachine);
    const [applym, setapplym] = useState(applymachine.applymachine);
    const [pr, setpr] = useState(0);
    const [hr, sethr] = useState(0);
    const [gt, setgt] = useState(0);
    const [tpr, settpr] = useState(0);
    const [file, setFile] = useState(null); // State variable to store the uploaded file

    const machId = params.machineId;
    console.log(machId);

    const getBillAmount = async () => {
        try {
            const utype = applym.usertype;
            const payload = { machId, utype };
            const res = await axios.post("/api/v1/user/getbillamount", payload);
            sethr(applym.to - applym.from);
            setpr(res.data.sds * hr);
            setgt(0.18 * pr);
            settpr(gt + pr);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBillAmount();
    }, []);

    const handleFinish = async (values) => {
        const payload = { ...applym, machineId: machId, photo: file};
        try {
            dispatch(showLoading());
            const res = await axios.post(
                "/api/v1/user/applymachine",
                payload
            );
            dispatch(hideLoading());
            message.success("Successfully Applied for Machine");
            dispatch(submitapm());
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
        }

        navigate("/");
    };

    return (
        <Layout>
            <h2 className="text-center">Payment</h2>
            <Form layout="vertical" onFinish={handleFinish} className="m-3">
                <h5>Bill :</h5>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Total Usage Hpurs" name="hours">
                            <Input
                                type="text"
                                placeholder={hr}
                                disabled={true}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Total Price" name="price">
                            <Input
                                type="text"
                                placeholder={pr}
                                disabled={true}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="18% GST" name="gst">
                            <Input
                                type="text"
                                placeholder={gt}
                                disabled={true}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Total" name="total">
                            <Input
                                type="text"
                                placeholder={tpr}
                                disabled={true}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <h4>Payment Link : link</h4>
                <Row>
                    <Col>
                        <Form.Item
                            label="Upload payment screenshot"
                            name="screenshot"
                        >
                            <FileBase64
                                multiple={false}
                                onDone={(base64)=>{
                                  setFile(base64);
                                }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <div className="d-flex justify-content-center">
                    <button className="btn btn-primary">Apply</button>
                </div>
            </Form>
        </Layout>
    );
};

export default Payment;
