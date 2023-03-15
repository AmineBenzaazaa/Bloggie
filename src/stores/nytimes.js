import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios';

const API_KEY = "fOXEojUtTzFeYG77KiwUTP0TbZ1YHzHp"
const API_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${API_KEY}`;

export const getNytNews = createAsyncThunk('nyTimes/getNews', async (page = 0) => {
    const res = await axios.get(API_URL + `&page=${page}`);
    if(res && res.status === 200) {
        return res.data.response?.docs
    }
})

export const searchNyTimes = createAsyncThunk('nyTimes/searchNews', async ({param, page = 0}) => {
    const res = await axios.get(API_URL + `&page=${page}&q=${param}`);
    if(res && res.status === 200) {
        return res.data.response?.docs;
    }
})

export const filterNyTimes = createAsyncThunk('ntTimes/filterNews', async ({q, category}) => {
    let builder;
    if (q) builder += `&q=${q}`
    if (category) builder += `category=${category}`
    console.log(builder);
    const res = await axios.get(API_URL + builder);
    console.log(res.data);
    return res.data;
})

export const nytApislice = createSlice({
    name: "nyTimes",
    initialState: {
        data: [],
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getNytNews.fulfilled, (state, action) => {
                state.data = action.payload
            })
            .addCase(searchNyTimes.fulfilled, (state, action) => {
                state.data = action.payload
            })
            .addCase(filterNyTimes.fulfilled, (state, action) => {
                state.data = action.payload
            })
    }
})

export default nytApislice.reducer;