import * as axios from 'axios'
// import {updateHeaderEvents} from './header-reducer'
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    cameras: {
        events: 1000,
        exceptions: 9,
        errors: 0
    },
    acs: {
        events: 1100,
        exceptions: 406,
        errors: 0
    },
    iss: {
        events: 620,
        exceptions: 54,
        errors: 12
    },
    all: {
        exceptions: 469,
        errors: 12
    }
};

const headerReducer = (state = initialState, action) => {
   switch (action.type) {
       case UPDATE_NEW_MESSAGE_BODY:
           let newState = {
               all: {
                    exceptions: 0,
                    errors: 0
                }
            }
            // console.log(action.events)
           action.events.forEach(element => {
                    newState[element[0]] = {
                    events: element[1],
                    exceptions: element[2],
                    errors: element[3]
                }
                newState.all.exceptions += parseInt(element[3])
                newState.all.errors += parseInt(element[2])
            });
            // (updateHeaderEvents(newState.all))
            // console.log(newState)

           return newState;
       case SEND_MESSAGE:
           return state;
       default:
           return state;
   }
}

export const uploadEvents = ({events}) =>
    ({ type: UPDATE_NEW_MESSAGE_BODY, events })

    

export const getNotification = () => {
    return (dispatch) => {
        // console.log('!')
        axios.post("php/users-form-processor.php",{need: "notification"}).then(response => {
            // console.log(response.request)
            let json = JSON.parse(response.request.response);
            // console.log(json)
            // dispatch({})
            dispatch(uploadEvents(json));
        }).catch(function (error) {
            // handle error
            console.log(error);
            })
            .finally(function () {
            // always executed
            });
    }
}


export default headerReducer;