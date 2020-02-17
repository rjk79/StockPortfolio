import { merge } from 'lodash'
import { RECEIVE_TRANSACTION } from '../actions/transaction_actions'
import { RECEIVE_CURRENT_USER } from '../actions/session_actions'

const transactionReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return action.currentUser.transactions
        case RECEIVE_TRANSACTION:
            return merge({}, state, { [action.transaction.id]: action.transaction })
        default:
            return state;
    }
}

export default transactionReducer