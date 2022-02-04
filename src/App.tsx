import React, {useEffect, useRef, useState} from 'react';
import clsx from "clsx";
import styles from './App.module.css';
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {fetchImagesAsync, getAlbums, getImages, imageState, removeImage} from "./redux/slices/gallerySlice";
import {Checkbox, Pagination} from "@mui/material";
import removeIcon from './assets/remove.png'

function App() {

    const dispatch = useAppDispatch()

    let galleryRef = useRef<HTMLDivElement>(null)
    let modalRef = useRef<HTMLDivElement>(null)

    let [page, setPage] = useState<number>(1)
    let [pageSize, setPageSize] = useState<number>(35)
    let [album, setAlbum] = useState<number>(1)
    let [loading, setLoading] = useState<boolean>(false)
    let [ignoreAlbumFilter, setIgnoreAlbumFilter] = useState<boolean>(false)
    let [modalStatus, toggleModal] = useState<boolean>(false)
    let [selectedImage, setSelectedImage] = useState<imageState>()

    let albums = useAppSelector(getAlbums)
    let allImages = useAppSelector(getImages)
    let currentAlbumSize = !ignoreAlbumFilter ? allImages.length : allImages.filter((image) => image.albumId === album).length
    let images = allImages.filter(item => !ignoreAlbumFilter || item.albumId  === album).filter((image, index) => ((page-1)*pageSize <= index && index < page*pageSize))

    let findPageSize = () => {
        if (galleryRef.current !== null) {
            let width = Math.floor(window.innerWidth * 0.8 / 180)
            let height = Math.floor(window.innerHeight * 0.68 / 180)
            setPageSize(height*width)
        }
    }

    let openModal = (image: imageState) => {
        setSelectedImage(image)
        setTimeout(() => toggleModal(true), 100)
    }

    let hideModal = (e: any) => {
        e.preventDefault()
        if(modalRef.current !== null) {
            if (!modalRef.current.contains(e.target) && !modalStatus) {
                toggleModal(false)
            }
        }
    }

    useEffect(() => {
        dispatch(fetchImagesAsync())
        findPageSize()
        window.addEventListener('click', hideModal)
        return function cleanup () {
            window.removeEventListener('click', hideModal)
        }
    }, [])

    useEffect(() => {
        setLoading(true)
        setTimeout(() => setLoading(false), 200)
    }, [album, page, pageSize])

    useEffect(() => {
        setPage(1)
    }, [album, ignoreAlbumFilter])
}

export default App;
