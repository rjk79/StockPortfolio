import React from 'react';
import GreetingContainer from './greetings/greeting_container';
import SignupFormContainer from './session/signup_form_container'
import LoginFormContainer from './session/login_form_container'
import { AuthRoute, ProtectedRoute } from '../util/route_util'
import { Route, Switch, Link } from 'react-router-dom'
import Main from './main'

const App = () => (
    <div className="primary-app-div">
        <GreetingContainer />
        <Switch>
            
            <AuthRoute path="/signup" component={SignupFormContainer} />
            <AuthRoute path="/login" component={LoginFormContainer} />
            <ProtectedRoute path="/" component={Main} />

        </Switch>
    </div>
)
// always show greeting container so you can log out
// the auth routes will just sit there once they do their job

export default App