import './App.css';
import TaskContainer from './components/Home/TaskContainer';
import Navbar from './components/Navbar/Navbar';
import {Provider} from 'react-redux'
import createStore from './store/configurateStore';


const store= createStore()

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Navbar/>
        <TaskContainer/>
      </Provider>
    </div>
  );
}

export default App;
