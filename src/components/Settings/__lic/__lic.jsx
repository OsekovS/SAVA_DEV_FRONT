import React from 'react';
import './__lic.scss';

const __lic = (props) => {
    return <div className="Settings__lic">
        <form encType="multipart/form-data" action="settings_admin.php" method="POST">       
            <h2 className='h2__center'>Лицензия</h2>	
            <p>Дата начала лицензии: {props.lic.lic_start}</p>
            <p>Дата окночания лицензии: {props.lic.lic_end}</p>
            <p>Срок лицензии: {props.lic.amount}</p>
            <p className="license__remain-time" >Осталось дней: {props.remained}</p>
            
            
            {/* <!-- Поле MAX_FILE_SIZE должно быть указано до поля загрузки файла --> */}
            <p><input type="hidden" name="MAX_FILE_SIZE" value="30000" /></p>
            {/* <!-- Название элемента input определяет имя в массиве $_FILES --> */}
            {/* <!-- <p>Загрузить файл лицензии: <input name="userfile" type="file" /></p> --> */}
            <p>Загрузить файл лицензии:
                <label htmlFor="myfile">Выберите файл</label>
                <input type="file" className="custom-file-input" id="myfile" name="userfile" multiple></input>
            </p>
            <p><input className="button__red" type="submit" name="lic" value="Загрузить" /></p>
        </form>
    </div>
}

export default __lic;