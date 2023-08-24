import React from 'react';
import './App.css';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';
import Login from "./pages/login";
import Home from "./pages/home";

const App: React.FC = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route>
                  <Route path="/login" element={<Login/>} />
                  <Route path="/home" element={<Home/>} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
