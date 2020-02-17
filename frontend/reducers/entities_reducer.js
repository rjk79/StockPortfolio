import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import transactionsReducer from './transactions_reducer'
import holdingsReducer from './holdings_reducer'
import balancesReducer from './balances_reducer'

const entitiesReducer = combineReducers({
    users: usersReducer,
    transactions: transactionsReducer,
    holdings: holdingsReducer,
    balances: balancesReducer,
    // stocks: stocksReducer,
})


export default entitiesReducer