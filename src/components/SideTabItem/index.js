import {Link} from 'react-router-dom'
import './index.css'

const SideTabItem = props => {
  const {details, isActive, clickTabItem} = props
  const {imageUrl, displayText, tabId, activeUrl, link} = details

  const onClickTabItem = () => {
    clickTabItem(tabId)
  }

  const activeTabBtnClassName = isActive ? 'active-tab-btn' : ''
  const activeText = isActive ? 'active-tab-text' : ''
  const iconSrc = isActive ? activeUrl : imageUrl
  return (
    <Link to={link} className="tab-link">
      <li className={`tab-item ${activeTabBtnClassName}`}>
        <button type="button" onClick={onClickTabItem} className="tab-btn">
          <img src={iconSrc} alt={displayText} className="tab-img" />
          <p className={`tab-text ${activeText}`}>{displayText}</p>
        </button>
      </li>
    </Link>
  )
}

export default SideTabItem
