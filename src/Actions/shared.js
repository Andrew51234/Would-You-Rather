import { getInitialData, saveQuestion, saveQuestionAnswer} from '../Utils/api'
import { receiveQuestions, addQuestion, answerQuestion } from './questions'
import { receiveUsers, addUserQuestion, addUserAnswer } from './users'
import { setAuthedUser } from './authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

const AUTHED_ID = 'player'

export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
        .then(({users, questions}) => {
            dispatch(receiveUsers(users))
            dispatch(receiveQuestions(questions))
            dispatch(setAuthedUser(AUTHED_ID))
            dispatch(hideLoading())
        })
    }
}

export function handleAddQuestion (optOne, optTwo) {
    return (dispatch, getState) => {
        const authedUser = getState()
        dispatch(showLoading())
        return saveQuestion({
            author: authedUser,
            optionOneText: optOne,
            optionTwoText: optTwo,        
        })
        .then((question) => {
            dispatch(addQuestion(question))
            dispatch(addUserQuestion(authedUser, question.id))
        })
        .then(() => dispatch(hideLoading()))
    }
}

export function handleAddAnswer (qid, answer) {
    return (dispatch, getState) => {
        const authedUser = getState()
        const choice = answer
        dispatch(showLoading())
        return saveQuestionAnswer({authedUser, qid, choice})
        .then(() => {
            dispatch(answerQuestion({qid, authedUser, choice}))
            dispatch(addUserAnswer(authedUser, qid, choice))
        })
        .then(() => dispatch(hideLoading()))
    }
}