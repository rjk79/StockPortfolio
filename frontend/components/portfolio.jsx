import React from 'react'
import { connect } from 'react-redux'
import {createTransaction} from '../actions/transaction_actions'

class Portfolio extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            symbol: "",
            quantity: "",
            error: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.fetchRecentPrices = this.fetchRecentPrices.bind(this)
    }
    componentDidMount(){
        // this.fetchAndBuy()
    }
    fetchRecentPrices(){
        const {holdings} = this.props
        const encodedSymbols = holdings.map(holding=>(encodeURI(holding.symbol)))
        const promise = new Promise((resolve, reject) => { //1
            const url = `https://cloud.iexapis.com/stable/stock/market/batch?symbols=aapl,fb&types=quote&token=${iexAPIKey}`;
            $.getJSON(url, data => {
                resolve(data);
            });
        });

        promise.then(data => {
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
        const {amount} = this.props
        const {symbol, quantity} = this.state
        if (!(this.isValidQuantity(quantity))) {
            this.setState({error: "Quantity must a positive integer"})
            return
        }
      
        let encodedSymbol = encodeURI(symbol) //for non-ASCII chars
        const promise = new Promise((resolve, reject) => { //1
            const url = `https://cloud.iexapis.com/stable/stock/${encodedSymbol}/quote?token=${iexAPIKey}`;
            $.getJSON(url, data => {
                resolve(data);
            });
        });

        promise.then(data => {
            // let price = 324.95
            debugger
            const transaction = { symbol, quantity, price: data.latestPrice }   
            if (!price) {
                this.setState({ error: "Symbol not found" })
            } else if (price * parseInt(quantity) > amount) {
                this.setState({ error: "Not enough cash" })
            } else {
                this.props.createTransaction(transaction)
                this.setState({ error: "", symbol: "", quantity: "" })
            }   
        }); //2
    }
    render(){
        const {holdings, amount} = this.props
        const holdingsLis = holdings.map((holding, idx) => (
            <li key={idx}>{holding.symbol} - {holding.quantity} shares</li>
        ))
        
        return(
            <div className="portfolio">
            <div className="title">Portfolio</div>
            <div>
                <div className="holdings">
                    {/* <div className="subtitle">Holdings</div> */}
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
        holdings: Object.values(entities.holdings)
    }
}

const mdp = (dispatch) => {
    return {
        createTransaction: transaction => dispatch(createTransaction(transaction)),
    }
}

export default connect(msp, mdp)(Portfolio)