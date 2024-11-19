import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import DashBoard from './components/DashBoard';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import TeacherMeeting from './pages/TeacherMeeting';
import FormTab from './components/CourseForm/FormTab';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the toastify CSS


function App() {
    const {userId} = useParams()
    let payloadTeacher = {
        meetingNumber: 82549809031,
        role: 1,
        sdkKey: import.meta.env.VITE_REACT_CLIENT_ID,
        sdkSecret: import.meta.env.VITE_REACT_CLIENT_SECRET,
        passWord: 'iGP5wT',
        userName: 'Vedant Naik',
        userEmail: 'vedunaik777@gmail.com',
        leaveUrl: `http://localhost:5173/teacher/${userId}/create-meeting`
    };
    return (
        <>
            <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'>
                <BrowserRouter>
                    <ToastContainer
                        position='top-right'
                        autoClose={2000}
                        hideProgressBar={false}
                    />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route
                            path='/dashboard/:userId'
                            element={<DashBoard />}
                        />
                        <Route path='/teacher/:userId' element={<FormTab />} />
                        <Route
                            path='/teacher/:userId/create-meeting'
                            element={
                                <TeacherMeeting payload={payloadTeacher} />
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </Worker>
        </>
    );
}

export default App;
