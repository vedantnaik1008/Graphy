/* eslint-disable react/prop-types */
import  { useEffect, useState } from 'react';
import { auth } from '../FirebaseConfig';
import {  signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import {  removeUserData } from '../data/PostData';

const FirebaseAuth = ({userId}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Get the navigate function
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((newUser) => {
            setUser(newUser);
            setLoading(false);
            if (newUser) {
                if (newUser.uid === userId) {
                    navigate(`/dashboard/${userId}`);
                } else {
                    navigate('/');
                }
            } else {
                navigate('/');
            }
        });

        return () => unsubscribe();
    }, [userId, navigate]);

    

    const logout = async () => {
        try {
            await signOut(auth);
            console.log('Logged out successfully');

            // const userId = auth.currentUser?.uid;
            // if (userId) {
            //     await removeUserData(userId);
            // }
            navigate('/'); // Navigate to home page after logout
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        navigate('/');
    }
    console.log(user);
    

   

    return (
        <div className='flex gap-2 items-center'>
            {!user ? null : (
                <>
                    <img src={user.photoURL} alt='' className='rounded-full h-10 w-10' />
                    <button onClick={logout}>Log Out</button>
                </>
            )}
        </div>
    );
};

export default FirebaseAuth;
