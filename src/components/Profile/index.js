import {Component} from 'react'
import NavSideBar from '../NavSideBar'
import Header from '../Header'
import './index.css'

class Profile extends Component {
  state = {
    profileData: [],
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    const url = 'https://bursting-gelding-24.hasura.app/api/rest/profile'
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
      const fetchedData = await response.json()
      const profileData = fetchedData.users[0]
      const updatedData = {
        name: profileData.name,
        email: profileData.email,
        country: profileData.country,
        dob: profileData.date_of_birth,
        city: profileData.city,
        permanentAddress: profileData.permanent_address,
        postalCode: profileData.postal_code,
        presentAddress: profileData.present_address,
      }
      this.setState({profileData: updatedData})
    }
  }

  render() {
    const {profileData} = this.state
    const {
      name,
      email,
      country,
      dob,
      city,
      permanentAddress,
      postalCode,
      presentAddress,
    } = profileData
    return (
      <div className="dashboard-container">
        <NavSideBar tabId="PROFILE" />
        <div>
          <Header name="Profile" />
          <div className="B">
            <div className="A">
              <img
                src="https://res.cloudinary.com/dx3vswge0/image/upload/v1690821065/pexels-christina-morillo-1181690_1_tpg02u.png"
                alt="profile"
              />
            </div>
            <div className="C">
              <div>
                <label htmlFor="name">Your Name</label>
                <br />
                <input
                  style={{borderRadius: '8px'}}
                  type="text"
                  id="name"
                  placeholder={name}
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <br />
                <input
                  style={{borderRadius: '8px'}}
                  type="email"
                  id="email"
                  placeholder={email}
                />
              </div>
              <div>
                <label htmlFor="date">Date of Birth</label>
                <br />
                <input
                  id="date"
                  style={{borderRadius: '8px'}}
                  type="text"
                  placeholder={dob}
                />
              </div>
              <div>
                <label htmlFor="address">Permanent Address</label>
                <br />
                <input
                  style={{borderRadius: '8px'}}
                  type="text"
                  id="address"
                  placeholder={permanentAddress}
                />
              </div>
              <div>
                <label htmlFor="post">Postal Code</label>
                <br />
                <input
                  style={{borderRadius: '8px'}}
                  type="number"
                  id="post"
                  placeholder={postalCode}
                />
              </div>
            </div>
            <div className="D">
              <div>
                <label htmlFor="username">User Name</label>
                <br />
                <input
                  style={{borderRadius: '8px'}}
                  type="text"
                  id="username"
                  placeholder={name}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <br />
                <input
                  style={{borderRadius: '8px'}}
                  type="password"
                  id="password"
                  placeholder="***********"
                />
              </div>
              <div>
                <label htmlFor="paddress">Permanent Address</label>
                <br />
                <input
                  style={{borderRadius: '8px'}}
                  type="text"
                  id="paddress"
                  placeholder={presentAddress}
                />
              </div>
              <div>
                <label htmlFor="city">City</label>
                <br />
                <input
                  style={{borderRadius: '8px'}}
                  type="text"
                  id="city"
                  placeholder={city}
                />
              </div>
              <div>
                <label htmlFor="country">Country</label>
                <br />
                <input
                  style={{borderRadius: '8px'}}
                  type="text"
                  placeholder={country}
                  id="country"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile
