import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';

const routing = (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<App />} />
      {/* 添加其他路由 */}
    </Routes>
    <Footer />
  </Router>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {routing}
  </React.StrictMode>
);



