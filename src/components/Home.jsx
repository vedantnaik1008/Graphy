import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const navigate = useNavigate();
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
    return (
        <div className=''>
            <button onClick={loginWithGoogle}>Log In with Google</button>
        </div>
    );
};

export default Home;
