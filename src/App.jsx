import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import DashBoard from './components/DashBoard';
import FormValidation from './components/FormValidation';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import TeacherMeeting from './pages/TeacherMeeting';

function App() {
    const {userId} = useParams()
    let payloadTeacher = {
        meetingNumber: 81024439696,
        role: 1,
        sdkKey: import.meta.env.VITE_REACT_CLIENT_ID,
        sdkSecret: import.meta.env.VITE_REACT_CLIENT_SECRET,
        passWord: 'MijSb7',
        userName: 'Vedant Naik',
        userEmail: 'vedunaik777@gmail.com',
        leaveUrl: `http://localhost:5173/teacher/${userId}/create-meeting`
    };
    return (
        <>
            <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route
                            path='/dashboard/:userId'
                            element={<DashBoard />}
                        />
                        <Route
                            path='/teacher/:userId'
                            element={<FormValidation />}
                        />
                        <Route
                            path='/teacher/:userId/create-meeting'
                            element={<TeacherMeeting payload={payloadTeacher} />}
                        />
                    </Routes>
                </BrowserRouter>
            </Worker>
        </>
    );
}

export default App;
