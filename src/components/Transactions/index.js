import {Component} from 'react'

import NavSideBar from '../NavSideBar'
import Header from '../Header'
import Transaction from '../Transaction'
import './index.css'

class Transactions extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <NavSideBar tabId="TRANSACTIONS" />
        <div>
          <Header name="Transactions" />
          <Transaction />
        </div>
      </div>
    )
  }
}

export default Transactions
