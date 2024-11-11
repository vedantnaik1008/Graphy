import { useEffect, useState } from 'react';
import { getUserData } from '../data/PostData';
import { auth } from '../FirebaseConfig';

const useUserData = () => {
    const [userData, setUserData] = useState(null);
    
    const userId = auth.currentUser?.uid;
    let user = userId;
    useEffect(() => {
        if (user) {
            getUserData(user).then((data) => {
                setUserData(data);
            });
        }
    }, [user]);
    
    return { userData, userID: user, setUserData };
};

export default useUserData;
