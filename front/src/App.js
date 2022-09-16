import logo from './logo.svg';
import './App.css';
import {addTask, doTask, loadTasks, setTaskToUser} from './store/tasks';
import configurateStore from './store/configurateStore'

const store=configurateStore()

store.dispatch(loadTasks())
setTimeout(()=>store.dispatch(setTaskToUser(1,8)),2000)



function App() {
  return (
    <div className="App">
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
