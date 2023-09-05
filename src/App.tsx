import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from "./pages/login";
import Home from "./pages/home"
import {SessionProvider, useSession} from "./components/sessionprovider";

const ProtectedRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
    const { user } = useSession();
    if (!user) {
        // Si el usuario no ha iniciado sesión, redirige a la página de inicio de sesión
        return <Navigate to="/login" />;
    }
    return <>{element}</>;
};

const App: React.FC = () => {
  return (
      <BrowserRouter>
          <SessionProvider>
              <Routes>
                  <Route path="/login" element={<Login/>} />
                  <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
                  <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
          </SessionProvider>
      </BrowserRouter>
  );
}

export default App;
