import React from 'react';
import __form from '../../../Common/__form/__form'
import './NotificationServer.scss';


class NotificationServer extends __form {
    constructor(props) {
        super(props);
        // this.state = {from: '',to: ''};
        // this.error_callB = () => {}
        // this.success_callB = () => {}
        // this.php = ''
    }


    render() {
        return (
            <form  onSubmit={this.handleSubmit}>
                <span class="settings_text">Настройки уведомлений</span>		
                <p>
                    <label for="notification-server__mail-to">Адрес на который отправлять уведомление</label>
                    <input  id="notification-server__mail-to" name="to" size="40" type="text" onChange={this.handleInputChange} value={this.props.notific.to}/>    
                </p>
                <p>
                    <label for="notification-server__mail-from">Адрес с которого отправлять уведомление</label>
                    <input id="notification-server__mail-from" name="from" size="40" type="text"  onChange={this.handleInputChange} value={this.props.notific.from}/>
                </p>
                <input class="button_red" name="smtp" type="submit" value="Сохранить"/>
            </form>
        );
    }
}

export default NotificationServer;