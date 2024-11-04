import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import DashBoard from './components/DashBoard';
import FormValidation from './components/FormValidation';
import {Experiment} from './components/Experiment';
import { Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';


// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function App() {
  
  return (
      <>
          <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js'>
              <BrowserRouter>
                  <Routes>
                      <Route path='/' element={<Home />} />
                      <Route path='/dashboard' element={<DashBoard />} />
                      <Route path='/teacher' element={<FormValidation />} />
                      <Route path='/experiment' element={<Experiment />} />
                  </Routes>
              </BrowserRouter>
          </Worker>
      </>
  );
}

export default App
