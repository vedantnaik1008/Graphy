import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import DashBoard from './components/DashBoard';
import FormValidation from './components/FormValidation';

function App() {
  
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/dashboard' element={<DashBoard />} />
                  <Route path='/teacher' element={<FormValidation />} />
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App
