import { ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from '../FirebaseConfig';
import useUserData from './useUserData';

const useSideBar = () => {
    const [tabsData, setTabsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { userID, userId } = useUserData();

    useEffect(() => {
        const tabsRef = ref(database, `users/${userId}/course`);

        const unsubscribe = onValue(
            tabsRef,
            (snapshot) => {
                setLoading(false);
                if (snapshot.exists()) {
                    setTabsData(snapshot.val());
                } else {
                    console.log('No data available');
                }
            },
            (error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        );

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [userID]); // Add userID to dependency array

    useEffect(() => {
        // Force fetch data when component mounts
        fetchTabsData();
    }, []); // Empty dependency array means this runs only on mount

    const fetchTabsData = () => {
        setLoading(true);
        const tabsRef = ref(database, `users/${userID}/course/`);
        onValue(
            tabsRef,
            (snapshot) => {
                if (snapshot.exists()) {
                    setTabsData(snapshot.val());
                } else {
                    console.log('No data available');
                }
            },
            (error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        );
    };

    if (loading)
        return (
            <p className='text-5xl text-black w-[90%] flex justify-center items-center md:left-[40%] mx-auto h-[80dvh] align-middle'>
                Loading
            </p>
        );
    let tabsArrayData = [];
    const tabsArray = tabsData?.map((tabsdata) => {
        return tabsdata?.tabs?.map((tab) => {
            return tab?.sub?.map((subItem) => {
                const data = `${tab.name} ${subItem.name}`;
                tabsArrayData.push(data);
                return subItem?.subFolders?.map((subFolder) => {
                    const subFolderData = `${tab.name} ${subItem.name} ${subFolder.name}`;
                    return tabsArrayData.push(subFolderData);
                });
            });
        });
    });

    let tabsArrayDataUrl = [];
    const tabsArrayUrl = tabsData?.map((tabsdata) => {
        return tabsdata?.tabs?.map((tab) => {
            return tab?.sub?.map((subItem) => {
                const data = `${tabsdata?.uniqueId}/${tabsdata?.title}/${tab.name}/${subItem.name}`;
                tabsArrayDataUrl.push(data);
                return subItem?.subFolders?.map((subFolder) => {
                    const subFolderData = `${tabsdata?.uniqueId}/${tabsdata?.title}/${tab.name}/${subItem.name}/${subFolder.name}`;
                    return tabsArrayDataUrl.push(subFolderData);
                });
            });
        });
    });
const uniqueId = tabsData[0]?.uniqueId;
    console.log(tabsData, uniqueId);
    

    return {
        tabsData,
        setTabsData,
        loading,
        tabsArray: tabsArrayData,
        tabsArrayUrl: tabsArrayDataUrl
    };
};

export default useSideBar;
