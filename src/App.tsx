// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { LandingPage } from './pages/landingPage';
import {LoginPage} from "@/pages/auth/loginPage"
import { RegisterPage } from "@/pages/auth/registerPage"
import { HomePage } from '@/pages/Home/HomePage'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
       <Route path="/login/home" element={<HomePage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;