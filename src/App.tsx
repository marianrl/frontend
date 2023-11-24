import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from "./pages/login";
import Home from "./pages/home"
import {SessionProvider} from "./components/sessionprovider";
import Audit from "./pages/audit";
import Auditdetail from "./pages/auditdetail";
import Reports from "./pages/reports"
import AuditAfip from "./pages/auditafip"
import Messages from "./pages/messages"

const App: React.FC = () => {
    return (
      <div>
          <BrowserRouter>
              <SessionProvider>
                  <Routes>
                      <Route path="/login" element={<Login/>} />
                      <Route path="/home" element={ <Home />} />
                      <Route path="/audit" element={<Audit />} />
                      <Route path="/messages" element={<Messages/>} />
                      <Route path="/auditafip" element={<AuditAfip/>} />
                      <Route path="/auditDetails/:auditNumber" element={<Auditdetail/>} />
                      <Route path="/reports" element={<Reports/>} />
                      <Route path="*" element={<Navigate to="/login" replace />} />
                  </Routes>
              </SessionProvider>
          </BrowserRouter>
      </div>
    );
}

export default App;
