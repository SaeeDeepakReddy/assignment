import {Component} from 'react'
import Popup from 'reactjs-popup'
import {format} from 'date-fns'
import {RxCross2} from 'react-icons/rx'
import {PiWarning} from 'react-icons/pi'

import './index.css'

class DTransactionItem extends Component {
  onDelete = async () => {
    const {details} = this.props
    const {id} = details
    const data = {id: `{${id}}`}
    const url =
      'https://bursting-gelding-24.hasura.app/api/rest/delete-transaction'
    const options = {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret':
          'g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF',
        'x-hasura-role': 'user',
        'x-hasura-user-id': 1,
      },
      body: JSON.stringify(data),
    }
    await fetch(url, options)
  }

  render() {
    const {details} = this.props
    const {type, transactionName, category, amount, date} = details
    const arrowIcon =
      type === 'credit'
        ? 'https://res.cloudinary.com/dx3vswge0/image/upload/v1690795493/Group_326_vroarb.jpg'
        : 'https://res.cloudinary.com/dx3vswge0/image/upload/v1690795404/Group_328_hv8ebe.jpg'
    const amountIcon = type === 'credit' ? '+$' : '-$'
    const amountClassName = type === 'credit' ? 'credit' : 'debit'
    const formattedDate = format(new Date(date), 'dd MMM, hh.mm a')
    console.log(formattedDate)
    return (
      <li className="transaction-item-container">
        <img
          src={arrowIcon}
          alt={type}
          className="transaction-item-arrow-icon"
        />
        <p className="transaction-item-title">{transactionName}</p>
        <p className="transaction-item-category">{category}</p>
        <p className="transaction-item-date">{formattedDate}</p>
        <p className={`transaction-item-amount ${amountClassName}`}>
          {amountIcon}
          {amount}
        </p>
        <div>
          <Popup
            modal
            trigger={
              <button
                type="button"
                className="transaction-item-btn"
                onClick={this.onDelete}
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
                          This transaction will be deleted immediately. You
                          can’t undo this action.
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
                        onClick={this.onDelete}
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
        <button type="button" className="transaction-item-btn">
          <img
            className="transaction-item-edit"
            src="https://res.cloudinary.com/dx3vswge0/image/upload/v1690796501/pencil-02_yr8epa.jpg"
            alt="edit"
          />
        </button>
      </li>
    )
  }
}

export default DTransactionItem
