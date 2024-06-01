import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Login from "./pages/login";
import Dashboard from "./pages/dashboard"
import {SessionProvider} from "./components/sessionprovider";
import Audit from "./pages/audit";
import Reports from "./pages/reports"
import AuditAfip from "./pages/auditafip"
import Messages from "./pages/messages"
import CommonAuditDetail from "./pages/commonauditdetail";
import AfipAuditDetail from "./pages/afipauditdetail";

const App: React.FC = () => {
    return (
      <div>
          <BrowserRouter>
              <SessionProvider>
                  <Routes>
                      <Route path="/login" element={<Login/>} />
                      <Route path="/dashboard" element={ <Dashboard />} />
                      <Route path="/audit" element={<Audit />} />
                      <Route path="/messages" element={<Messages/>} />
                      <Route path="/auditafip" element={<AuditAfip/>} />
                      <Route path="/commonAuditDetails/:auditNumber" element={<CommonAuditDetail/>} />
                      <Route path="/afipAuditDetails/:auditNumber" element={<AfipAuditDetail/>} />
                      <Route path="/reports" element={<Reports/>} />
                      <Route path="*" element={<Navigate to="/login" replace />} />
                  </Routes>
              </SessionProvider>
          </BrowserRouter>
      </div>
    );
}

export default App;
