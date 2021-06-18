import React, { Component } from 'react'
import { connect } from 'react-redux'
import Poll from './Poll'

class Dashboard extends Component {

    state = {
        showAnsweredQs: false
    }

    handleShowAnswered = () => {
        this.setState(() => ({
            showAnsweredQs: true
        }))
    }

     handleShowUnanswered = () => {
        this.setState(() => ({
            showAnsweredQs: false
        }))
    }

    render() {

        const { showAnsweredQs } = this.state
        const { answeredQs, unAnsweredQs } = this.props

        return (
            <div className = "container center">
                <button className = "btn-db" onClick={this.handleShowUnanswered}>
                    Unanswered
                </button>
                <button className = "btn-db" onClick={this.handleShowAnswered}>
                    Answered
                </button>
                
                {!showAnsweredQs && (
                    <div className ="container">
                        <h2 className ="center bold"> Viewing Unanswered Polls</h2>
                        <ul>
                            {unAnsweredQs.map((q) => (
                                <li key ={q}>
                                    <Poll id={q}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {showAnsweredQs && (
                    <div className ="container">
                        <h2 className ="center bold"> Viewing Answered Polls</h2>
                        <ul>
                            {answeredQs.map((q) => (
                                <li key ={q}>
                                    <Poll id={q}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        )
    }
}

function mapStateToProps({ questions, authedUser }) {
  let yesQ = Object.keys(questions).filter((q) => {
      let q1 = questions[q].optionOne.votes
      let q2 = questions[q].optionTwo.votes
    if ((q1.includes(authedUser)) || (q2.includes(authedUser))) {
      return q
    }
  })

  let noQ = Object.keys(questions).filter((q) => {
    let q1 = questions[q].optionOne.votes
    let q2 = questions[q].optionTwo.votes
    if (!(q1.includes(authedUser)) && (!q2.includes(authedUser))) {
      return q
    }
  })
  return {
    answeredQs:  yesQ.sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    unAnsweredQs: noQ.sort((a, b) => questions[b].timestamp - questions[a].timestamp),
  }
}

export default connect(mapStateToProps)(Dashboard)
