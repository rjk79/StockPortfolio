import React from 'react'
import { connect } from 'react-redux'
import { logout } from "../actions/session_actions";

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
        return (
            <>
            <h1>Welcome</h1>
            <button onClick={this.handleLogOut}>Log Out</button>
            </>
        )
    }
}

const mdp = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
    }
}

export default connect(null, mdp)(Main)
