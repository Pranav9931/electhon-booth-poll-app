import React from 'react';
import './App.css';

import { Routes, Route } from "react-router-dom"
import { PollVotePage } from './pages';
import { NavbarComponent } from './components';

function App() {
  return (
    <div className="App">
      <NavbarComponent />
      <Routes>
        <Route path="/" />
        <Route path="/poll" element={<PollVotePage />} />
      </Routes>
    </div>
  );
}

export default App;
