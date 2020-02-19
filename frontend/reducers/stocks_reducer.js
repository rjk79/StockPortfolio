import { merge } from 'lodash'
import {RECEIVE_STOCK, RECEIVE_STOCKS} from '../actions/stock_actions'
import {pick} from 'lodash'

const stocksReducer = (state = {}, action) => {
    Object.freeze(state)
    switch (action.type) {
        
        case RECEIVE_STOCK:
            return merge({}, state, {[action.stock.symbol]: pick(action.stock, "symbol", "latestPrice", "open")})
        case RECEIVE_STOCKS:
            let stocks = Object.values(action.stocks)
            let newState = {}
            let stock
            for (let i=0;i<stocks.length;i++){
                stock = stocks[i].quote
                newState[stock.symbol] = pick(stock, "symbol", "latestPrice", "open")
            }
            return newState
        default:
            return state;
    }
}

export default stocksReducer