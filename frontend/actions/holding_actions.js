export const RECEIVE_HOLDINGS = 'RECEIVE_HOLDINGS'

export const receiveHoldings = holdings => {
    return {
        type: RECEIVE_HOLDINGS,
        holdings
    }
}