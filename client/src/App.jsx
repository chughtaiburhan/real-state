import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Home from './pages/Home';     // Make sure these files exist
import About from './pages/About';   // Make sure these files exist
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListning';

export default function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route element={<PrivateRoute/>}>
        <Route path="/profile" element={<Profile />} />
        <Route path='/create-listing' element={<CreateListing/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
