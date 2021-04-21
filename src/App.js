import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Shop from "./components/Shop/Shop";
import Header from "./components/Header/Header";
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import CheckOut from './components/CheckOut/CheckOut';
import Orders from './components/Orders/Orders';
export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
            <Route exact path="/">
                <Shop></Shop>
            </Route>
            <Route path="/home">
                <Shop></Shop>
            </Route>
            <PrivateRoute path="/dashboard">
                <Dashboard></Dashboard>
            </PrivateRoute>
            <Route path="/login">
                <Login></Login>
            </Route>
            <PrivateRoute path="/buy-product/:productId">
                <CheckOut></CheckOut>
            </PrivateRoute>
            <PrivateRoute exact path="/orders">
                <Orders></Orders>
            </PrivateRoute>
        </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
