import { merge } from 'lodash'
import { RECEIVE_TRANSACTION, RECEIVE_TRANSACTIONS } from '../actions/transaction_actions'
import { RECEIVE_CURRENT_USER } from '../actions/session_actions'
import { RECEIVE_USER} from '../actions/user_actions'

const transactionsReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return action.currentUser.transactions || state
        case RECEIVE_USER:
            return action.user.transactions || state
        case RECEIVE_TRANSACTION:
            const {transaction} = action.transaction
            return merge({}, state, transaction)
        case RECEIVE_TRANSACTIONS:
            return action.transactions
        default:
            return state;
    }
}

export default transactionsReducer