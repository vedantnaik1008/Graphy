import { ref,  onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from '../FirebaseConfig';

const useSideBar = () => {
    const [tabsData, setTabsData] = useState([]);
    const [loading, setLoading] = useState(false);
    // console.log(tabsData[0]?.tabs[0].name);

    useEffect(() => {
        const tabsRef = ref(database, 'Tabs'); // Use database from FirebaseConfig

        const unsubscribe = onValue(
            tabsRef,
            (snapshot) => {
                setLoading(false); // Set loading to false once data is received
                if (snapshot.exists()) {
                    setTabsData(snapshot.val());
                } else {
                    console.log('No data available');
                }
            },
            (error) => {
                console.error('Error fetching data:', error);
                setLoading(false); // Stop loading on error
            }
        );

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    if (loading)
        return (
            <p className='text-5xl text-black w-[90%] flex justify-center items-center md:left-[40%] mx-auto h-[80dvh] align-middle'>
                Loading
            </p>
        );

    const tabsArray = tabsData[0]?.tabs
        ?.map((tab) => {
            return tab.sub?.map((subItem) => `${tab.name} ${subItem.name}`);
        })
        .flat();
    // console.log(tabsArray);
    const tabsArrayUrl = tabsData[0]?.tabs
        ?.map((tab) => {
            return tab.sub?.map((subItem) => `${tab.name}/${subItem.name}`);
        })
        .flat();
    return { tabsData, setTabsData, loading, tabsArray, tabsArrayUrl };
};

export default useSideBar;
