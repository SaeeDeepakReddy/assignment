import {Component} from 'react'

import './index.css'

class TotalCDs extends Component {
  state = {
    credit: '',
    debit: '',
  }

  componentDidMount() {
    this.getTotalCrDeb()
  }

  getTotalCrDeb = async () => {
    const url =
      'https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals'
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'user',
        'x-hasura-user-id': '1',
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const credited = data.totals_credit_debit_transactions.filter(
        each => each.type === 'credit',
      )
      const debited = data.totals_credit_debit_transactions.filter(
        each => each.type === 'debit',
      )
      console.log(debited[0].sum)

      this.setState({credit: credited[0].sum, debit: debited[0].sum})
    }
  }

  render() {
    const {credit, debit} = this.state
    return (
      <div className="total-cd-container">
        <div className="credit-container">
          <div>
            <h1 className="credit-amount">${credit}</h1>
            <p className="credit-title">Credit</p>
          </div>
          <img
            className="credit-img"
            src="https://res.cloudinary.com/dx3vswge0/image/upload/v1690739388/Group_1_igzf7l.jpg"
            alt="credit"
          />
        </div>
        <div className="credit-container">
          <div>
            <h1 className="debit-amount">${debit}</h1>
            <p className="credit-title">Debit</p>
          </div>
          <img
            className="credit-img"
            src="https://res.cloudinary.com/dx3vswge0/image/upload/v1690740606/Group_2_jescp2.jpg"
            alt="debit"
          />
        </div>
      </div>
    )
  }
}

export default TotalCDs
