import { merge } from 'lodash'
import { RECEIVE_CURRENT_USER } from '../actions/session_actions'
import { RECEIVE_USER } from '../actions/user_actions'
import {RECEIVE_TRANSACTION} from '../actions/transaction_actions'

const balancesReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return action.currentUser.balances
        case RECEIVE_USER:
            return action.user.balances
        case RECEIVE_TRANSACTION:
            
            const {amount, user_id} = Object.values(action.transaction.balance)[0] //there's just one
            let newState = merge({}, state)
            newState[user_id].amount = amount
            return merge({}, state, newState)
        default:
            return state;
    }
}

export default balancesReducer