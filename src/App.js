import logo from './logo.svg';
import './App.css';
import { Switch, Route, LocalStorage,Redirect, BrowserRouter as Router } from 'react-router-dom'
import SignIn from "./components/Login/Login"
import Header from "./components/Header/Header"


function Display(props) {

  // const updateLoginStatus = () =>{
  //   props = true;
  // }
  // console.log("here", props, props.isLoggedIn);
  // const isLoggedIn = props.isLoggedIn;
  const token = localStorage.getItem("token");
  if (token!==null) {
    return <Header />;
  }
  return <SignIn />;
}

export default function App() {
  return (
    <Display className="App" isLoggedIn={false}>
      <Router>
        <Switch>
          <Router exact path="/SignIn" component={SignIn}></Router>
          <Redirect from="/" to="/SignIn"></Redirect>
        </Switch>

      </Router>
    </Display>
  );
}
