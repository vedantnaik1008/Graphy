import { ref, get } from 'firebase/database'; // Import ref and get from 'firebase/database'
import { useEffect, useState } from 'react';
import { database } from '../FirebaseConfig'; // Import database instead of app

const FileLinks = () => {
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
console.log(tabsData);

    return (
        <div className='w-full md:w-[90%] xl:w-[80%] mx-auto my-4 h-full md:mt-5'>
            <ol className='flex flex-col'>
                {tabsData && tabsData.length > 0 ? (
                    tabsData.map((tab, index) => (
                        <li key={index}>
                            <h3>{tab.name}</h3>
                            {/* Display other properties of tab as needed */}
                        </li>
                    ))
                ) : (
                    <p>No data found.</p>
                )}
            </ol>
        </div>
    );
};

export default FileLinks;
