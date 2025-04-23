import React, { createContext, useContext, useEffect, useState } from 'react';
import { Role } from '../../types/role';

// Creamos un contexto para el componente de sesión
const SessionContext = createContext<any | undefined>(undefined);

interface SessionProviderProps {
  children: React.ReactNode;
}

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession debe utilizarse dentro de un SessionProvider');
  }
  return context;
};

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
  const [user, setUser] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>(null);

  // Cargar la sesión al inicio si existe
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedName = localStorage.getItem('name');
    const storedLastName = localStorage.getItem('lastName');
    const storedRole = localStorage.getItem('role');
    if (storedUser) {
      console.log('SessionProvider useEffect ' + storedUser);
      setUser(storedUser);
      setName(storedName);
      setLastName(storedLastName);
      if (storedRole && storedRole !== 'undefined') {
        try {
          setRole(JSON.parse(storedRole));
        } catch (error) {
          console.error('Error parsing role:', error);
          setRole(null);
        }
      }
    }
  }, []);

  // Función para iniciar sesión
  const login = (user: string, name: string, lastName: string, role: Role) => {
    console.log('Login role:', role);
    setUser(user);
    setName(name);
    setLastName(lastName);
    setRole(role);

    localStorage.setItem('user', user);
    localStorage.setItem('name', name);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('role', JSON.stringify(role));
    console.log('Stored role:', JSON.stringify(role));

    console.log('SessionProvider login ' + localStorage.getItem('user'));
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    setName(null);
    setLastName(null);
    setRole(null);
    localStorage.removeItem('user');
    localStorage.removeItem('name');
    localStorage.removeItem('lastName');
    localStorage.removeItem('role');
    console.log('SessionProvider logout ' + localStorage.getItem('user'));
  };

  return (
    <SessionContext.Provider
      value={{ user, name, lastName, role, login, logout }}
    >
      {children}
    </SessionContext.Provider>
  );
};
