import { createSlice } from "@reduxjs/toolkit";

let lastId=0;
const slice = createSlice({
    name:'users',
    initialState:[],
    reducers:{
        addUser:(users,action)=>{
            users.push({
                id:++lastId,
                name:action.payload.name,
            })
        }

    }
})
const userReducer=slice.reducer
export default userReducer
export const {addUser} = slice.actions