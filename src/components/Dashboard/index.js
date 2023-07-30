import {Component} from 'react'

import SideBar from '../SideBar'
import Header from '../Header'
import TotalCDs from '../TotalCDs'

import './index.css'

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-container">
        <SideBar />
        <div>
          <Header />
          <div className="dashboard-right-bottom-container">
            <div>
              <TotalCDs />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Dashboard
