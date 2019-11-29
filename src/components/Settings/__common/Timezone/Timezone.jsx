import React from 'react';
import __form from '../../../Common/__form/__form'
import './Timezone.scss';


class Timezone extends __form {
    constructor(props) {
        super(props);
        this.state = {ntp_server1: '', ntp_server2: '', ntp_server3: '', ntp_server4: '' };
        this.error_callB = () => {}
        this.success_callB = () => {}
        this.php = ''
    }

    

    render() {
        
        return (
            <form onSubmit={this.handleSubmit}>
                <span class="settings_text">Настройки часового пояса></span>
                    <p>
                        <label>NTP server1:<input name="ntp_server1" onChange={this.handleInputChange} value={this.props.timezone.ntp_server1} type="text"/></label>
                    </p>
                    <p>
                        <label>NTP server2:<input name="ntp_server2" onChange={this.handleInputChange} value={this.props.timezone.ntp_server2} type="text"/></label>
                    </p>
                    <p>
                        <label>NTP server3:<input name="ntp_server3" onChange={this.handleInputChange} value={this.props.timezone.ntp_server3} type="text"/></label>
                    </p>
                    <p>
                        <label>NTP server4:<input name="ntp_server4" onChange={this.handleInputChange} value={this.props.timezone.ntp_server4} type="text"/></label>
                    </p>
                    <input class="button_red" name="ntp" type="submit" value="Сохранить"/>
            </form>

        );
    }
}

export default Timezone;