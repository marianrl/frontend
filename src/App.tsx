import React, {useState} from 'react';
import './App.css';
import {branchService} from './services/ams/branch';
import {ApiResponse} from './services/ams/branch';
import Button from './components/button';
import CancelButton from "./components/cancelbutton";
import TextBox from "./components/textbox";
import Switch from './components/switch';
import Buttongroup from "./components/buttongroup";
import Logo from './img/Logo.png'

function App() {

  const [, setUserData] = useState<ApiResponse | null>(null);

  const handleClick = () => {
    branchService.fetchAllBranches("branch")
        .then((userData) => {setUserData(userData)});
  }

  const [text, setText] = useState('');

  const [password, setPassword] = useState('');

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

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
}

export default App;
