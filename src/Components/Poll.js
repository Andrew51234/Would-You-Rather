import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../Utils/helpers'
import { Link, withRouter } from 'react-router-dom'
import Error from './Error'

class Poll extends Component {
    render() {

        const { question } = this.props

        if( question === null ){
            return <Error/>
        }

        const { id,
                optionOne,
                optionTwo,
                name,
                avatar,
              } = question

        return (
            <Link to ={`/questions/${id}`} className="wyr container">
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
            </Link>
        )
    }
}

function mapStateToProps({authedUser, users, questions}, {id}) {
    const question = questions[id]
    
    return {
        authedUser,
        question: question ? formatQuestion(question, users[question.author], authedUser)
        : null 
    }
}

export default withRouter(connect(mapStateToProps)(Poll))