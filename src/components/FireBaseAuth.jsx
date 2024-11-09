import React, { useEffect, useState } from 'react';
import { auth } from '../FirebaseConfig';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const FirebaseAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Get the navigate function

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((newUser) => {
            setUser(newUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            console.log('Login successful:', result.user);
            navigate('/dashboard'); // Navigate to dashboard after successful login
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            console.log('Logged out successfully');
            navigate('/'); // Navigate to home page after logout
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        navigate('/')
    }

    return (
        <div className='flex gap-2 items-center'>
            {!user ? (
                <div>
                    <button onClick={loginWithGoogle}>
                        Log In with Google
                    </button>
                </div>
            ) : (
                <>
                    <img src={user.photoURL} alt='' className='' />
                    <button onClick={logout}>Log Out</button>
                </>
            )}
        </div>
    );
};

export default FirebaseAuth;
