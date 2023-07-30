import {Component} from 'react'

import SideTabItem from '../SideTabItem'
import ProfileDetails from '../ProfileDetails'
import './index.css'

const sideTabsList = [
  {
    tabId: 'DASHBOARD',
    imageUrl:
      'https://res.cloudinary.com/dx3vswge0/image/upload/v1690710778/home_2_bqqm3s.jpg',
    displayText: 'Dashboard',
  },
  {
    tabId: 'TRANSACTIONS',
    imageUrl:
      'https://res.cloudinary.com/dx3vswge0/image/upload/v1690710963/transfer_1_da1kzd.png',
    displayText: 'Transactions',
  },
  {
    tabId: 'PROFILE',
    imageUrl:
      'https://res.cloudinary.com/dx3vswge0/image/upload/v1690711082/user_3_1_od0sla.png',
    displayText: 'Profile',
  },
]

class SideBar extends Component {
  state = {
    activeTabId: sideTabsList[0].tabId,
  }

  clickTabItem = tabValue => {
    this.setState({activeTabId: tabValue})
  }

  render() {
    const {activeTabId} = this.state
    return (
      <div className="sidebar-container">
        <div className="top-container">
          <div className="logo-container">
            <img
              className="logo"
              src="https://res.cloudinary.com/dx3vswge0/image/upload/v1690707583/Group_rpg3yg.jpg"
              alt="logo"
            />
            <div>
              <h1 className="logo-title-one">
                Money <span className="logo-title-two">Matters</span>
              </h1>
            </div>
          </div>
          <ul>
            {sideTabsList.map(each => (
              <SideTabItem
                key={each.tabId}
                details={each}
                clickTabItem={this.clickTabItem}
                isActive={activeTabId === each.tabId}
              />
            ))}
          </ul>
        </div>

        <div className="bottom-container">
          <ProfileDetails />
        </div>
      </div>
    )
  }
}

export default SideBar
