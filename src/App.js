import './App.css';
import 'antd/dist/antd.css';
import Quize from './components/quiz/index';
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import Start from './components/start';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          
          <Route path="/Start/:question/:category/:quiz">
            <Start />
          </Route>
          <Route path="/">
            <Quize />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
