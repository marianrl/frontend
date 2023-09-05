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

    // Cargar la sesión al inicio si existe
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    // Función para iniciar sesión
    const login = (username: string) => {
        setUser(username);
        localStorage.setItem('user', username);
    };

    // Función para cerrar sesión
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <SessionContext.Provider value={{ user, login, logout }}>
            {children}
        </SessionContext.Provider>
    );
};
