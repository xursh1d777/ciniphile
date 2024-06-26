import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


export const getData = createAsyncThunk("getData", async (path) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_DB_TOKEN}`
        }
    };
    const data = await fetch(`https://api.themoviedb.org/3/${path}?language=ru-Ru`, options)
    return data.json()
})


const initialState = {
    upcomingMovies: null,
    upcomingSeries: null,
    popularMovies: null,
    popularSeries: null,
    rating: null,
    searchResult: null,
    detailMovie:null, 
    detailSerie:null, 
    castsMovie:null, 
    castsSerie:null, 
    recommendMovie:null, 
    recommendSerie:null, 
    videoMovie:null, 
    videoSerie:null
}

const dataSlice = createSlice({
    name: "data",
    initialState: initialState,
    extraReducers: (builder) => {
        builder.addCase(getData.fulfilled, (state, action) => {
            const path = action.meta.arg
            console.log(path);
            if (path.includes('movie/upcoming')) {
                state.upcomingMovies = action.payload
            } else if (path.includes('movie/popular')) {
                state.popularMovies = action.payload
            } else if (path.includes('tv/popular')) {
                state.popularSeries = action.payload
            } else if (path.includes('tv/airing_today')) {
                state.upcomingSeries = action.payload
            } else if (path.includes('movie/top_rated')) {
                state.rating = action.payload
            } else if (path.includes('search/multi')) {
                state.searchResult = action.payload
            } else if (path.match(/movie\/\d+$/)) {
                state.detailMovie = action.payload
            } else if (path.match(/tv\/\d+$/)) {
                state.detailSerie = action.payload
            } else if (path.match(/movie\/\d+\/credits$/)) {
                state.castsMovie = action.payload
            } else if (path.match(/tv\/\d+\/credits$/)) {
                state.castsSerie = action.payload
            } else if (path.match(/movie\/\d+\/recommendations$/)) {
                state.recommendMovie = action.payload
            } else if (path.match(/tv\/\d+\/recommendations$/)) {
                state.recommendSerie = action.payload
            } else if (path.match(/movie\/\d+\/videos$/)) {
                state.videoMovie = action.payload
            } else if (path.match(/tv\/\d+\/videos$/)) {
                state.videoSerie = action.payload
            }
        })
    }
})

export default dataSlice.reducer