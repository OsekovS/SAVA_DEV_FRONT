const UPDATE_HEADER_EVENTS = 'UPDATE_HEADER_EVENTS';

let initialState = {
    briefUserInfo: {name: 'administrator',
    admin: 'администратор'},
};

export const headerReducer = (state = initialState, action) => {
   switch (action.type) {
       case UPDATE_HEADER_EVENTS:
           console.log('лохпидр')
            return state;
       default:
           return state;
   }
}
// const innerUpdateHeaderEvents = (body) =>
//     ({ type: UPDATE_HEADER_EVENTS, body })

// export const updateHeaderEvents = (body) =>dispatch(innerUpdateHeaderEvents(body));

// export const updateHeaderEvents = () => {
//     return (dispatch) => {
//         // console.log('!')
//         axios.post("php/users-form-processor.php",{need: "notification"}).then(response => {
//             // console.log(response.request)
//             let json = JSON.parse(response.request.response);
//             console.log(json)
//             // dispatch({})
//             dispatch(uploadEvents(json));
//         }).catch(function (error) {
//             // handle error
//             console.log(error);
//             })
//             .finally(function () {
//             // always executed
//             });
//     }
// }

export default headerReducer;