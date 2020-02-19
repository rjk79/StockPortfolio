export const RECEIVE_STOCKS = 'RECEIVE_STOCKS'
export const RECEIVE_STOCK = 'RECEIVE_STOCK'
import * as StockAPIUtil from '../util/stock_api_util'

const receiveStock = (stock) => {
    return {
        type: RECEIVE_STOCK,
        stock
    }
}

export const receiveStocks = (stocks) => {
    return {
        type: RECEIVE_STOCKS,
        stocks
    }
}


export const fetchStock = symbol => dispatch => {
    return StockAPIUtil.fetchStock(symbol)
        .then(stock => dispatch(receiveStock(stock)))
        // .catch(err => {console.log(err)})
}
export const fetchStocks = symbols => dispatch => {
    // debugger
    return StockAPIUtil.fetchStocks(symbols)
        .then(stocks => dispatch(receiveStocks(stocks)))
}

