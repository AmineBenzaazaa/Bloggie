import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = () => {
    const item = localStorage.getItem('user');
    return item ? JSON.parse(item) : {}
}

export const authenticate = createAsyncThunk('auth/login', async (data) => {
    const res = await axios.post('http://localhost:8000/api/login', data);
    console.log('res: ',res);
    if (res && res.status === 200) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        return res.data.user
    }
})

export const register = createAsyncThunk('auth/register', async (data) => {
    const res = await axios.post('http://localhost:8000/api/register', data);
    if(res && res.status === 200) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        return res.data.user;
    }
})

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: initialState()
    },
    extraReducers: builder => {
        builder
            .addCase(authenticate.fulfilled, (state, action) => {
                state.user = action.payload;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
            })
    }
})

export default authSlice.reducer;