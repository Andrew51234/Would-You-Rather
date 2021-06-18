import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../Utils/helpers'
import { handleAddAnswer } from '../Actions/shared'
import Error from './Error'

class PollPage extends Component {

    state = {
        response: ""
    }

    handleClickOne = (e) => {
        e.preventDefault()
        this.setState(() => ({
            response: 'optionOne'
        }))
    }

    handleClickTwo = (e) => {
        e.preventDefault()
        this.setState(() => ({
            response: 'optionTwo'
        }))
    }

    handleSubmit = (e) => {
        e.preventDefault()

        const { dispatch, question, answer } = this.props
        const { response } = this.state

        dispatch(handleAddAnswer(question.id, response))

        this.setState(() => ({
            response: ""
        }))
    }

    render() {

        if (!question || question === null) {
            return (
            <Error/>
            )
        }

        const { question, answer, id } = this.props

        const {
                optionOne,
                optionTwo,
                timestamp,
                name,
                avatar,
              } = question
        
        const { response } = this.state
     
        return (
            <div className="wyr container">
                <img className='avatar' src={avatar} alt ={`Avatar of ${name}`}/>
                <div className='wyr-info'>
                    <h2 className="center">{name} asked Would you Rather</h2>
                    <div className='bold center'>
                        {optionOne.text}
                    </div>
                    <div className='bold center active'>
                        OR
                    </div>
                    <div className='bold center'>
                        {optionTwo.text}
                    </div>
                </div>
                {
                    !answer ? (
                        <div className ="center container wyr">
                            <button className="btn-users" onClick={(e) => this.handleClickOne(e)}>
                                {optionOne.text}
                            </button>

                            <button className="btn-users" onClick={(e) => this.handleClickTwo(e)}>
                                {optionTwo.text}
                            </button>

                            <button className="btn" onClick={(e) => this.handleSubmit(e)} disabled={response===""}>
                                Submit Answer
                            </button>
                        </div>
                    )
                    :   <div className ="center container wyr" style={{border: "3px solid purple"}}>
                           {answer === "optionOne" && (
                               <div>
                               <h3 className="active bold" > Your Answer is {optionOne.text}</h3>
                               <div>{optionOne.votes.length} chose this answer</div>
                               <div>{(optionOne.votes.length)/(optionOne.votes.length + optionTwo.votes.length) *100}% of players chose this answer</div> 
                               </div>
                           )}
                           {answer === "optionTwo" && (
                               <div>
                               <h3 className="active bold" > Your Answer is {optionTwo.text}</h3>
                               <div>{optionTwo.votes.length} chose this answer</div>
                               <div>{(optionTwo.votes.length)/(optionOne.votes.length + optionTwo.votes.length) *100}% of players chose this answer</div> 
                               </div>
                           )}
                        </div>
                }            
            </div>
        )
    }
}

function mapStateToProps({authedUser, questions, users}, props) {
    const { id } = props.match.params
    const question = questions[id]
    const answer = users[authedUser].answers[id]

    return {
        authedUser,
        question: question ? formatQuestion(question, users[question.author], authedUser)
        : null,
        answer
    }
}

export default connect(mapStateToProps)(PollPage)