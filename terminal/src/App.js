import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import ButtonAppBar from './components/navigation/Navigation';
import SignIn from './components/signin/SignIn';
import SetMoney from './components/setMoney/SetMoney';
import { StateAccount } from './components/stateAccount/StateAccount';
import GetMoney from './components/getMoney/GetMoney';
import { PrivateRoute } from './router/PrivateRoute';

export const App = () => {
    const [token, setToken] = useState(null);
    
    return (<Router>
        
        {token ? <ButtonAppBar setToken = {setToken} /> : null}

        <Switch>
            <PrivateRoute token = {token} path="/state">
                <StateAccount token = {token}></StateAccount>
            </PrivateRoute>

            <PrivateRoute token = {token} path="/set_money">
                <SetMoney token = {token}></SetMoney>
            </PrivateRoute>

            <PrivateRoute token = {token} path="/get_money">
                <GetMoney token = {token}></GetMoney>
            </PrivateRoute>

            <Route path="*" >
                {token ? <StateAccount token = {token}></StateAccount> 
                        : <SignIn setToken = {setToken}></SignIn>}
            </Route>
        </Switch>

    </Router>)
}



