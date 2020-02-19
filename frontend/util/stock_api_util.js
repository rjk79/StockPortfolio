export const fetchStock = encodedSymbol => {
    return $.ajax({
        method: 'get',
        url: `https://cloud.iexapis.com/stable/stock/${encodedSymbol}/quote?token=${iexAPIKey}`,
        error: function (xhr, ajaxOptions, thrownError) {
            
            if (xhr.status == 404) {
                alert(xhr.responseText + "/ ticker");
            }
        }
    })
}
export const fetchStocks = encodedSymbols => {
    // debugger
    return $.ajax({
        method: 'get',
        url: `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${encodedSymbols}&types=quote&token=${iexAPIKey}`
    })
}