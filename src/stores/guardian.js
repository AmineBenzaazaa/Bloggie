import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const API_KEY = "580cb5a0-00b2-4a04-8997-5c623f1cfbbe";
const API_URL = "https://content.guardianapis.com/search?api-key=580cb5a0-00b2-4a04-8997-5c623f1cfbbe";

export const getGuardianNews = createAsyncThunk('guardian/getNews', async () => {
    const res = await axios.get(API_URL);
    return res.data;
})

export const guardianSlice = createSlice({
    name: "guardianNews",
    initialState: {
        data: [],
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getGuardianNews.fulfilled, (state, action) => {
            state.data = action.payload;
        })
    }
})

export default guardianSlice.reducer;