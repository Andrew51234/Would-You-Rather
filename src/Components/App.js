import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../Actions/shared'
import LoadingBar from 'react-redux-loading'
import Dashboard from './Dashboard'
import Login from './Login'
import Error from './Error'
import NavBar from './NavBar'
import CreatePoll from './CreatePoll'

class App extends Component {
  componentDidMount(){
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { authedUser } = this.props
    if (authedUser === '') {
      return <Login />
    }

    return (
      <Router>
        <Fragment>
        <LoadingBar />
          <div>        
          {this.props.loading === true
            ? null
            : <div>
                <Switch>
                  <Route path ='/' exact component={Dashboard}/>
                  <Route path ='/add' component={CreatePoll}/>     
                  <Route path ='*' exact component ={Error}/>
                </Switch>      
            </div>
            }
        </div>
      </Fragment>    
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser,
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)