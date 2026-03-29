import {createSlice} from "@reduxjs/toolkit"

const reload = createSlice({
    name:"Reload",
    initialState:{
        status:false
    },
    reducers:{
        reloadPage:(state)=>{state.status = true},
        finishedReloadPage:(state)=>{state.status = false}
    }
})

export const {reloadPage, finishedReloadPage} = reload.actions