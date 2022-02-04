import {configureStore} from "@reduxjs/toolkit";
import GalleryReducer from './slices/gallerySlice'

export const store = configureStore({
    reducer: {
        gallery: GalleryReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch