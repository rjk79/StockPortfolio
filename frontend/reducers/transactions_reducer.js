import { merge } from 'lodash'
import { RECEIVE_TRANSACTION } from '../actions/transaction_actions'
import { RECEIVE_CURRENT_USER } from '../actions/session_actions'
import { RECEIVE_USER} from '../actions/user_actions'

const transactionsReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return action.currentUser.transactions
        case RECEIVE_USER:
            return action.user.transactions
        case RECEIVE_TRANSACTION:
            const {transaction} = action.transaction
            return merge({}, state, transaction)
        default:
            return state;
    }
}

export default transactionsReducer