import React, {useState} from 'react';
import Logo from "../../img/Logo.png";
import TextBox from "../../components/textbox";
import Switch from "../../components/switch";
import Buttongroup from "../../components/buttongroup";
import Button from "../../components/button";
import {ApiResponse} from "../../services/ams/branch";
import {userService} from "../../services/ams/user";
import {UserRequest} from "../../types/user_request";
import {useNavigate} from "react-router-dom";

const Login: React.FC = () => {

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

    const handleClick = () => {
        const userRequest:UserRequest ={
            mail: user,
            password: password
        }

        userService.fetchUserByMailAndPassword("user/authenticate", userRequest)
            .then((userData) => {
                if (userData) {
                    setUserData(userData);
                    setErrorMessage('');
                    navigate('/home');
                } else {
                    setUserData(null);
                    setErrorMessage('Usuario o contraseña incorrecta');
                }
            })
            .catch(() => {
                setUserData(null);
                setErrorMessage('Error al procesar la solicitud');
        });
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    return (
        <div className="App">
            <form onSubmit={handleFormSubmit}>
                <header className="App-header">
                    <img
                        src={Logo}
                        className="App-logo"
                        alt="logo"
                    />
                    <TextBox
                        label="Usuario:"
                        value={user}
                        onChange={handleUserChange}
                        placeholder="Ingresa usuario aquí"/>
                    <TextBox
                        label="Contraseña:"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Ingresa contraseña aquí"
                        type="password"/>
                    {errorMessage && <p>{errorMessage}</p>}
                    <Switch label="" />
                    <Buttongroup>
                        <Button type="submit" label="INGRESAR" onClick={handleClick}/>
                    </Buttongroup>
                </header>
            </form>
        </div>
    );
};

export default Login;