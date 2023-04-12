import React from 'react';
import './App.css';

import { Routes, Route } from "react-router-dom"
import { HomePage, PollVotePage } from './pages';
import { Footer, NavbarComponent } from './components';

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/poll" element={<PollVotePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
