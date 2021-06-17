import { NavLink } from "react-router-dom"
import React, { Component } from 'react'

export default class NavBar extends Component {

  // state = {
  //   authedUser: this.props.authedUser
  // }

  // handleLogout = (e) => {
  //   e.preventDefault()

  //   const { dispatch } = this.props
  //   const { authedUser } = this.state

  //   this.setState(() => ({
  //        authedUser: ''
  //       }))
  // }

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
          <NavLink to="/leaderboards" exact activeClassName="active">
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
