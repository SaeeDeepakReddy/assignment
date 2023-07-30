import './index.css'

const SideTabItem = props => {
  const {details, isActive, clickTabItem} = props
  const {imageUrl, displayText, tabId} = details

  const onClickTabItem = () => {
    clickTabItem(tabId)
  }

  const activeTabBtnClassName = isActive ? 'active-tab-btn' : ''
  const activeText = isActive ? 'active-tab-text' : ''
  return (
    <li className={`tab-item ${activeTabBtnClassName}`}>
      <button type="button" onClick={onClickTabItem} className="tab-btn">
        <img src={imageUrl} alt={displayText} className="tab-img" />
        <p className={`tab-text ${activeText}`}>{displayText}</p>
      </button>
    </li>
  )
}

export default SideTabItem
