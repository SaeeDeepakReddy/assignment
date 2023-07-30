import './index.css'

const NotFound = props => {
  const onLogOut = () => {
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
        alt="not-found"
        className="not-found-img"
      />
      <button type="button" onClick={onLogOut}>
        Logout
      </button>
    </div>
  )
}

export default NotFound
