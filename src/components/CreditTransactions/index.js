import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import TransactionItem from '../TransactionItem'

const APIConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class CreditTransactions extends Component {
  state = {
    creditTransactionsData: [],
    transactionsApiStatus: APIConstants.initial,
  }

  componentDidMount() {
    this.getTheCreditTransactions()
  }

  getTheCreditTransactions = async () => {
    this.setState({transactionsApiStatus: APIConstants.inProcess})
    const userId = Cookies.get('userId')
    const role = userId === '3' ? 'admin' : 'user'
    const url =
      'https://bursting-gelding-24.hasura.app/api/rest/all-transactions?offset=0&limit=50'
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': `${role}`,
        'x-hasura-user-id': `${userId}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedAllTransactions = data.transactions.map(eachTransaction => ({
        amount: eachTransaction.amount,
        category: eachTransaction.category,
        date: eachTransaction.date,
        id: eachTransaction.id,
        transactionName: eachTransaction.transaction_name,
        type: eachTransaction.type,
        userId: eachTransaction.user_id,
      }))
      const creditTransactions = updatedAllTransactions.filter(
        eachTransaction => eachTransaction.type === 'credit',
      )
      this.setState({
        creditTransactionsData: creditTransactions,
        transactionsApiStatus: APIConstants.success,
      })
    }
  }

  renderLoadingView = () => (
    <div className="credit-debit-loader-container">
      <Loader type="ThreeDots" color="#2D60FF" height="50" width="50" />
    </div>
  )

  renderCreditTransactionsSuccessView = () => {
    const {creditTransactionsData} = this.state
    return (
      <div className="all-transactions-card">
        <div className="all-transaction-table-headings-container">
          <p className="transactions-table-headings-name">Transaction Name</p>
          <p className="transactions-table-headings-category">Category</p>
          <p className="transactions-table-headings-date">Date</p>
          <p className="transactions-table-headings-amount">Amount</p>
        </div>
        <ul className="all-transaction-list-container">
          {creditTransactionsData.map(eachTransactionDetails => (
            <TransactionItem
              details={eachTransactionDetails}
              key={eachTransactionDetails.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderCreditTransactionsViews = () => {
    const {transactionsApiStatus} = this.state
    switch (transactionsApiStatus) {
      case APIConstants.success:
        return this.renderCreditTransactionsSuccessView()
      case APIConstants.inProcess:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.renderCreditTransactionsViews()}</div>
  }
}

export default CreditTransactions
