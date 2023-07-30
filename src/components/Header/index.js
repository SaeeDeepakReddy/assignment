import {AiOutlinePlus} from 'react-icons/ai'

import './index.css'

const Header = () => (
  <div className="header-container">
    <h1 className="title">Accounts</h1>
    <button className="add-container" type="button">
      <AiOutlinePlus />
      <p className="add-transaction-title">Add Transaction</p>
    </button>
  </div>
)

export default Header
