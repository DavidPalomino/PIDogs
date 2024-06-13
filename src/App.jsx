import axios from 'axios'
import { Routes, Route } from 'react-router-dom';
import LandingPage from './assets/components/Pages/LandingPage/LandingPage'
import HomePage from './assets/components/Pages/HomePage/HomePage';
import DetailPage from './assets/components/Pages/DetailPage/DetailsPage';
import FormPage from './assets/components/Pages/FormPage/FormPage';

function App() {
  
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/home" element={<HomePage/>}/>
      <Route path= "/details/:dogName" element={<DetailPage/>}/>
      <Route path= "/create-dog" element={<FormPage/>}/>
    </Routes>
    </div>
  )
}

export default App
