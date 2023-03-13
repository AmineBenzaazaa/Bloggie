import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

<<<<<<< HEAD
const API_KEY = "ce61700748ef44f1b65b33edda644947";
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
// const API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`
// const API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`
// https://newsapi.org/v2/everything?q=Apple&from=2023-03-11&sortBy=popularity&apiKey=API_KEY
=======
const API_KEY = "1a449fb5ec2c4d0cadbcb8dc32e0b93e";
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
>>>>>>> be270ac3c68a0409f1db9117a67225ae86f9a6f4

export const getNewsApi = createAsyncThunk('newsApi/getNews', async () => {
    const res = await axios.get(API_URL);
    console.log('res in store', res)
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
