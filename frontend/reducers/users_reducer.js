import { merge, pick } from "lodash";
import { RECEIVE_CURRENT_USER } from "../actions/session_actions";

export default (state = {}, action) => {
    Object.freeze(state)   
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return merge({}, state, { [action.currentUser.id]: pick(action.currentUser, 'id', 'name', 'email') })       
        default:
            return state;
    }
}