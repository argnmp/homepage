import React ,{useState} from 'react';
import { useSelector } from 'react-redux';
import './style.scss';

import {Logo} from '../component/logo';
import {Category} from '../component/category';
import {Toc} from '../component/toc';

const User = ()=>{
    const user = useSelector(state => state.user);
    return (
        <div className="user-wrapper">
            {user.isLogined ?
                [<div className="greeting">{user.name}<i>님 환영합니다</i></div>,
                    <div className="logout-wrapper"><a href="/api/logout">로그아웃</a></div>] :
                <a href="/api/login">로그인</a>
            }
        </div>
    )
}
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
                    <User/>
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


