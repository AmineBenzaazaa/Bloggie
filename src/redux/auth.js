import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {
    const item = window.localStorage.getItem('user');
    return item ? JSON.parse(item) : {}
}

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: initialState()
    }
})

export default authSlice.reducer;