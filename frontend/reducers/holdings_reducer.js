import { merge } from 'lodash'
import { RECEIVE_TRANSACTION } from '../actions/transaction_actions'
import { RECEIVE_CURRENT_USER } from '../actions/session_actions'
import { RECEIVE_USER } from '../actions/user_actions'

const holdingsReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_CURRENT_USER: 
            return action.currentUser.holdings
        case RECEIVE_USER:
            return action.user.holdings
        case RECEIVE_TRANSACTION:
            
            let { quantity, symbol } = action.transaction.holding
            let newState = merge({}, state)
            if (newState[symbol]){
                newState[symbol].quantity = quantity
            }else {
                newState[symbol] = {symbol, quantity}
            }
            return merge({}, state, newState)
        default:
            return state;
    }
}

export default holdingsReducer