import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";


function App() {

  return (
     <Router>
        <Routes>
          <Route index element={<Homepage />} />
        <Route path="/Login" element={<Login />} />
        
        </Routes>
      </Router>

  );
}

export default App;