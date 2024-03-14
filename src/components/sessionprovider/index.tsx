import React, { createContext, useContext, useEffect, useState } from 'react';

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

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
    const [name, setName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);

    // Cargar la sesión al inicio si existe
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedName = localStorage.getItem('name');
        const storedLastName = localStorage.getItem('lastName');
        if (storedUser) {
            console.log('SessionProvider useEffect ' + storedUser);
            setUser(storedUser);
            setName(storedName);
            setLastName(storedLastName);
        }
    }, []);

    // Función para iniciar sesión
    const login = (user: string, name: string, lastName: string) => {
        setUser(user);
        setName(name);
        setLastName(lastName);

        localStorage.setItem('user', user);
        localStorage.setItem('name', name);
        localStorage.setItem('lastName', lastName);

        console.log('SessionProvider login ' + localStorage.getItem('user'));
        console.log('NOMBRE: ' + localStorage.getItem('name') + localStorage.getItem('lastName'));
    };

    // Función para cerrar sesión
    const logout = () => {
        setUser(null);
        setName(null);
        setLastName(null);
        localStorage.removeItem('user');
        localStorage.removeItem('name');
        localStorage.removeItem('lastName');
        console.log('SessionProvider logout ' + localStorage.getItem('user'));
    };

    return (
        <SessionContext.Provider value={{ user, name, lastName, login, logout }}>
            {children}
        </SessionContext.Provider>
    );
};
