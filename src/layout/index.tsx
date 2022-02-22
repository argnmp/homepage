import React from 'react';
import './style.scss';

import {Logo} from '../component/logo';

export const Layout = () => {
    return (
    <div className="panel-wrapper">
        <div className="panel-menu">
            <div></div>
            <div>
                <Logo/> 
            </div>
            <div></div>
        </div>
        <div className="panel-content">
            <div>

            </div> 
        </div>
    </div>
           )
}


