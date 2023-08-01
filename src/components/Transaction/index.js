import {Component} from 'react'

import TransactionOptionBtn from '../TransactionOptionBtn'
import AllTransactions from '../AllTransactions'
import CreditTransactions from '../CreditTransactions'
import DebitTransactions from '../DebitTransactions'

import './index.css'

const transactionHeaderOptionsList = [
  {
    optionId: 'All_TRANSACTIONS',
    displayText: 'All Transactions',
  },
  {
    optionId: 'DEBIT',
    displayText: 'Debit',
  },
  {
    optionId: 'CREDIT',
    displayText: 'Credit',
  },
]

class Transaction extends Component {
  state = {
    activeTransactionOptionId: transactionHeaderOptionsList[0].optionId,
  }

  changeTheActiveTransactionOptionId = id => {
    this.setState({activeTransactionOptionId: id})
  }

  renderAllTransactions = () => <AllTransactions />

  renderCreditTransactions = () => <CreditTransactions />

  renderDebitTransactions = () => <DebitTransactions />

  renderAllTransactionViews = () => {
    const {activeTransactionOptionId} = this.state
    switch (activeTransactionOptionId) {
      case transactionHeaderOptionsList[0].optionId:
        return this.renderAllTransactions()
      case transactionHeaderOptionsList[1].optionId:
        return this.renderDebitTransactions()
      case transactionHeaderOptionsList[2].optionId:
        return this.renderCreditTransactions()
      default:
        return null
    }
  }

  render() {
    const {activeTransactionOptionId} = this.state
    return (
      <div>
        <ul className="transaction-tabs-container">
          {transactionHeaderOptionsList.map(eachOption => (
            <TransactionOptionBtn
              details={eachOption}
              key={eachOption.optionId}
              isActive={activeTransactionOptionId === eachOption.optionId}
              changeTheActiveTransactionOptionId={
                this.changeTheActiveTransactionOptionId
              }
            />
          ))}
        </ul>
        <div className="transaction-bottom-container">
          {this.renderAllTransactionViews()}
        </div>
      </div>
    )
  }
}

export default Transaction
