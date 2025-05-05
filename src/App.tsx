import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import { SessionProvider } from './components/sessionprovider';
import Audit from './pages/audit';
import Reports from './pages/reports';
import AuditAfip from './pages/auditafip';
import CommonAuditDetail from './pages/commonauditdetail';
import AfipAuditDetail from './pages/afipauditdetail';
import Admin from './pages/admin';
import ProtectedRoute from './components/protectedroute';

const App: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <SessionProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/audit"
              element={
                <ProtectedRoute allowedRoles={[1, 2, 3]}>
                  <Audit />
                </ProtectedRoute>
              }
            />
            <Route
              path="/auditafip"
              element={
                <ProtectedRoute allowedRoles={[1, 2, 3]}>
                  <AuditAfip />
                </ProtectedRoute>
              }
            />
            <Route
              path="/audit/commonAuditDetails/:auditNumber"
              element={
                <ProtectedRoute allowedRoles={[1, 2, 3]}>
                  <CommonAuditDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/auditafip/afipAuditDetails/:auditNumber"
              element={
                <ProtectedRoute allowedRoles={[1, 2, 3]}>
                  <AfipAuditDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reports"
              element={
                <ProtectedRoute allowedRoles={[1, 2, 4]}>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={[1]}>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="*"
              element={
                localStorage.getItem('user') ? (
                  <Navigate to="/dashboard" replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </SessionProvider>
      </BrowserRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={10000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
