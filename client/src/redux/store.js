import {configureStore} from '@reduxjs/toolkit'
import { alertSlice } from './features/alertSlice'
import { applyMachineSlice } from './features/applyMachineSlice';
import { machineSlice } from './features/machineSlice';
import { userSlice } from './features/userSlice';

export default configureStore({
    reducer:{
        alerts: alertSlice.reducer,
        user: userSlice.reducer,
        machine: machineSlice.reducer,
        applymachine: applyMachineSlice.reducer,
    },
});