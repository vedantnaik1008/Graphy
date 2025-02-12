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
    }, []); // Add userID to dependency array

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
                const data = `${tabsdata?.uniqueId}/${tab?.id}/${subItem?.id}`;
                tabsArrayData.push(data);
                return subItem?.subFolders?.map((subFolder) => {
                    const subFolderData = `${tabsdata?.uniqueId}/${tab?.id}/${subItem?.id}/${subFolder?.id}`;
                    return tabsArrayData.push(subFolderData);
                });
            });
        });
    });
    //gs://graphy-c2078.appspot.com/Books/kBziJ0rfNNMY6cwc73T3unNXwMo1/e8365572-a337-4565-8087-6e97f5e93e08/0/0/0
    let tabsArrayDataUrl = [];
    const tabsArrayUrl = tabsData?.map((tabsdata) => {
        return tabsdata?.tabs?.map((tab) => {
            return tab?.sub?.map((subItem) => {
                //`${tabsdata?.uniqueId}/${tabsdata?.title}/${tab.name}/${subItem.name}`
                const data = `${tabsdata?.uniqueId}/${tab?.id}/${subItem?.id}`;
                tabsArrayDataUrl.push(data);
                return subItem?.subFolders?.map((subFolder) => {
                    const subFolderData = `${tabsdata?.uniqueId}/${
                        tab?.id
                    }/${subItem?.id}/${subFolder?.id}`;
                    return tabsArrayDataUrl.push(subFolderData);
                });
            });
        });
    });
    const uniqueId = tabsData[0]?.uniqueId;
         console.log(
             tabsArrayData,
             uniqueId
         );
console.log(tabsArrayDataUrl, ':tabsArrayDataUrl');

    return {
        tabsData,
        setTabsData,
        loading,
        tabsArray: tabsArrayData,
        tabsArrayUrl: tabsArrayDataUrl
    };
};

export default useSideBar;
