import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleAddQuestion } from '../Actions/shared'

class CreatePoll extends Component {

    state = {
        redirect: false,
        optOne: "",
        optTwo: ""

    }

    handleOne = (e) => {
        const text = e.target.value
        this.setState(() => ({
            optOne: text
        }))
    }

    handleTwo = (e) => {
        const text = e.target.value
        this.setState(() => ({
            optTwo: text
        }))
    }

    handleSubmit = (e) => {
      e.preventDefault()
      const { dispatch } = this.props
      const { optOne, optTwo } = this.state
      if (optOne !== "" && optTwo !== ""){
        dispatch(handleAddQuestion(optOne, optTwo))
        this.setState(() => ({
         redirect: true,
         optOne: "",
         optTwo: ""
        }))
      }
    } 

    render() {
        const { redirect, optOne, optTwo } = this.state
        if (redirect === true) {
           return <Redirect to="/" />
        }
        return (
            <div className= "container">
            <h1 className = "center">Would you Rather</h1>
            <form className ="new-wyr" onSubmit ={this.handleSubmit}>
                <textarea
                placeholder="Option 1"
                value={optOne}
                onChange={this.handleOne}
                className='textarea'
                />
                <h2 className="center" style={{color:'red'}}>OR</h2>
                <textarea
                placeholder="Option 2"
                value={optTwo}
                onChange={this.handleTwo}
                className='textarea'
                />
                <button
                className='btn'
                type='submit'
                disabled={optOne.length === 0 || optTwo.length === 0}>
                Submit Poll
                </button>
            </form>
            </div>
        )
    }
}

export default connect()(CreatePoll)
