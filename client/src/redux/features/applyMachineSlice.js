import {createSlice} from '@reduxjs/toolkit';


export const applyMachineSlice = createSlice({
    name:'applymachine',
    initialState:{
        applymachine:{
            name:null,
            phone:null,
            designation:null,
            institution:null,
            supervisor:null,
            gst:null,
            usertype:null,
            date:null,
            from:null,
            to:null,
            sampledetails:[],
            nameofthemachine:null,
            typeofmachine:null,
            typeofequip:null,
            typeofop:null,
            userId:null
        }
    },
    reducers:{
        submitapm1:(state,action)=>{
            state.applymachine.name=action.payload.name
            state.applymachine.phone=action.payload.phone
            state.applymachine.designation=action.payload.designation
            state.applymachine.institution=action.payload.institution
            state.applymachine.supervisor=action.payload.supervisor
            state.applymachine.gst=action.payload.gst
            state.applymachine.usertype=action.payload.usertype
            state.applymachine.date=action.payload.date
            state.applymachine.from=action.payload.from
            state.applymachine.to=action.payload.to
            state.applymachine.sampledetails=action.payload.sampledetails
            state.applymachine.nameofthemachine=action.payload.nameofthemachine
            state.applymachine.typeofmachine=action.payload.typeofmachine
            state.applymachine.typeofequip=action.payload.typeofequip
            state.applymachine.typeofop=action.payload.typeofop
            state.applymachine.userId=action.payload.userId
        },
        submitapm:(state)=>{
            state.applymachine={
                name:null,
            phone:null,
            designation:null,
            institution:null,
            supervisor:null,
            gst:null,
            usertype:null,
            date:null,
            from:null,
            to:null,
            sampledetails:[],
            nameofthemachine:null,
            typeofmachine:null,
            typeofequip:null,
            typeofop:null,
            userId:null
            }
        },
    },
});

export const {submitapm,submitapm1} = applyMachineSlice.actions;