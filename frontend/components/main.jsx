import React from 'react'
import { connect } from 'react-redux'
import { logout } from "../actions/session_actions";
import { Link, Switch } from 'react-router-dom'
import { ProtectedRoute } from '../util/route_util'
import Portfolio from './portfolio'
import Transactions from './transactions'
import {fetchUser} from '../actions/user_actions'

class Main extends React.Component {
    constructor(props){
        super(props)
        this.handleLogOut = this.handleLogOut.bind(this)
    }
    componentDidMount(){
        const {fetchUser, currentUser} = this.props
        
        fetchUser(currentUser.id)
    }
    handleLogOut(e){
        e.preventDefault()
        this.props.logout()
    }
    render(){
        return (
            <>
            <h1>Welcome {this.props.currentUser.name}</h1>
            <button className="gray-button" onClick={this.handleLogOut}>Log Out</button>
            <div className="navbar">
                <Link  to="/portfolio">Portfolio</Link> | 
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
    const currentUser = state.entities.users[currentUserId]
    return {
        currentUser
    }
}

const mdp = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        fetchUser: id => dispatch(fetchUser(id))
    }
}

export default connect(msp, mdp)(Main)
