import React from 'react'
import { connect } from 'react-redux'
import { logout } from "../actions/session_actions";
import { Link, Switch } from 'react-router-dom'
import { ProtectedRoute } from '../util/route_util'
import Portfolio from './portfolio'
import Transactions from './transactions'
import {fetchUser} from '../actions/user_actions'
import { fetchStock, fetchStocks, receiveStocks } from '../actions/stock_actions'
import {receiveHoldings} from '../actions/holding_actions'
import {receiveTransactions} from '../actions/transaction_actions'
import {isEqual} from 'lodash'

class Main extends React.Component {
    constructor(props){
        super(props)
        this.handleLogOut = this.handleLogOut.bind(this)
    }
    componentDidMount(){
        // const { fetchUser, currentUser } = this.props
        // fetchUser(currentUser.id)
        const { fetchUser, currentUser, fetchStocks } = this.props
        var self = this
        fetchUser(currentUser.id).then(res => {
            const { holdings } = self.props
            const encodedSymbols = holdings.map(holding => (encodeURI(holding.symbol))).join(",")
            if (encodedSymbols.length) { fetchStocks(encodedSymbols) }
        })
    }
    componentDidUpdate(prevProps){
        // debugger
        if (!isEqual(prevProps.currentUser, this.props.currentUser)){
        }
    }
    handleLogOut(e){
        e.preventDefault()
        this.props.resetHoldings()
        this.props.resetTransactions()
        this.props.logout()
    }
    render(){
        return (
            <>
            <div className="menu">
                <div>
                    <span className="welcome">Welcome {this.props.currentUser.name}</span>
                    <button className="logout gray-button" onClick={this.handleLogOut}>Log Out</button>
                </div>
            <div>
                <Link  to="/portfolio">Portfolio</Link> | 
                <Link  to="/transactions">Transactions</Link>
            </div>
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
    const {entities} = state
    const currentUserId = state.session.id
    const currentUser = entities.users[currentUserId]
    return {
        currentUser,
        holdings: Object.values(entities.holdings)

    }
}

const mdp = (dispatch) => {
    return {
        logout: () => dispatch(logout()),
        fetchUser: id => dispatch(fetchUser(id)),
        fetchStocks: symbols => dispatch(fetchStocks(symbols)),
        resetStocks: () => dispatch(receiveStocks({})),
        resetHoldings: () => dispatch(receiveHoldings({})),
        resetTransactions: () => dispatch(receiveTransactions({})),
    }
}

export default connect(msp, mdp)(Main)
