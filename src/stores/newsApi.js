import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const API_KEY = "1a449fb5ec2c4d0cadbcb8dc32e0b93e";
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

export const getNewsApi = createAsyncThunk('newsApi/getNews', async () => {
    const res = await axios.get(API_URL);
    return res.data;
});

export const searchNewsApi = createAsyncThunk('newsApi/searchNews', async (params) => {
    const res = await axios.get(API_URL, { params });
    return res.data;
});

export const selectNewsApi = state => state.newsApi.data;

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
            .addCase(searchNewsApi.fulfilled, (state, action) => {
                state.data = action.payload
            })
    }
});

export default newApislice.reducer;
