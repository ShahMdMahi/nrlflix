import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bannerData: [],
    imageURL: "",
};

export const nrlflixSlice = createSlice({
    name: "nrlflix",
    initialState,
    reducers: {
        setBannerData: (state, action) => {
            state.bannerData = action.payload
        },
        setImageURL: (state, action) => {
            state.imageURL = action.payload
        }
    }
});

export const { setBannerData, setImageURL } = nrlflixSlice.actions;

export default nrlflixSlice.reducer;