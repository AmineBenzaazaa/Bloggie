import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const API_KEY = "d4941de0-89b4-4401-829b-615f7779f497";
const _API_KEY = "580cb5a0-00b2-4a04-8997-5c623f1cfbbe"
const API_URL = `https://content.guardianapis.com/search?api-key=${_API_KEY}`;

export const getGuardianNews = createAsyncThunk('guardian/getNews', async (page = 1) => {
    const res = await axios.get(API_URL + `&page=${page}`);
    if (res && res.status === 200) {
        return res.data.response?.results;
    }
})

export const searchGuardian = createAsyncThunk('guardian/searchNews', async ({ param, page = 0 }) => {
    const res = await axios.get(API_URL + `&page=${page}&q=${param}`);
    if (res && res.status === 200)
        return res.data.response?.results;
})

export const filterGuardian = createAsyncThunk('guardian/filterNews', async ({ q, category }) => {
    let builder;
    if (q) builder += `&q=${q}`
    if (category) builder += `category=${category}`
    console.log(builder);
    const res = await axios.get(API_URL + builder);
    console.log(res.data)
    return res.data;
})

export const guardianSlice = createSlice({
    name: "guardianNews",
    initialState: {
        data: [],
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getGuardianNews.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(searchGuardian.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(filterGuardian.fulfilled, (state, action) => {
                state.data = action.payload
            })
    }
})

export default guardianSlice.reducer;