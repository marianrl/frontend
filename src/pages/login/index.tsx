import React, {useState} from 'react';
import Logo from "../../img/Logo.png";
import Button from "../../components/button";
import InputWrapper from "../../components/inputfield";
import {userService, ApiResponse} from "../../services/ams/user";
import {UserRequest} from "../../types/user_request";
import {useNavigate} from "react-router-dom";
import {useSession} from "../../components/sessionprovider";

const Login: React.FC = () => {

    const { login } = useSession();

    const [, setUserData] = useState<ApiResponse | null>(null);

    const [user, setUser] = useState('');

    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const parseJwt = (token: string) => {
        try {
            return JSON.parse(atob(token.split('.')[1])); // Decodifica el payload
        } catch (e) {
            return null;
        }
    };

    const handleClick = async () => {
        const userRequest: UserRequest = {
            mail: user,
            password: password,
        };
    
        try {
            // Llamar a la función y solo verificar el estado
            const status = await userService.fetchUserByMailAndPassword("user/authenticate", userRequest);
        
            if (status === 200) {
                setErrorMessage('');
        
                // Leer el token almacenado en localStorage
                const token = localStorage.getItem('authToken');
                if (token) {
                    // Decodificar el token para obtener los datos del usuario
                    const decodedToken = parseJwt(token);
                    if (decodedToken) {
                        login(user, decodedToken.name, decodedToken.lastName);
                    }
        
                    // Redirigir al dashboard
                    navigate('/dashboard');
                } else {
                    setErrorMessage('Token no encontrado en localStorage.');
                }
            } else {
                setErrorMessage('Usuario o contraseña incorrecta');
            }
        } catch (error: any) {
            console.error("Error en el login:", error.message);
            setUserData(null);
            setErrorMessage('Error al procesar la solicitud');
        }        
    };

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    return (
        <div className="App">
            <div className="split-screen">
                <div className="left">
                    <div className="background-image">
                        <img
                            src={Logo}
                            className="App-logo"
                            alt="logo"
                        />
                    </div>
                </div>
                <div className="right">
                    <form onSubmit={handleFormSubmit} >
                        <h2 className="title">BIENVENIDO</h2>
                        <InputWrapper
                            label="Usuario"
                            type="text"
                            htmlFor="text"
                            value={user}
                            onChange={handleUserChange}
                        />
                        <InputWrapper
                            label="Contraseña"
                            type="password"
                            htmlFor="password"
                            value={password}
                            onChange={handlePasswordChange}

                        />
                        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
                        <Button
                            type="submit"
                            label="INGRESAR"
                            onClick={handleClick}/>

                    </form>
                </div>
            </div>
        </div>

    );
};

export default Login;