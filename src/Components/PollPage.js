import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../Utils/helpers'
import { handleAddAnswer } from '../Actions/shared'
import Error from './Error'

class PollPage extends Component {

    state = {
        response: "",
        done: this.props.answered
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

    handleSubmit(e){
        e.preventDefault()

        
        const { response } = this.state
        const { dispatch, question } = this.props
                
        dispatch(handleAddAnswer(question.id, response))

        this.setState(() => ({
            done : true
        }))
    }

    render() {

        const { question, answer, hasAnswerOne, hasAnswerTwo } = this.props
        if (question === null) {
            return (
            <Error/>
            )
        }

        const {
            name,
            avatar,
            optionOne,
            optionTwo,
        } = question
        
        const { response, done } = this.state
     
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
                
                   { !done && (
                        <div className ="center container">
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
                    )}
                    {done &&  ( <div className ="center container wyr" style={{border: "3px solid purple"}}>
                           {(hasAnswerOne || response === "optionOne") && (
                               <div>
                               <h3 className="active bold" > Your Answer is {optionOne.text}</h3>
                               <div>{optionOne.votes.length} chose this answer</div>
                               <div>{(optionOne.votes.length)/(optionOne.votes.length + optionTwo.votes.length) *100}% of players chose this answer</div> 
                               <div>{optionTwo.votes.length} chose the other answer</div>
                               <div>{(optionTwo.votes.length)/(optionOne.votes.length + optionTwo.votes.length) *100}% of players chose this answer</div> 
                               </div>
                           )}
                           {(hasAnswerTwo || response === "optionTwo") && (
                               <div>
                               <h3 className="active bold" > Your Answer is {optionTwo.text}</h3>
                               <div>{optionTwo.votes.length} chose this answer</div>
                               <div>{(optionTwo.votes.length)/(optionOne.votes.length + optionTwo.votes.length) *100}% of players chose this answer</div> 
                               <div>{optionOne.votes.length} chose the other answer</div>
                               <div>{(optionOne.votes.length)/(optionOne.votes.length + optionTwo.votes.length) *100}% of players chose this answer</div> 
                               </div>
                           )}
                        </div>
                    )
                }            
            </div>
        )
    }
}

function mapStateToProps({authedUser, questions, users}, props) {
    const { id } = props.match.params
    const question = questions[id]
    const keys = Object.keys(users[authedUser].answers)
    const answer = users[authedUser].answers
    const hasAnswerOne = questions[id].optionOne.votes.includes(authedUser)
    const hasAnswerTwo = questions[id].optionTwo.votes.includes(authedUser) 

    return {
        authedUser,
        question: question ? formatQuestion(question, users[question.author], authedUser)
        : null,
        answer,
        answered: keys.includes(id),
        hasAnswerOne,
        hasAnswerTwo

    }
}

export default connect(mapStateToProps)(PollPage)