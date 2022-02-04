import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from '../store'
import { fetchImages } from "./gallerySliceAPI";


export interface imageState {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string,
    isShown: boolean
}

interface GalleryState {
    gallery: Array<imageState>,
    albums: Array<number>
}

const initialState: GalleryState = {
    gallery: [],
    albums: []
}

export const fetchImagesAsync = createAsyncThunk(
    'gallery/fetchImages',
    async () => {
        return await fetchImages()
    }
)

export const GallerySlice = createSlice({
    name: 'gallery',
    initialState,
    reducers: {
        removeImage: (state, action: PayloadAction<{id: number}>) => {
            // console.log('removeImage with id', action.payload.id)
            state.gallery = [...state.gallery.filter(item => item.id !== action.payload.id)]
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchImagesAsync.fulfilled, (state, action) => {
                action.payload.forEach((item) => {
                    if(!state.albums.includes(item.albumId))
                        state.albums = [...state.albums, item.albumId]
                })
                state.gallery = [...action.payload]
                state.gallery.forEach((item) => item.isShown = true)
            })
    }
})

export const {removeImage} = GallerySlice.actions



export const getImages = (state: RootState) => state.gallery.gallery
export const getAlbums = (state: RootState) => state.gallery.albums
export default GallerySlice.reducer