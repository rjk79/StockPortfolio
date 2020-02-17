export const createTransaction = transaction => {
    return $.ajax({
        method: 'post',
        url: "api/transactions",
        data: {transaction}
    })
}