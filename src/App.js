import logo from './logo.svg';
import './App.css';
import { useContext } from 'react';
import { ThemeContext } from './components/Toggle/ContextProvider';

function App() {
  const { isDark } = useContext(ThemeContext);

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
