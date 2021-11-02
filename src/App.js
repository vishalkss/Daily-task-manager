import logo from './logo.svg';
import './App.css';
import { Switch, Route, LocalStorage, Redirect, BrowserRouter as Router } from 'react-router-dom'
import Login from "./components/Login/Login"
import Header from "./components/Header/Header"
import Task from "./components/Task/Task"


function Display(props) {

  // const updateLoginStatus = () =>{
  //   props = true;
  // }
  // console.log("here", props, props.isLoggedIn);
  // const isLoggedIn = props.isLoggedIn;
  const token = localStorage.getItem("token");
  if (token !== null) {
    return <Header />;
  }
  return <Login />;
}

export default function App() {
  
  const token = localStorage.getItem("token");
  if (token !== null) {
    <Redirect from="/" to="/Tasks"></Redirect>
  }
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/Tasks">
            <Task />
          </Route>
          <Redirect from="/" to="/login"></Redirect>
        </Switch>
      </div>
    </Router>
  );
}
