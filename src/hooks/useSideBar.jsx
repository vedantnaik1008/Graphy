import { ref, get } from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from '../FirebaseConfig';

const useSideBar = () => {
    const [tabsData, setTabsData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTabs = async () => {
            setLoading(true);
            const tabsRef = ref(database, 'Tabs'); // Use database from FirebaseConfig

            try {
                const snapshot = await get(tabsRef);
                if (snapshot.exists()) {
                    setTabsData(snapshot.val());
                } else {
                    console.log('No data available');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            setLoading(false);
        };

        fetchTabs();
    }, []);

    if (loading)
        return (
            <p className='text-5xl text-black w-[90%] flex justify-center items-center md:left-[40%] mx-auto h-[80dvh] align-middle'>
                Loading
            </p>
        );
    // console.log(tabsData);
    return { tabsData, setTabsData, loading };
};

export default useSideBar;
