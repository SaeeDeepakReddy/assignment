import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {FiLogOut} from 'react-icons/fi'
import {RxCross2} from 'react-icons/rx'
import Popup from 'reactjs-popup'

import './index.css'

class ProfileDetails extends Component {
  state = {
    profileDetails: {},
  }

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const apiUrl = 'https://bursting-gelding-24.hasura.app/api/rest/profile'
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
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const profileData = fetchedData.users[0]
      const updatedData = {
        name: profileData.name,
        email: profileData.email,
      }
      this.setState({profileDetails: updatedData})
    }
  }

  onClickLogout = () => {
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {profileDetails} = this.state
    const {name, email} = profileDetails
    return (
      <div className="profile-container">
        <img
          className="avatar-img"
          src="https://res.cloudinary.com/dx3vswge0/image/upload/v1690721450/Avatar_y3sekd.jpg"
          alt="avatar"
        />
        <div className="details-container">
          <p className="profile-name">{name}</p>
          <p className="profile-email">{email}</p>
        </div>
        <div>
          <div>
            <Popup
              modal
              trigger={
                <button className="logout-btn" type="button">
                  <FiLogOut />
                </button>
              }
            >
              {close => (
                <>
                  <div className="pop-up-container">
                    <div className="pop-up-card-container">
                      <div className="pop-up-top-container">
                        <div className="pop-up-logout-container">
                          <FiLogOut className="pop-up-logout-icon" />
                        </div>
                        <div>
                          <p className="pop-up-query">
                            Are you sure you want to Logout?
                          </p>
                          <p className="pop-up-desc">
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed{' '}
                          </p>
                        </div>
                        <button
                          className="pop-up-cross-icon"
                          type="button"
                          onClick={() => close()}
                        >
                          <RxCross2 />
                        </button>
                      </div>
                      <div className="pop-up-btns-container">
                        <button
                          className="pop-up-logout-btn"
                          type="button"
                          onClick={this.onClickLogout}
                        >
                          Yes,Logout
                        </button>
                        <button
                          type="button"
                          className="pop-up-cancel"
                          onClick={() => close()}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </Popup>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ProfileDetails)
