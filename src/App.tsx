import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {branchService} from "./services/ams/branch";
import {ApiResponse} from "./services/ams/branch";
import Button from "./components/Button";

function App() {

  const [userData, setUserData] = useState<ApiResponse | null>(null);

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
      </header>
    </div>
  );
}

export default App;
