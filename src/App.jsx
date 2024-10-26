import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import DashBoard from './components/DashBoard';

function App() {
  
  return (
      <>
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/dashboard' element={<DashBoard />} />
              </Routes>
          </BrowserRouter>
      </>
  );
}

export default App
