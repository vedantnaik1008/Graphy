import { useEffect, useState } from 'react';
import { getUserData } from '../data/PostData';
import { auth } from '../FirebaseConfig';

const useUserData = () => {
    const [userData, setUserData] = useState(null);

    let user = auth.currentUser?.uid;
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
