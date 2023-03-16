import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

// const API_KEY = "ce61700748ef44f1b65b33edda644947";
const _API_KEY = "d829784382484100b1822ac7c2136136";
// const API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`
// const API_URL = `https://newsapi.org/v2/top-headlines/sources?apiKey=${API_KEY}`
const API_URL = `https://newsapi.org/v2/everything?apiKey=${_API_KEY}`

export const getNewsApi = createAsyncThunk('newsApi/getNews', async (page = 0) => {
    const res = await axios.get(`https://newsapi.org/v2/top-headlines?apiKey=${_API_KEY}&pageSize=10&page=${page}&category=general`);
    if (res && res.status === 200) {
        return res.data.articles;
    }
});

export const searchNewsApi = createAsyncThunk('newsApi/searchNews', async ({ param, page }) => {
    const res = await axios.get(API_URL + `&pageSize=10&page=${page}&q=${param}`);
    if (res && res.status === 200) {
        return res.data?.articles;
    }
});

export const filterNewsApi = createAsyncThunk('newsApi/filterNews', async ({ q, category }) => {
    let builder = '';
    if (q) builder += `&q=${q}`;
    if (category) builder += `&category=${category}`;
    console.log(builder)
    const res = await axios.get(`https://newsapi.org/v2/top-headlines/sources?apiKey=${_API_KEY}${builder}`);
    console.log('response', res)
    if (res && res.status === 200) {
        return res.data.sources;
    }
})

export const newApislice = createSlice({
    name: "newsApi",
    initialState: {
        data: [],
        filteredData: [],
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
            .addCase(filterNewsApi.fulfilled, (state, action) => {
                state.filteredData = action.payload
            })
    }
});

export default newApislice.reducer;
