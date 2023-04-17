import {createSlice} from '@reduxjs/toolkit';


export const machineSlice = createSlice({
    name:'machine',
    initialState:{
        machine:{
            name:null,
            typeofmachine:null,
            typeofequip:null,
            typeofop:null,
            holidays:[],
            sampledetails:[],
            billcharge1:null,
            billcharge2:null,
            billcharge3:null,
        }
    },
    reducers:{
        submit1:(state,action)=>{
            state.machine.name=action.payload.name
            state.machine.typeofmachine=action.payload.typeofmachine
            state.machine.typeofequip=action.payload.typeofequip
            state.machine.typeofop=action.payload.typeofop
            state.machine.billcharge1=action.payload.billcharge1
            state.machine.billcharge2=action.payload.billcharge2
            state.machine.billcharge3=action.payload.billcharge3
        },
        submit2:(state,action)=>{
            state.machine.sampledetails=action.payload
        },
        submit3:(state,action)=>{
            state.machine.holidays=action.payload
        },
        submit:(state)=>{
            state.machine={
                name:null,
                typeofmachine:null,
                typeofequip:null,
                typeofop:null,
                holidays:[],
                sampledetails:[],
                billcharge1:null,
                billcharge2:null,
                billcharge3:null,
            }
        },
    },
});

export const {submit,submit1,submit2,submit3,getmachine} = machineSlice.actions;