import * as axios from 'axios'

let initialState = {
    
};

const licReducer = (state = initialState, action) => {
    let stateCopy
    switch (action.type) {
        case 'KOSTUL':
            let {filter,indexName,dbName} = action
            stateCopy = {filter:filter,indexName:indexName,dbName:dbName}//{...state};
            // stateCopy[dbName] = {}//stateCopy[dbName]===undefined? {} : {...state[dbName]};
            // stateCopy[dbName][indexName] = filter;
            // console.log(stateCopy)
            if(filter===undefined)
            return state;
            else
            return stateCopy;
        default:
            return state;
   }
}

export const Kostyl = (filter,indexName,dbName) =>
({ type: 'KOSTUL', filter,indexName,dbName})

export const changeFilterByClickOnMenuItemThunk = (filter,indexName,dbName) => {
   
    return (dispatch,getState) => {
        return dispatch(Kostyl(filter,indexName,dbName))//ParamFilter(filter,id,dbName)) 
    }
}
  


export default licReducer;