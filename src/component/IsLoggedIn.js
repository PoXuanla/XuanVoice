import Login from '../pages/login'

const IsLoggedIn = ({ children }) => {
  const isLoggin = localStorage.getItem('isLoggedIn')
  return isLoggin === 'true' ? children : <Login />
}
export default IsLoggedIn
