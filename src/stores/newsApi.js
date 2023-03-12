import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const API_KEY = "ce61700748ef44f1b65b33edda644947";
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`

export const getNewsApi = createAsyncThunk('newsApi/getNews', async () => {
    const res = await axios.get(API_URL);
    return res.data;
})

export const newApislice = createSlice({
    name: "newsApi",
    initialState: {
        data: [],
        query: {}
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getNewsApi.fulfilled, (state, action) => {
                state.data = action.payload
            })
    }
})

export default newApislice.reducer;