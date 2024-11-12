import { useEffect, useState } from 'react';
import { getUserData } from '../data/PostData';
import { auth } from '../FirebaseConfig';
import { useParams } from 'react-router-dom';

const useUserData = () => {
    const [userData, setUserData] = useState(null);
    const { userId } = useParams()

    let user = auth.currentUser?.uid;
    useEffect(() => {
        if (user) {
            getUserData(userId).then((data) => {
                setUserData(data);
            });
        }
    }, [user]);
    
    return { userData, userID: user, setUserData };
};

export default useUserData;
