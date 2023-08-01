import './index.css'

const TransactionOptionBtn = props => {
  const {details, isActive, changeTheActiveTransactionOptionId} = props
  const {displayText, optionId} = details
  const onClickTransactionTab = () => {
    changeTheActiveTransactionOptionId(optionId)
  }
  const activeTransactionClassName = isActive && 'active-transaction-btn'
  return (
    <li>
      <button
        type="button"
        onClick={onClickTransactionTab}
        className={`transaction-btn ${activeTransactionClassName}`}
      >
        {displayText}
      </button>
    </li>
  )
}

export default TransactionOptionBtn
