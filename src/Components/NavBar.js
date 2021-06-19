import { NavLink } from "react-router-dom"
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from "../Actions/authedUser"

class NavBar extends Component {

   handleLogout = (e) => {
     e.preventDefault()

     const { dispatch } = this.props
     dispatch(setAuthedUser(''))
   }

  render() {
    return (
      <nav className="nav">
      <ul>
        <li className="navItem">
          <NavLink to="/" exact activeClassName="active">
            <span>Home</span>
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink to="/add" exact activeClassName="active">
            <span>New Question</span>
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink to="/leaderboard" exact activeClassName="active">
            <span>Leaderboard</span>
          </NavLink>
        </li>
        <li>
          <span>Hello, {this.props.authedUser}</span>
        </li>
        <li>
          <NavLink to="/login" exact activeClassName="active" onClick={this.handleLogout}>
            <span>Logout</span>
          </NavLink>
        </li>
      </ul>
    </nav>
    )
  }
}

export default connect()(NavBar)
