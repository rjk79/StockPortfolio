import { merge } from 'lodash'
import { RECEIVE_CURRENT_USER } from '../actions/session_actions'

const balanceReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return action.currentUser.balances
        default:
            return state;
    }
}

export default balanceReducer