import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import IndexCountdown from './IndexCountdown';
import reportWebVitals from './reportWebVitals';
import Countdown from './countdown';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<IndexCountdown />} />
        <Route path="countdown/:userName" element={<Countdown />} />
      </Routes>
    </BrowserRouter>
  );
};

root.render(<Routing />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
