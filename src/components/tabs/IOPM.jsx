import { useEffect, useState } from 'react';
import { app } from '../../FirebaseConfig';
import { getDatabase, ref, get } from 'firebase/database';
import FileUpload from '../FileUpload';

const IOPM = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase(app);
            const dbRef = ref(db, 'Video/data/');
            const snapshot = await get(dbRef);
            if (snapshot.exists()) {
                setData(Object.values(snapshot.val()));
            } else {
                alert('error');
            }
        };
        fetchData();
    }, []);
    return (
        <section className=''>
            <iframe
                width='300'
                height='700'
                className='transition-all duration-300 ease-in-out w-full h-[50dvh] md:h-[77dvh]'
                src={`https://www.youtube.com/embed/${data[0]}`} // Adjust this based on your data structure
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen></iframe>

            <FileUpload />
        </section>
    );
};

export default IOPM;
