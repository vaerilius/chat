import React, { useEffect, Props } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { loginUser } from './reducers/userReducer'

const App = (props: any): any => {
  useEffect(() => {
    props.loginUser()
  }, [])
  return (
    <div className='App'>
      <header className='App-header'>
        <h1 className='App-logo'>{props.user && props.user.user.name}</h1>
      </header>
    </div>
  )
}

const mapStateToProps = (state: any) => {
  console.log(state)

  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { loginUser })(App)
