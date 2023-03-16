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

// https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=fOXEojUtTzFeYG77KiwUTP0TbZ1YHzHp&q=election&fq=food&page=0
export const filterNyTimes = createAsyncThunk('ntTimes/filterNews', async ({q, category}) => {
    let builder = '';
    if (q) builder += `&q=${q}`
    if (category) builder += `&fq=${category}`
    console.log('builder', builder);
    const res = await axios.get(API_URL + builder);
    console.log('nytimes', res)
    if(res && res.status === 200) {
        return res.data.response?.docs;
    }
})

export const nytApislice = createSlice({
    name: "nyTimes",
    initialState: {
        data: [],
        filteredData: [],
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
                state.filteredData = action.payload
            })
    }
})

export default nytApislice.reducer;