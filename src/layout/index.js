import React ,{useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import './style.scss';

import {Logo} from '../component/logo';
import {Category} from '../component/category';
import {Toc} from '../component/toc';

const User = ({user})=>{
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
const TopScroll = ()=>{
    const [isBtnVisible, setIsBtnVisible] = useState(false);
    const handleScroll = (e)=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

    }
    useEffect(()=>{
        const handleButtonVisible = () => {
            if (window.pageYOffset > 100 ){
                setIsBtnVisible(true);
            }
            else {
                setIsBtnVisible(false);
            }
        }
        window.addEventListener('scroll', handleButtonVisible);
    })
    return (
        <div className={isBtnVisible ? `top-button top-button-visible` : `top-button`} onClick={handleScroll}>
            <div className="up-arrow"></div>
        </div>
    )
}
export const Layout = ({children, isToc = false}) => {
    const user = useSelector(state => state.user);
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
                    <User user={user}/>
                    {user.isLogined && <div className="upload-link-wrapper"><a href="/upload">글 작성</a></div>}
                    <div className="category-wrapper">
                        <Category/>
                    </div>
                    {isToc ? <Toc/> : ''}
                </div>
                
            </div>
        </div>
        <div className={`panel-smmd-category-${categoryToggle ? 'on' : 'off'} `}>
            <Category/>
            {user.isLogined && <div className="upload-link-wrapper"><a href="/upload">글 작성</a></div> }
        </div>
        <div className="panel-content">
            <div>
                {children}
            </div> 
        </div>
        <TopScroll/>
    </div>
           )
}


