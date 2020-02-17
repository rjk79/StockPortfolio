import React from 'react'
import { connect } from 'react-redux'
import { logout } from "../actions/session_actions";
import { Link, Switch } from 'react-router-dom'
import { ProtectedRoute } from '../util/route_util'
import Portfolio from './portfolio'
import Transactions from './transactions'

class Main extends React.Component {
    constructor(props){
        super(props)
        this.handleLogOut = this.handleLogOut.bind(this)
    }
    handleLogOut(e){
        e.preventDefault()
        this.props.logout()
    }
    render(){
        // debugger
        return (
            <>
            <h1>Welcome {this.props.currentUser}</h1>
            <button className="gray-button" onClick={this.handleLogOut}>Log Out</button>
            <div className="navbar">
                <Link  to="/portfolio">Portfolio</Link>
                <Link  to="/transactions">Transactions</Link>
            </div>
            <Switch>
                <ProtectedRoute exact path="/transactions" component={Transactions} />
                <ProtectedRoute 
                // exact path="/portfolio"
                component={Portfolio} />
            </Switch>
            </>
        )
    }
}

const msp = state => {
    const currentUserId = state.session.id
    const currentUser = state.entities.users[currentUserId].name
    return {
        currentUser
    }
}

const mdp = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
    }
}

export default connect(msp, mdp)(Main)
