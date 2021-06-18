import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../Actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends Component {
   state = {
        redirect: false,
        logged: ""
      }
        
        
    handleClick (user) {
       this.setState(() => ({
         logged: user
       }))
    }

    handleLogin (e) {
      e.preventDefault()
      const { dispatch } = this.props
      if (this.state.logged !== ""){
      dispatch(setAuthedUser(this.state.logged))
       this.setState(() => ({
         logged: "",
         redirect: true
       }))
      }
          }  

  render() {
        const { users } = this.props
         if (this.state.redirect === true) {
           return <Redirect to="/" />
    }

        return (
            <div className = "container login-page center ">
                <div className = "center bold" >Welcome to my Would You Rather App</div>
                <div className = "center"> Please Select a user to continue</div>
                <div className = "center"><img className = "logo" src = {require('../Assets/logo.jpg')} alt = "logo"/></div>
               <ul >
                 {users.map((user) => (
                   <li key={user}>
                   <button className="btn-users" onClick={() => this.handleClick(user)}>
                 {user}
                </button></li>
                 ))}
               </ul>
               <button onClick = {(e) => this.handleLogin(e)} className = 'btn'> Login</button>
             </div>
        )
    }
}

function mapStateToProps({ users }) {
  return {
    users: Object.keys(users)
  }
}

export default connect(mapStateToProps)(Login)