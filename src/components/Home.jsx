import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import UseRole from "../hooks/UseRole";
import { postUserData } from "../data/PostData";


const Home = () => {
    const navigate = useNavigate();
    const {student, teacher, role} = UseRole()
    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            console.log('Login successful:', result.user);
            const { email, uid } = result.user;

            // Post user data to Firebase Realtime Database
            await postUserData(email, uid, role);
            navigate('/dashboard'); // Navigate to dashboard after successful login
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    console.log(role);
    
    
    return (
        <section className='flex gap-4 items-center   h-screen text-white'>
            <div className='w-[90%] mx-auto flex flex-col gap-4 justify-center items-center'>
                {role.length > 0 && <button
                    className='px-8 py-2 rounded-lg bg-blue-500'
                    onClick={loginWithGoogle}>
                    Log In with Google
                </button>}
                <div className='flex gap-4 items-center'>
                    <button
                        onClick={student}
                        className='px-8 py-2 rounded-lg bg-blue-500'>
                        Learn
                    </button>
                    <button
                        onClick={teacher}
                        className='px-8 py-2 rounded-lg bg-blue-500'>
                        Teach
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Home;
