import { merge } from 'lodash'
import { RECEIVE_TRANSACTION } from '../actions/transaction_actions'
import { RECEIVE_CURRENT_USER } from '../actions/session_actions'

const holdingReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_CURRENT_USER: 
            return action.currentUser.holdings
        case RECEIVE_TRANSACTION:
            let { symbol, quantity } = action.transaction
            newQuantity = state[symbol].quantity + quantity
            return merge({}, state, { [symbol]: newQuantity })
        default:
            return state;
    }
}

export default holdingReducer