// import React from 'react'
import "./App.css";
import { Addmovie, Card, Header, DeatailPage } from "./index";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="apps">
      <Header />
      <div className="otherComponents">
        <Routes>
          <Route path="/" element={<Card />} />
          <Route path="/addmovie" element={<Addmovie />} />
          <Route path="/details/:id" element={<DeatailPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
