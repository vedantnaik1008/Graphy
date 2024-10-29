import { useEffect, useState } from 'react';
import { storage } from '../FirebaseConfig';
import {
    ref,
    uploadBytesResumable,
    getDownloadURL,
    listAll,
    getMetadata
} from 'firebase/storage';

const useStorage = (getUrl) => {
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    const [downloadURL, setDownloadURL] = useState('');
    const [fileLinks, setFileLinks] = useState([]);
    // const [latestFiles, setLatestFiles] = useState([]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) return;

        const storageRef = ref(storage, `${getUrl}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        console.log('getUrl', getUrl);

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
    // const fetchLatestFiles = async () => {
    //     if (getUrl === 'hero') {
    //         const listRef = ref(storage, `${getUrl}/`);
    //         try {
    //             const res = await listAll(listRef);
    //             const filesWithMetadata = await Promise.all(
    //                 res.items.map(async (item) => {
    //                     const url = await getDownloadURL(item);
    //                     const metadata = await getMetadata(item);
    //                     return {
    //                         url,
    //                         lastModified: new Date(metadata.updated)
    //                     };
    //                 })
    //             );

    //             // Sort files by last modified date in descending order
    //             const sortedFiles = filesWithMetadata.sort(
    //                 (a, b) => b.lastModified - a.lastModified
    //             );

    //             // Limit to 5 latest files (adjust this number as needed)
    //             setLatestFiles(sortedFiles.slice(0, 1));
    //         } catch (error) {
    //             console.error('Error fetching latest files:', error);
    //         }
    //     }

        
    // };

    // useEffect(() => {
    //     fetchLatestFiles(); // Fetch latest files on component mount
    // }, []);

    const fetchFiles = async () => {
        // if(getUrl === 'hero'){
        //     return;
        // }
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
