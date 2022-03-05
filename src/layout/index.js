import React ,{useState}from 'react';
import './style.scss';

import {Logo} from '../component/logo';
import {Category} from '../component/category';
import {Toc} from '../component/toc';

export const Layout = ({children, isToc = false}) => {
    const [categoryToggle, setCategoryToggle] = useState(false);
    let onToggle = () => setCategoryToggle(!categoryToggle);
    return (
    <div className={`panel-wrapper category-${categoryToggle ? 'on' : 'off'}`}>
        <div className="panel-menu">
            <div className="panel-menu-inner">
                <div className="a">
                    <div className={`bg-btn ${categoryToggle ? 'btn-open': ''}`} onClick={onToggle}>
                        <div className="burger-btn"></div>
                    </div>
                    {/*<button onClick={onToggle}>button</button>*/}
                </div>
                <div className="b">
                    <Logo/>
                </div>
                <div className="c">
                    <div className="category-wrapper">
                        <Category/>
                    </div>
                    {isToc ? <Toc/> : ''}
                </div>
                
            </div>
        </div>
        <div className={`panel-smmd-category-${categoryToggle ? 'on' : 'off'} `}>
            <Category/>
        </div>
        <div className="panel-content">
            <div>
                {children}
            </div> 
        </div>
    </div>
           )
}


