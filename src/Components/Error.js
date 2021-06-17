import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
class Error extends Component {
    render() {
        return (
            <div>
                <h1 style={{color: 'green'}}>Error 404: page not found</h1>
                 <NavLink to='/'>
                    <div>Back to home</div>
                 </NavLink>
                 <img src={ require('../Assets/errorGif.gif') } alt="error" />
            </div>
        )
    }
}

export default Error
