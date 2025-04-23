import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from '../sessionprovider';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: number[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const { role } = useSession();
  const user = localStorage.getItem('user');

  // Si no hay user loggeado, redirigir a login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si no hay roles permitidos, permitir acceso
  if (!allowedRoles) {
    return <>{children}</>;
  }

  // Si el rol del user no está en los roles permitidos, redirigir a dashboard
  if (role && !allowedRoles.includes(role.id)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Si todas las verificaciones pasan, renderizar los children
  return <>{children}</>;
};

export default ProtectedRoute;
