import React from 'react';
import './App.css';

import { Routes, Route } from "react-router-dom"
import { HomePage, PollVotePage } from './pages';
import { Footer, NavbarComponent } from './components';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<>
          <NavbarComponent />
          <HomePage />
          <Footer />
        </>} />
        <Route path="/poll" element={<PollVotePage />} />
      </Routes>

    </div>
  );
}

export default App;
