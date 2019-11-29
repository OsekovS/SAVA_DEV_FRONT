import React from 'react';
import {Field, reduxForm} from "redux-form";



const form = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <p>NTP server1:<Field name="ntp_server1" placeholder={props.ntp_server1} name={"ntp_server1"} component={"input"}/></p>
            <p>NTP server2:<Field name="ntp_server2" placeholder={props.ntp_server2} name={"ntp_server2"} component={"input"}/></p>
            <p>NTP server3:<Field name="ntp_server3" placeholder={props.ntp_server3} name={"ntp_server3"} component={"input"}/></p>
            <p>NTP server4:<Field name="ntp_server4" placeholder={props.ntp_server4} name={"ntp_server4"} component={"input"}/></p>
            <div>
                <button>Настроить</button>
            </div>
        </form>
    )
}

const ReduxForm =  reduxForm({form: 'net'})(form)

const Timezone = (props) => {
    const onNetSubmit = (formData) => {
        props.updateSettings(formData)
    }

    return <div>
        <span class="settings_text">Настройки часового пояса></span>	
        <ReduxForm ntp_server1={props.ntp_server1} ntp_server2={props.ntp_server2} ntp_server3={props.ntp_server3} ntp_server4={props.ntp_server4} onSubmit={onNetSubmit} />
    </div>
}

export default Timezone;
        
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 <span class="settings_text">Настройки часового пояса></span>
//                     <p>
//                         <label>NTP server1:<input name="ntp_server1" onChange={this.handleInputChange} value={this.props.timezone.ntp_server1} type="text"/></label>
//                     </p>
//                     <p>
//                         <label>NTP server2:<input name="ntp_server2" onChange={this.handleInputChange} value={this.props.timezone.ntp_server2} type="text"/></label>
//                     </p>
//                     <p>
//                         <label>NTP server3:<input name="ntp_server3" onChange={this.handleInputChange} value={this.props.timezone.ntp_server3} type="text"/></label>
//                     </p>
//                     <p>
//                         <label>NTP server4:<input name="ntp_server4" onChange={this.handleInputChange} value={this.props.timezone.ntp_server4} type="text"/></label>
//                     </p>
//                     <input class="button_red" name="ntp" type="submit" value="Сохранить"/>
//             </form>

//         );
//     }
// }

// export default Timezone;