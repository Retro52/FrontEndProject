import React from 'react'

import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";


import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import GamePage from './components/GamePage';
import LoginPage from './components/LoginPage';
import NotFound from './components/NotFoundPage';
import ProfilePage from './components/ProfilePage';
import RegisterPage from './components/RegisterPage';
import PrivateRoute from "./components/PrivateRoute";

// authentification handler
import { AuthProvider } from "./components/AuthContext";


export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/game/:id" element={<GamePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route exact path='/profile' element={<PrivateRoute/>}>
            <Route exact path='/profile' element={<ProfilePage/>}/>
          </Route>
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}
