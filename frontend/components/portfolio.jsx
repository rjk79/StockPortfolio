import React from 'react'
import { connect } from 'react-redux'
import {createTransaction} from '../actions/transaction_actions'
import {fetchStock, fetchStocks} from '../actions/stock_actions'

class Portfolio extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            symbol: "",
            quantity: "",
            error: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
    }

    handleChange(field){
        return e => {
            this.setState({[field]: e.target.value.toUpperCase()})
        }
    }
    isValidQuantity(quantity){
        const intQuantity = parseInt(quantity)
        return Number.isInteger(intQuantity)         // make sure its a number, it doesnt have a decimal, and its not 0
            && quantity.indexOf('.') === -1
            && quantity.indexOf(',') === -1
            && intQuantity > 0
    }
    handleSubmit(e){
        e.preventDefault()
        var self = this
        const {amount, fetchStock} = this.props
        const {symbol, quantity} = this.state
        if (!(this.isValidQuantity(quantity))) {
            this.setState({error: "Quantity must a positive integer"})
            return
        }
      
        let encodedSymbol = encodeURI(symbol) //for non-ASCII chars

        fetchStock(encodedSymbol)
            .then(res => {
            // let price = 324.95
            let price
            // debugger
            const {stocks} = self.props
            let stock = stocks[symbol]
            if (stock){price = stock.latestPrice}
            const transaction = { symbol, quantity, price }   
            if (!price) {
                // this.setState({ error: "Symbol not found" })
            } else if (price * parseInt(quantity) > amount) {
                this.setState({ error: "Not enough cash" })
            } else {
                this.props.createTransaction(transaction)
                this.setState({ error: "", symbol: "", quantity: "" })
            }   
        }) //2
            // .catch(err => {
            //     this.setState({ error: "Symbol not found" })
            // })
    }
    roundToCent(num){
        return Math.ceil(num * 100) / 100
    }
    render(){
        const {holdings, amount, stocks} = this.props
        let symbol
        let stock
        let status
        let value = 0
        let curr
        for (let i = 0;i < holdings.length;i++){
            curr = stocks[holdings[i].symbol]
            if (!curr){continue}
            value += curr.latestPrice * holdings[i].quantity
        }
        const holdingsLis = holdings.map((holding, idx) => {
            symbol = holding.symbol
            stock = stocks[symbol] || {symbol: "", open: 0, latestPrice: 0}
            
            if (stock.open < stock.latestPrice){
                status = "1"
            } else if (stock.open > stock.latestPrice) {
                status = "-1"
            } else {
                status = "0"
            }
            return (
                <li key={idx} data-status={status}>{symbol} - {holding.quantity} shares - ${this.roundToCent(holding.quantity * stock.latestPrice)}</li>
        )})
        
        return(
            <div className="portfolio">
            <div>
                <div className="holdings">
                <div className="title">Portfolio (${this.roundToCent(value)})</div>
                    {/* <div className="subtitle">(${this.roundToCent(value)})</div> */}
                        <ul>
                            {holdingsLis}
                        </ul>
                </div>
                <form onSubmit={this.handleSubmit}>
                        
                    <div className="subtitle">Cash: ${Math.ceil(amount * 100) / 100}</div>
                    <div className="form-group">
                        <label htmlFor="symbol">Symbol</label>
                        <input id="symbol" className="form-control" value={this.state.symbol} onChange={this.handleChange("symbol")} type="text" placeholder="Symbol (e.g. MSFT)" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                            <input id="quantity" className="form-control" value={this.state.quantity} onChange={this.handleChange("quantity")} type="text" placeholder="Quantity" required/>
                    </div>
                    <input className="blue-button" type="submit" value="Buy" /> <br/>
                    {this.state.error.length ? this.state.error : null}
                </form>
            </div>
            </div>
        )
    }
}

const msp = (state) => {
    const {entities, session} = state
    let balance = entities.balances[session.id]
    let amount
    if (balance){amount = balance.amount}
    return {
        amount,
        currentUserId: session.id,
        holdings: Object.values(entities.holdings),
        stocks: entities.stocks
    }
}

const mdp = (dispatch) => {
    return {
        createTransaction: transaction => dispatch(createTransaction(transaction)),
        fetchStock: symbol => dispatch(fetchStock(symbol)),
    }
}

export default connect(msp, mdp)(Portfolio)