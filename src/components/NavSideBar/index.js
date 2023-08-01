import {Component} from 'react'

import SideTabItem from '../SideTabItem'
import ProfileDetails from '../ProfileDetails'
import './index.css'

const sideTabsList = [
  {
    tabId: 'DASHBOARD',
    link: '/dashboard',
    activeUrl:
      'https://res.cloudinary.com/dx3vswge0/image/upload/v1690710778/home_2_bqqm3s.jpg',
    displayText: 'Dashboard',
    imageUrl:
      'https://res.cloudinary.com/dx3vswge0/image/upload/v1690779284/home_2_1_ryvyk2.jpg',
  },
  {
    tabId: 'TRANSACTIONS',
    link: '/transactions',
    imageUrl:
      'https://res.cloudinary.com/dx3vswge0/image/upload/v1690710963/transfer_1_da1kzd.png',
    displayText: 'Transactions',
    activeUrl:
      'https://res.cloudinary.com/dx3vswge0/image/upload/v1690779385/transfer_1_1_xzhbwu.jpg',
  },
  {
    tabId: 'PROFILE',
    link: '/profile',
    imageUrl:
      'https://res.cloudinary.com/dx3vswge0/image/upload/v1690711082/user_3_1_od0sla.png',
    displayText: 'Profile',
    activeUrl:
      'https://res.cloudinary.com/dx3vswge0/image/upload/v1690779478/user_3_1_gnxek9.jpg',
  },
]

class NavSideBar extends Component {
  state = {
    activeTabId: '',
  }

  componentDidMount() {
    const {tabId} = this.props
    this.setState({activeTabId: tabId})
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
        <ProfileDetails />
      </div>
    )
  }
}

export default NavSideBar
