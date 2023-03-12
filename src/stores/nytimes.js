import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios';

const API_KEY = "BP1mkKaljvlMZvA48fAJbznAvO9AecUG"
const API_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=&api-key=${API_KEY}`;

export const getNytNews = createAsyncThunk('nyTimes/getNews', async () => {
    const res = await axios.get(API_URL);
    return res.data;
})

export const searchNyTimes = createAsyncThunk('nyTimes/searchNews', async (param) => {
    console.log('param', param)
    const res = await axios.get(API_KEY);
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
    }
})

export default nytApislice.reducer;