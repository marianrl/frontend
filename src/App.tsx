import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {branchService} from "./services/ams/branch";
import {ApiResponse} from "./services/ams/branch";
import Button from "./components/button";
import Switch from "./components/switch";

function App() {

  const [, setUserData] = useState<ApiResponse | null>(null);

  const handleClick = () => {
    branchService.fetchAllBranches("branch")
        .then((userData) => {setUserData(userData)});
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button label="Buscar todos" onClick={handleClick}/>
        <Switch label="" />
      </header>
    </div>
  );
}

export default App;
