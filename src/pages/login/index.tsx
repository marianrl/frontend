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


    const handleClick = () => {
        const userRequest:UserRequest ={
            mail: user,
            password: password
        }

        userService.fetchUserByMailAndPassword("user/authenticate", userRequest)
            .then((userData) => {
                if (userData) {
                    setErrorMessage('');
                    login(user);
                    console.log('user: ' + user);
                    navigate('/home',{state:{user}});
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