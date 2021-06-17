import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './User'

class Leaderboards extends Component {
    render() {
        return (
           <div className ="container center">
               <h2> Leaderboards </h2>
               <ul>
               {this.props.users.map((user) => (
                  <li key={user}>
                  <User id={user}/>
                  </li>              
                ))}
                </ul>
           </div>
        )
    }
}

function mapStateToProps({ users }) {
  const allUsers = Object.keys(users)
  .sort((a, b) =>
      (users[b].questions.length +
      Object.keys(users[b].answers).length) -
      (users[a].questions.length +
      Object.keys(users[a].answers).length)
  )
  return {
    users: allUsers,
  }
}

export default connect(mapStateToProps)(Leaderboards)
