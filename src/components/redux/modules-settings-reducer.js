import * as axios from 'axios'
import {acsIni} from './IniStates.js'
import {reset} from 'redux-form';

const DEL_ENDP = 'DEL_ACS_ENDP';
const ADD_ENDP = 'ADD_ACS_ENDP'
const ADD_OBJ = 'ADD_ACS_OBJ';
const CHANGE_MODE = 'CHANGE_ACS_MODE'

let translator = {
    'addObj': {
        tb_name: 'objects',
        field_len: 1,
        uni_type: 'name',
        uni_type_usr: 'именем'
    },
    'addEndp': {
        tb_name: 'endpoints',
        field_len: 5,
        uni_type: 'ip',
        uni_type_usr: 'ip'
    }
}


let {settings} = acsIni()

const acsReducer = (state = settings, action) => {
    let stateCopy,dbName,tableName
   switch (action.type) {
        case 'ADD_SETTINGS_FIELD':
            // console.log(action)
            stateCopy = {...state};
            tableName = action.tableName
            dbName = action.dbName
            stateCopy[dbName] = {...state[dbName]}
            // let pushed = {}
            // // action.pushed.forEach((element, numb) => {
            // //     if (numb===0) pushed.id = element
            // //     else pushed[action.formFields[numb].name] = element
            // // });
            // console.log(stateCopy[dbName][tableName])
            stateCopy[dbName][tableName].push(
                (action.pushed)
            )
            // console.log(stateCopy[dbName][tableName])
            return stateCopy;
        case 'CHANGE_SETT_ELEM':
            // console.log(action)
            stateCopy = {...state};
            tableName = action.tableName
            dbName = action.dbName
            stateCopy[dbName] = {...state[dbName]}
            let {form, id} = action
            // console.log(form)

            // stateCopy[dbName][tableName] = [...state[dbName][tableName]]
            // stateCopy[dbName][tableName][id] = [...state[dbName][tableName][id]]
            stateCopy[dbName][tableName] = state[dbName][tableName].map((e,n)=>{
                //0 элемент - id
                if(e[0]==id) {
                    let changed = [...e]
                    // console.log(e)
                    action.addedField.forEach((e,n)=>{
                        if(form[e.field]!==undefined) {
                            //n+1 потому что id не входит
                            // console.log(form[e.field])
                            // console.log(changed[n+1])
                            changed[n+1] = form[e.field]
                        }
                    })
                    // console.log(e)
                    // console.log(changed)
                    return changed
                    // stateCopy[dbName][tableName][id][n+1] = form[e.field]
                }else return e
            })
            
            // console.log(stateCopy)
            return stateCopy
        case 'DEL_SETT_ELEM':
            // console.log(action)
            let {dependences} = action
            stateCopy = {...state};
            tableName = action.tableName
            dbName = action.dbName
            stateCopy[dbName] = {...state[dbName]}
            // console.log(dependences)
            // console.log(state[dbName])
            for (let dependence in dependences) {
                // console.log(dependence)
                if (dependences.hasOwnProperty(dependence)){
                    let {field, whatWeDelete} = dependences[dependence]
                    // console.log(field)
                    // console.log(whatWeDelete)
                    // stateCopy[dbName][dependence] = state[dbName][dependence].filter(e => e[0]!==action.id)
                    stateCopy[dbName][dependence] = state[dbName][dependence].filter(e => {
                        console.log(e)
                        return e[field] !== whatWeDelete
                    })
                    console.log(stateCopy[dbName][dependence])
                }
            }
            stateCopy[dbName][tableName] = state[dbName][tableName].filter(e => e.id!==action.id)
            // console.log(stateCopy)
            return stateCopy
        case 'UPLOAD_SETTINGS':
            stateCopy = {...state};
            tableName = action.reqObj.tableName
            dbName = action.reqObj.dbName
            stateCopy[dbName]=stateCopy[dbName]===undefined?{}:{...state[dbName]}

            // stateCopy[dbName][tableName]=action.json[tableName]
            // console.log(action)
            //цикл по всем таблицам в модуле
            for (const tableKey in action.json) {
                // console.log(tableKey)
                let i = 0
                if (action.json.hasOwnProperty(tableKey)){
                    let table = action.json[tableKey]
                    let a = []
                    let pushed = {}
                    // console.log(table)
                    table.forEach(element => {
                        
                        // console.log(element)
                        for (const elementKey in element) {
                            if (element.hasOwnProperty(elementKey)){
                                if(elementKey==="usename") {
                                    pushed[elementKey] = element[elementKey]==="f"?'да':'нет'
                                }else pushed[elementKey] = element[elementKey]
                                // console.log(element[elementKey])  
                                // console.log(pushed)
                                // console.log(pushed)
                            }
                        }
                        // console.log(pushed)
                        // listElem.map(field=>{
                        //     if(field==="f") return 'нет'
                        //     else if(field==="t") return 'да'
                        //     else return field
                        // })
                        a.push({...pushed})
                        // a[i] = {...pushed};
                        // console.log(a[i])
                        // i++
                        
                        
                    });
                   
                    console.log(a)
                    // console.log(table)
                    stateCopy[dbName][tableKey] = a;
                   
                }

            }

            // addedField.forEach(element => {
            //     if(element.type==="checkbox") {
            //         if(reqObj[element.name]) pushed[element.name]='t' //pushed.push('t')
            //         else pushed[element.name]= 'f' //pushed.push('f')
            //     }
            // })
            // console.log(stateCopy)
            // console.log(action.json)
            return stateCopy
        default:
            return state;
}
}
export const changeMode = (mode) =>
({ type: CHANGE_MODE, mode: mode })

export const delSett = (id, dbName, tableName, dependences) => 
({type: 'DEL_SETT_ELEM', id, dbName, tableName, dependences})

export const changeField = (id, form, dbName, tableName, addedField) => 
({type: 'CHANGE_SETT_ELEM', id, form, dbName, tableName, addedField})

export const uploadTableList = (json, reqObj) =>
({ type: 'UPLOAD_SETTINGS', json, reqObj})

export const addField = (pushed, dbName, tableName, formFields) =>
({type: 'ADD_SETTINGS_FIELD', pushed, dbName, tableName, formFields})

//РЕДУСЕР ДЛЯ АКС ОБЪЕКТОВ
export const getTableList = (dbName, tableName) => {
    // console.log('send!')

    // if(reqObj.need==='logs'){
    //     reqObj = {...reqObj, timeFilter: {} } 
    // }

    
    return (dispatch, getState) => {
        let Tabels = getState().auth.briefUserInfo.modules[dbName].settings.Tabels, getFields
        Tabels.forEach(element => {
            if(element.tableName===tableName) getFields = element.formFields
        });
        let reqObj={
            need: 'TableList',
            dbName,
            tableName,
            getFields
        }
        // console.log('acs-form-processor.php')
        axios.post("php/acs-form-processor.php", reqObj).then(response => {
            // console.log(response)
            let json = JSON.parse(response.request.response);
            console.log(json)
            dispatch(uploadTableList(json,reqObj));
            // dispatch(uploadAcs(json,reqObj));
        }).catch(function (error) {
            // handle error
            console.log(error);
          })
          .finally(function () {
            // always executed
          });;
    }
}
//...args
export const delFieldThunk = (id, name, dbName, tableName) => {
    // console.log(args)
    return (dispatch, getState) => {
        // dispatch({type:''})
        let Tabels = getState().auth.briefUserInfo.modules[dbName].settings.Tabels, dopDelete = {}
        Tabels.forEach(element => {
            if(element.tableName!==tableName) {
                //проходимся по таблице не той из которой удаляют
                element.formFields.forEach(field => {
                if(field.component==="select"&&field.options===tableName) dopDelete[element.tableName] = {[field.field]:name}
            });
            }
        });
        // console.log(dopDelete)
        // dispatch(delSett(id, dbName, tableName))
        axios.post("php/acs-form-processor.php",{need:'delSettField',id, dbName, tableName,dopDelete}).then(response => {
            console.log(response)
            let json = JSON.parse(response.request.response);
            console.log(json)
            if(json.result==="done")
                return dispatch(delSett(id, dbName, tableName, json.dependences))
            else alert(`В процессе удаления возникла ошибка`)//${translator[reqObj.mode].uni_type}
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }
}


export const addFieldThunk = (reqObj,required, dbName, tableName, formFields) => {
    console.log(reqObj)
    console.log(required)
    return (dispatch, getState) => {
        
        let Tabels = getState().auth.briefUserInfo.modules[dbName].settings.Tabels, addedField,
        allFields = true
        Tabels.forEach(element => {
            if(element.tableName===tableName) {
                addedField = element.formFields
            }
        });
            // проверяем есть ли в "пришедшем" объекте все поля
        addedField.forEach(element => {
            if(reqObj[element.field]===undefined){
                //если пришел пустой селект суём в объект по умолчанию первый элемент в него из таблицы название которой лежит в самом селекте в options хихихи
                if(element.component==="select") reqObj[element.field] =  getState().modulesSettings[dbName][element.options][0][1]
                //если пришел пустой чекбокс пихаем в него фолс
                else if(element.type==="checkbox") reqObj[element.field] = false
                //если это не чекбокс и не селект - перед нами пустое поле нужно заполнить все поля
                else allFields = false
                //     
            }
        });
        console.log(getState().modulesSettings[dbName][tableName].length)
        if(allFields){
                // let pushed = [''+getState().modulesSettings[dbName][tableName].length]
            let pushed = {id: ''+getState().modulesSettings[dbName][tableName].length}
            let dispatched = {...pushed}
            addedField.forEach(element => {
                if(element.type==="checkbox") {
                    if(reqObj[element.name]){
                        pushed[element.name]='t' 
                        dispatched[element.name]= 'нет'
                    }//pushed.push('t')
                    else{
                        pushed[element.name]= 'f'
                        dispatched[element.name]= 'нет'
                    }  //pushed.push('f')
                }
                else {
                    pushed[element.name]=reqObj[element.name]
                    dispatched[element.name]=reqObj[element.name]
                }//pushed.push(reqObj[element.name])
            });
            console.log(pushed)
            axios.post("php/acs-form-processor.php",{need:'addSettField',pushed, dbName, tableName}).then(response => {
                console.log(response)
                let json = JSON.parse(response.request.response);
                console.log(json)
                if(json.result==="done")
                    return dispatch(addField(dispatched, dbName, tableName, formFields))
                else alert(`Пользователь с таким ${json.result} уже существует`)//${translator[reqObj.mode].uni_type}
            }).catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
                
            
        }else{
            alert("Необходимо заполнить все поля")
                    return dispatch({type: '' })
        }
    }
}

export const changeFieldThunk = (id,form, dbName, tableName) => {
    console.log(form)
    
    // проверяем есть ли в "пришедшем" объекте все поля
  
    return (dispatch, getState) => {

        
        let Tabels = getState().auth.briefUserInfo.modules[dbName].settings.Tabels, addedField
        Tabels.forEach(element => {
            if(element.tableName===tableName) {
                addedField = element.formFields
            }
        });
        console.log(addedField)
        let dispatchForm = {...form}
        //все неотмеченные чекбоксы при отсутствии галочки помечаем + преобразуем под нужды бд логические поля (нужно 't','f')
        addedField.forEach(element => {         
            if(element.type==="checkbox") {
                let isTrue = (form[element.name]===true)
                // let isTrue = (form[element.name]!==undefined && form[element.name]===true)
                form[element.name] = isTrue?'t':'f'
                dispatchForm[element.name] = isTrue?'да':'нет'
            }
        });
        console.log(form)
        console.log(dispatchForm)
        axios.post("php/acs-form-processor.php",{need:'changeSettField', id, form, dbName, tableName}).then(response => {
            console.log(response)
            let json = JSON.parse(response.request.response);
            console.log(json)
            if(json.result==="done"){
                dispatch(reset('changeForm'));
                return dispatch(changeField(id, dispatchForm, dbName, tableName, addedField))
            }
            else alert(`Ошибка при редактировании`)//${translator[reqObj.mode].uni_type}
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }
}

export default acsReducer;