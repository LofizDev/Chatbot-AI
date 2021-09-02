import SideBar from './components/sideBar/SideBar';
import './App.css';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Home from './components/page/home/Home'
import Chat from './components/page/chat/Chat';
import Guide from './components/page/guide/Guide';

function App() {
  return (
    <>
    <Router>
        <SideBar/>
        <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/Chat' exact component={Chat} />
        <Route path='/Guide' exact component={Guide} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
