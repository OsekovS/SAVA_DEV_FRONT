import * as axios from 'axios'

let initialState = {
    lic_start: '2019-11-13 16:05:50',
    lic_end: '2020-11-12 16:05:50',
    amount: '365',
    remained: '-1'
};

const licReducer = (state = initialState, action) => {
    let stateCopy
    switch (action.type) {
        case 'AFTER_LIC_UPDATE':
            let json = {...action.body}
            stateCopy = {...state};
            stateCopy.lic_start = json.from
            stateCopy.lic_end = json.to
            stateCopy.remained = Math.round(json.day_last)<0?0:Math.round(json.day_last)
            return stateCopy;
        default:
            return state;
   }
}

export const afterLicUpdate = (body) =>
({ type: 'AFTER_LIC_UPDATE', body})

export const onFileUploadThunk = (licFile) => {
    let formData = new FormData();
    formData.append("licFile", licFile);
    formData.append("lic", true);
    // {lic:true,userfile:licFile}
    return (dispatch) => {
        axios.post('php/LicenceGen/enc.php?time_gen=true&time=365', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }).then(response => {
            console.log(response)
            let json = JSON.parse(response.request.response);
            console.log(json)
            if(json.result==="done"){
                alert('Файл лицензии успешно загружен')
                return dispatch(afterLicUpdate(json))
            }else{
                alert('Ошибка при загрузке (неверный файл/формат файла)')
                return dispatch({type:''})
            }
            
            
                // return dispatch(delSett(id, dbName, tableName))
            // else alert(`В процессе удаления возникла ошибка`)//${translator[reqObj.mode].uni_type}
        }).catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
    }
}


export default licReducer;