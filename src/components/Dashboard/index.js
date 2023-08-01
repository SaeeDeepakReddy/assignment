import {Component} from 'react'

import NavSideBar from '../NavSideBar'
import Header from '../Header'
import TotalCDs from '../TotalCDs'
import TopTransactions from '../TopTransactions'
import BarGraph from '../BarGraph'

import './index.css'

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <NavSideBar tabId="DASHBOARD" />
        <div>
          <Header name="Accounts" />
          <div className="dashboard-right-bottom-container">
            <TotalCDs />
            <h1 className="last-transaction-title">Last Transaction</h1>
            <div className="transactions-container">
              <TopTransactions />
            </div>
            <h1 className="overview-title">Debit & Credit Overview</h1>
            <div className="bar-graph-container">
              <BarGraph />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
