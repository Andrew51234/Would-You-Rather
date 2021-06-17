import React from "react"
import { NavLink } from "react-router-dom"
import { GrLogout } from "react-icons/gr/index"

export default function NavBar({ authedUser }) {
  return (
    <nav className="nav">
      <ul style={{ backgroundColor: "#000000" }}>
        <li className="navItem">
          <NavLink to="/" exact activeClassName="active">
            <span style={{ color: "#fff" }}>Home</span>
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink to="/add" exact activeClassName="active">
            <span style={{ color: "#fff" }}>New Question</span>
          </NavLink>
        </li>
        <li className="navItem">
          <NavLink to="/leaderboard" exact activeClassName="active">
            <span style={{ color: "#fff" }}>Leaderboard</span>
          </NavLink>
        </li>
        <li style={{ paddingLeft: "60%" }}></li>
        <li>
          <span style={{ color: "#fff" }}>Hello, {authedUser}</span>
        </li>
        <li style={{ backgroundColor: "#ffffff" }}>
          <NavLink to="/login" exact activeClassName="active">
            <GrLogout />
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}