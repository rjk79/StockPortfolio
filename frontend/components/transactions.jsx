import React from 'react'
import { connect } from 'react-redux'


class Transactions extends React.Component {
    componentDidMount(){
        
    }
    render() {
        const {transactions} = this.props
        let transactionLis = transactions.map((transaction,idx)=>(
            <li key={idx}>BUY ({transaction.symbol}) - {transaction.quantity} shares @ ${transaction.price}</li>
        ))
        return (
            <>
            <div className="transactions">

            <div className="title">Transactions</div>
            <ul>
                {transactionLis}
            </ul>
            </div>
            </>
        )
    }
}



const msp = (state) => {
    
    const {session} = state
    let transactions = Object.values(state.entities.transactions)
    transactions.sort((a,b) => {
        if (a.id > b.id) {
            return 1 //a comes first
        }
        if (a.id < b.id) {
            return -1 
        }
        else {
            return 0
        }
    })
    return {
        transactions 
    }
}

const mdp = (dispatch) => {
    return {
    }
}

export default connect(msp, mdp)(Transactions)
