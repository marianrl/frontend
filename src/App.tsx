import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import { SessionProvider } from './components/sessionprovider';
import Audit from './pages/audit';
import Reports from './pages/reports';
import AuditAfip from './pages/auditafip';
import Search from './pages/search';
import CommonAuditDetail from './pages/commonauditdetail';
import AfipAuditDetail from './pages/afipauditdetail';
import Admin from './pages/admin';

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <SessionProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search" element={<Search />} />
            <Route path="/audit" element={<Audit />} />
            <Route path="/auditafip" element={<AuditAfip />} />
            <Route
              path="/audit/commonAuditDetails/:auditNumber"
              element={<CommonAuditDetail />}
            />
            <Route
              path="/auditafip/afipAuditDetails/:auditNumber"
              element={<AfipAuditDetail />}
            />
            <Route path="/reports" element={<Reports />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </SessionProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
