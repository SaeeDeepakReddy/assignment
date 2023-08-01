import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import DTransactionItem from '../DTransactionItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TopTransactions extends Component {
  state = {
    transactionsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTransactions()
  }

  getTransactions = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const userId = Cookies.get('userId')
    const role = userId === '3' ? 'admin' : 'user'
    const url =
      'https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=3&offset=0'
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
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.transactions.map(each => ({
        id: each.id,
        transactionName: each.transaction_name,
        category: each.category,
        date: each.date,
        amount: each.amount,
        type: each.type,
      }))
      this.setState({
        apiStatus: apiStatusConstants.success,
        transactionsList: updatedData,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = () => (
    <img
      src="https://res.cloudinary.com/dx3vswge0/image/upload/v1690785228/fail_api_image_r7a1cz.png"
      alt="failure"
      className="failure-img"
    />
  )

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderTransactionsList = () => {
    const {transactionsList} = this.state
    return (
      <ul>
        {transactionsList.map(each => (
          <DTransactionItem key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderTransactionsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default TopTransactions
