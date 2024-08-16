import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Bienvenida from './Bienvenida'; 
import Inventario from './Inventario'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/inventario" element={<Inventario />} />
        <Route path="/" element={<Bienvenida />} />
      </Routes>
    </Router>
  );
}

export default App;
