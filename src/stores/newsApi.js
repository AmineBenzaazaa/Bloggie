import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const API_KEY = "ce61700748ef44f1b65b33edda644947";
const API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
// const API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`
// const API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`
// https://newsapi.org/v2/everything?q=Apple&from=2023-03-11&sortBy=popularity&apiKey=API_KEY

export const getNewsApi = createAsyncThunk('newsApi/getNews', async () => {
    const res = await axios.get(API_URL);
    console.log('res in store', res)
    return res.data;
})

export const searchNewsApi = createAsyncThunk('newsApi/searchNews', async (params) => {
    console.log('params', params)
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