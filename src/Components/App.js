import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../Actions/shared'
import LoadingBar from 'react-redux-loading'
import Dashboard from './Dashboard'
import Login from './Login'
import Error from './Error'
import Leaderboards from './Leaderboards'
import NavBar from './NavBar'
import CreatePoll from './CreatePoll'
import PollPage from './PollPage'

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
        <NavBar authedUser = {authedUser}/>
          <div>        
          {this.props.loading === true
            ? null
            : <div>
                <Switch>
                  <Route path ='/' exact component={Dashboard}/>
                  <Route path ='/login' component={Login}/>  
                  <Route path ='/add' component={CreatePoll}/> 
                  <Route path ='/leaderboards' component={Leaderboards}/>  
                  <Route path ='/questions/:id' component={PollPage}/>
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