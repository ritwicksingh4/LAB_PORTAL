import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import {useParams} from "react-router-dom";

const BookAppointment = () => {
    
    const { machineId} = useParams();
    
    return (
        <Layout>
            
        </Layout>
    );
};

export default BookAppointment;
