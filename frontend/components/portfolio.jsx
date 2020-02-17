import React from 'react'
import { connect } from 'react-redux'
import {createTransaction} from '../actions/transaction_actions'

class Portfolio extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            symbol: "",
            quantity: "",
            error: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount(){
        // this.fetchData()
    }
    handleChange(field){
        return e => {
            this.setState({[field]: e.target.value})
        }
    }
    handleSubmit(e){
        e.preventDefault()
        const {symbol, quantity} = this.state
        const transaction = {symbol, quantity: parseInt(quantity), price: 101.23}
        symbol = "oij"
        const price = this.fetchData(symbol)
        if (price){
            this.props.createTransaction(transaction)
        } else {
            this.setState({error: "Symbol not found"})
        }
    }
    fetchData(symbol){ 
        // .toUpperCase()
        // encodeURI() //for non-ASCII chars
        var request = new XMLHttpRequest()
        request.open('GET', `https://cloud.iexapis.com/stable/stock/${symbol}/quote/latestPrice?token=${iexAPIKey}`, true) //true => means async
        // data weighting 2 per symbol Open/Close
        // latestPrice, open, close
        // symbols = goog, aapl
        // oij = fake symbol
        request.onload = function () {
            var data = JSON.parse(this.response)
            console.log(data)
            if (request.status >= 200 && request.status < 400) {
                debugger 
                //data
            } else { //e.g 404 Not Found
                    console.log('error')
            }
        }
        request.send()
    }
    render(){
        return(
            <div className="portfolio">
            <div className="title">Portfolio</div>
            <div>
                <div className="holdings">
                    <div className="subtitle">Holdings</div>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="subtitle">Buy Stocks</div>
                    <div className="form-group">
                        <label htmlFor="symbol">Symbol</label>
                        <input id="symbol" className="form-control" value={this.state.symbol} onChange={this.handleChange("symbol")} type="text" placeholder="Symbol" required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                            <input id="quantity" className="form-control" value={this.state.quantity} onChange={this.handleChange("quantity")} type="text" placeholder="Quantity" required/>
                    </div>
                    <input className="blue-button" type="submit" value="Submit" />
                </form>
            </div>
            </div>
        )
    }
}

const msp = (state) => {
    return {
        holdings: state.entities.holdings
    }
}

const mdp = (dispatch) => {
    return {
        createTransaction: transaction => dispatch(createTransaction(transaction))
    }
}

export default connect(msp, mdp)(Portfolio)