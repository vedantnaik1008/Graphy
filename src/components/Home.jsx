import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import UseRole from "../hooks/UseRole";
import { postUserData } from "../data/PostData";
import { useState } from "react";


const Home = () => {
    // const navigate = useNavigate();
    const [createClick, setCreateClick] = useState(false)
    // const { userId } = useParams()
    const [iframeCode, setIframeCode] = useState('');
    const {student, teacher, role} = UseRole()
    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const { email, uid } = result.user;

            // Post user data to Firebase Realtime Database
            await postUserData(email, uid, role);
            const iframeSrc = `https://books30.vercel.app/dashboard/${uid}`;
            const iframeTag = `<iframe src="${iframeSrc}" width="100%" height="100dvh""></iframe>`;
            setIframeCode(iframeTag); // Navigate to dashboard after successful login
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    
    
    return (
        <section className='flex gap-4 items-center   h-screen text-white'>
            <div className='w-[90%] mx-auto flex flex-col gap-4 justify-center items-center'>
                {role.length > 0 && iframeCode.length <= 0 && (
                   <button
                        className='px-8 py-2 rounded-lg bg-blue-500'
                        onClick={loginWithGoogle}>
                        Log In with Google
                    </button>
                )}
                <div className='flex gap-4 items-center'>
                    {!createClick && (
                        <button
                            onClick={() => {
                                teacher();
                                setCreateClick((prev) => !prev);
                            }}
                            className='px-8 py-2 rounded-lg bg-blue-500'>
                            Create Your Own Website
                        </button>
                    )}
                </div>
                {iframeCode && (
                    <div className='mt-6 p-4 bg-gray-800 rounded-lg text-sm'>
                        <p className='mb-2 text-blue-400'>
                            Copy this iframe code and integrate this website in your website.
                        </p>
                        <code className='bg-gray-900 p-4 rounded-lg block text-left overflow-x-auto'>
                            {iframeCode}
                        </code>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Home;
