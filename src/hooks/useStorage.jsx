import { useEffect, useState } from 'react';
import { storage } from '../FirebaseConfig';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    listAll
} from 'firebase/storage';

const useStorage = (getUrl) => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState('');
    const [fileLinks, setFileLinks] = useState([]);
    const [loading, setLoading] = useState(false)
    const [pdf, setPdf] = useState([]);
// console.log('getUrl', getUrl);
    
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) return;

        const storageRef = ref(storage, `${getUrl}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            (error) => {
                console.error('Upload failed', error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setDownloadURL(url);
                    fetchFiles();
                });
            }
        );
    };
    const firebase = `gs://graphy-c2078.appspot.com/`;

    const fetchFiles = async () => {
        setLoading(true);
        const listRef = ref(storage, `${firebase}${getUrl}`);
        const res = await listAll(listRef);
        const urls = await Promise.all(
            res.items.map(async (item) => {
                const url = await getDownloadURL(item);
                 setPdf([item.name])
                 console.log('url', url);
                 
                return url;
            })
        );
        setFileLinks(urls);
        setLoading(false);
    };

    useEffect(() => {
        
        fetchFiles();
    }, []);
    return { progress, downloadURL, fileLinks, handleFileChange, handleUpload, loading, pdf };
};

export default useStorage;
