import format from 'date-fns/format'

import {BiUpArrowCircle, BiDownArrowCircle} from 'react-icons/bi'
import Popup from 'reactjs-popup'
import {withRouter} from 'react-router-dom'
import {PiWarning} from 'react-icons/pi'
import Cookies from 'js-cookie'

import {RxCross2} from 'react-icons/rx'

import './index.css'

const TransactionItem = props => {
  const onDelete = async () => {
    const {details} = props
    const {id} = details
    const data = {id: `{${id}}`}
    const userId = Cookies.get('userId')
    const role = userId === '3' ? 'admin' : 'user'
    const url =
      'https://bursting-gelding-24.hasura.app/api/rest/delete-transaction'
    const options = {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': `${role}`,
        'x-hasura-user-id': `${userId}`,
      },
      body: JSON.stringify(data),
    }
    await fetch(url, options)
  }
  const {details} = props
  const {id, type, transactionName, category, date, amount} = details
  const dateDetails = format(new Date(date), 'dd MMM, hh.mm a')
  const amountText = type === 'credit' ? `+$${amount}` : `-$${amount}`
  const amountTextClassName = type === 'credit' ? 'credit' : 'debit'
  return (
    <li className="all-transaction-item-container">
      <div className="transaction-item-arrow-icon">
        {type === 'credit' ? (
          <BiUpArrowCircle size="30px" color="#718EBF" />
        ) : (
          <BiDownArrowCircle size="30px" color="#718EBF" />
        )}
      </div>
      <p className="all-transaction-item-title">{transactionName}</p>
      <p className="all-transaction-item-category">{category}</p>
      <p className="all-transaction-item-date">{dateDetails}</p>
      <p className={`all-transaction-item-amount ${amountTextClassName}`}>
        {amountText}
      </p>
      <button type="button" className="transaction-item-btn">
        <img
          className="transaction-item-edit"
          src="https://res.cloudinary.com/dx3vswge0/image/upload/v1690796501/pencil-02_yr8epa.jpg"
          alt="edit"
        />
      </button>
      <div>
        <Popup
          modal
          trigger={
            <button
              type="button"
              className="transaction-item-btn"
              onClick={onDelete}
            >
              <img
                src="https://res.cloudinary.com/dx3vswge0/image/upload/v1690796695/trash-01_ngnsgt.jpg"
                alt="delete"
                className="transaction-item-delete"
              />
            </button>
          }
        >
          {close => (
            <>
              <div className="pop-up-container">
                <div className="pop-up-card-container">
                  <div className="pop-up-top-container">
                    <div className="pop-up-warning-container">
                      <PiWarning className="pop-up-warning-icon" />
                    </div>
                    <div>
                      <p className="pop-up-query">
                        Are you sure you want to Delete?
                      </p>
                      <p className="pop-up-desc">
                        This transaction will be deleted immediately. You can’t
                        undo this action.
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
                      className="pop-up-warning-btn"
                      type="button"
                      onClick={onDelete}
                    >
                      Yes,Delete
                    </button>
                    <button
                      type="button"
                      className="pop-up-cancel"
                      onClick={() => close()}
                    >
                      No Leave it
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </Popup>
      </div>
    </li>
  )
}

export default withRouter(TransactionItem)
