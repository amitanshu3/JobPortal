import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        loading:false,
        user:null,
        mentor:"null"
    },
    reducers:{
        // actions
        setLoading:(state, action) => {
            state.loading = action.payload;
        },
        setUser:(state, action) => {
            state.user = action.payload;
        },
        setMentor:(state,action)=>{
           state.mentor=action.payload;
        },
    }
});
export const {setLoading, setUser,setMentor} = authSlice.actions;
export default authSlice.reducer;