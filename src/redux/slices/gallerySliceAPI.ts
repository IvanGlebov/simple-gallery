import {imageState} from "./gallerySlice";
import axios from "axios";

export const fetchImages = () => {
    console.log('fetch images')
    return new Promise<Array<imageState>>((resolve, reject) => {
        axios.get('https://jsonplaceholder.typicode.com/photos')
            .then((res) => {
                if (res.status === 200)
                    resolve(res.data)
                else
                    reject(res)
            })
            .catch((e) => {
                console.log(e)
                reject(e)
            })
    })
}