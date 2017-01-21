import React from 'react'

class LogoutPage extends React.Component {
  componentDidMount() {
    auth.logout()
  }

  render() {
    return <p>You are now logged out</p>
  }
}

export default LogoutPage
