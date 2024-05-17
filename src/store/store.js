import { configureStore } from '@reduxjs/toolkit'
import nrlflixReducer from './nrlflixSlice';

export const store = configureStore({
    reducer: {
        nrlflixData: nrlflixReducer
    },
});