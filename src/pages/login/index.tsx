import React, {useState} from 'react';
import Logo from "../../img/Logo.png";
import TextBox from "../../components/textbox";
import Switch from "../../components/switch";
import Buttongroup from "../../components/buttongroup";
import Button from "../../components/button";
import CancelButton from "../../components/cancelbutton";
import {ApiResponse} from "../../services/ams/branch";
import {userService} from "../../services/ams/user";
import {UserRequest} from "../../types/user_request";

const Login: React.FC = () => {

    const [, setUserData] = useState<ApiResponse | null>(null);

    const [text, setText] = useState('');

    const [password, setPassword] = useState('');

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleClick = () => {
        const admin:UserRequest ={
            mail: "admin",
            password: "admin"
        }

        userService.fetchUserByMailAndPassword("user/authenticate", admin)
            .then((userData) => {setUserData(userData)});
    }

    return (
        <div className="App">
            <header className="App-header">
                <img
                    src={Logo}
                    className="App-logo"
                    alt="logo"
                />
                <TextBox
                    label="Usuario:"
                    value={text}
                    onChange={handleTextChange}
                    placeholder="Ingresa usuario aquí"/>
                <TextBox
                    label="Contraseña:"
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Ingresa contraseña aquí"
                    type="password"/>
                <Switch label="" />
                <Buttongroup>
                    <Button label="ACEPTAR" onClick={handleClick}/>
                    <CancelButton label="BORRAR" onClick={handleClick}/>
                </Buttongroup>
            </header>
        </div>
    );
};

export default Login;