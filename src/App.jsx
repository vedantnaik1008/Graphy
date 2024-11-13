import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import DashBoard from './components/DashBoard';
import FormValidation from './components/FormValidation';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';


// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import TeacherMeeting from './pages/TeacherMeeting';

let payload = {
    meetingNumber: import.meta.env.VITE_REACT_CLIENT_SECRET,
    role: 0,
    sdkKey: import.meta.env.VITE_REACT_CLIENT_ID,
    sdkSecret: import.meta.env.VITE_REACT_MEETING_NUMBER,
    passWord: import.meta.env.VITE_REACT_PASSWORD,
    userName: 'Vedant Naik',
    userEmail: 'vedunaik777@gmail.com',
    leaveUrl: 'https://localhost:5173/teacher/0'
};

function App() {
   
  
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
                          element={
                              <TeacherMeeting
                                  payload={payload}
                              />
                          }
                      />
                  </Routes>
              </BrowserRouter>
          </Worker>
      </>
  );
}

export default App
