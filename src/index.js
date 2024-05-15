import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/signin';
import Register from './pages/signup';
import Main from './pages/mainPage';
import CreateCategory from './pages/CategoryCreator';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/signin" element={<Login/>}/>
        <Route path="/signup" element={<Register/>}/>
        <Route path="/categories" element={<CreateCategory/>}/>
        <Route path="/" element={<Main/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
