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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) return;

        const storageRef = ref(storage, `upload/${file.name}`);
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

    const fetchFiles = async () => {
        const listRef = ref(storage, `${getUrl}/`);
        const res = await listAll(listRef);
        const urls = await Promise.all(
            res.items.map(async (item) => {
                const url = await getDownloadURL(item);
                return url;
            })
        );
        setFileLinks(urls);
    };

    useEffect(() => {
        fetchFiles(); // Fetch files on component mount
    }, []);
    return { progress, downloadURL, fileLinks, handleFileChange, handleUpload };
};

export default useStorage;
