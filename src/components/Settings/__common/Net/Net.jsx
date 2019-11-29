import React from 'react';
import __form from '../../../Common/__form/__form'
import './Net.scss';


class Net extends __form {
    constructor(props) {
        super(props);
        // console.log(this)
        // this.state = {ip: '',mask: '',gw: ''};
        // this.error_callB = () => {}
        // this.success_callB = () => {}
        // this.php = ''
    }

    

    render(props) {
        
        return (
            <form onSubmit={this.handleSubmit}>
            <span className="settings_text">Настройки сети<br></br></span>		
            <p>
                <label htmlFor="ip">
                    IP:
                </label>
                <input  type="text" value={this.props.common.ip} name="ip" onChange={this.handleInputChange} />
            </p>
            <p>
                <label htmlFor="mask">
                    Mask:
                    
                </label>
                <input type="text" id="mask" name="mask"  value={this.props.common.mask} onChange={this.handleInputChange} />
            </p>
            <p>
                <label htmlFor="gw">
                    Gateway:
                </label>
                <input id="gw" name="gw" type="text" value={this.props.common.gw} onChange={this.handleInputChange}/>
            </p>
            <input className="button_red" name="network" type="submit" value={this.submitText}/>
            </form>
        );
    }
}

export default Net;