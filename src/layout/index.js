import React ,{useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';

import {Logo} from '../component/logo';
import {Category} from '../component/category';
import {Toc} from '../component/toc';

import { colorSwitch } from '../modules/common';

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
    const dispatch = useDispatch();
    //switching between dark mode and light mode
    //light == false, dark == true
    const colorState = useSelector(state => state.common.colorState);
    useEffect(()=>{
        const bgMode = window.localStorage.getItem('bgMode');
        if(bgMode === "dark"){
            dispatch(colorSwitch(false));
            document.getElementsByTagName("html")[0].classList.add("dark-mode");
        }
    },[]);
    const darkSwitch = () => {
        if(document.getElementsByTagName("html")[0].classList.contains("dark-mode")){
            document.getElementsByTagName("html")[0].classList.remove("dark-mode");
            window.localStorage.setItem("bgMode", "light");
            dispatch(colorSwitch(false));
        }
        else {
            document.getElementsByTagName("html")[0].classList.add("dark-mode");
            window.localStorage.setItem("bgMode", "dark");
            dispatch(colorSwitch(true));
        }
    }
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
        <button className="dark-switch" onClick={darkSwitch}>{colorState ? 'L' : 'D'}</button>
    </div>
           )
}


