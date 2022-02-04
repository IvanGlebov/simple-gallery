import React, {useEffect, useRef, useState} from 'react';
import clsx from "clsx";
import styles from './App.module.css';
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {fetchImagesAsync, getAlbums, getImages, imageState, removeImage} from "./redux/slices/gallerySlice";
import {Checkbox, Pagination} from "@mui/material";
import removeIcon from './assets/remove.png'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
