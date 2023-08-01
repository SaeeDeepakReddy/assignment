import {AiOutlinePlus} from 'react-icons/ai'

import './index.css'

const Header = props => {
  const {name} = props
  return (
    <div className="header-container">
      <h1 className="title">{name}</h1>
      <button className="add-container" type="button">
        <AiOutlinePlus />
        <p className="add-transaction-title">Add Transaction</p>
      </button>
    </div>
  )
}
export default Header
