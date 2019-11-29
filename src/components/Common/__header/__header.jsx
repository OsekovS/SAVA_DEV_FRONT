import React from 'react';
// import s from './Header.module.css';
import './__header.scss';
import {createMarkup} from '../../JS/core'

const __header = (props) => {
    let header = document.createElement('header');
    return <header className={props.clazz} dangerouslySetInnerHTML={createMarkup(props.text)}></header>
}

export default __header;