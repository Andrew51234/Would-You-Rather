import React, { Component } from 'react'
import { connect } from 'react-redux'
class User extends Component {
    render() {
        const { name, image, numQs, numAs } = this.props
        return (
            <div className ="wyr center container">
            <img className="avatar" src={image} alt={`Avatar of ${name}`} />
            <div className=" lb-container center">
            <h1>{name}</h1>
            <h3>
            Polls Added: {numQs}
          </h3>
            <h3 >
            Polls Answered: {numAs}
          </h3>
          
          <h1 className="active">
            Total score: {numQs + numAs}
          </h1>
        </div>
            </div>
        )
    }
}


function mapStateToProps({ users }, { id }) {
    const { name, avatarURL, answers, questions } = users[id]
  return {
     name : name,
     image: avatarURL,
     numQs: questions.length,
     numAs: Object.keys(answers).length,
  }
}

export default connect(mapStateToProps)(User)