import * as TransactionAPIUtil from '../util/transaction_api_util'

export const RECEIVE_TRANSACTION = 'RECEIVE_TRANSACTION'

const receiveTransaction = transaction => {
    return {
        type: RECEIVE_TRANSACTION,
        transaction
    }
}


export const createTransaction = transaction => dispatch => {
    return TransactionAPIUtil.createTransaction(transaction)
        .then(transaction => dispatch(receiveTransaction(transaction)))
}
