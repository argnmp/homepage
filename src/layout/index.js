import React ,{useEffect, useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';

import {Logo} from '../component/logo';
import { Avatar } from '../component/avatar';
import {Category} from '../component/category';
import {Toc} from '../component/toc';

import { colorSwitch } from '../modules/common';

const User = ({user})=>{
    return (
        <div className="user-wrapper">
            {user.isLogined ?
                [<div key={1} className="greeting">{user.name}<i>님 환영합니다</i></div>,
                    <div key={2} className="logout-wrapper"><a href="/api/logout">로그아웃</a></div>] :
                <a href="/api/login">로그인</a>
            }
            {!user.isLogined &&
                <div className="register-wrapper">
                    <a href="/api/register">회원가입</a>
                </div>
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
            <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m18.787 9.473s-4.505-4.502-6.259-6.255c-.147-.146-.339-.22-.53-.22-.192 0-.384.074-.531.22-1.753 1.753-6.256 6.252-6.256 6.252-.147.147-.219.339-.217.532.001.19.075.38.221.525.292.293.766.295 1.056.004l4.977-4.976v14.692c0 .414.336.75.75.75.413 0 .75-.336.75-.75v-14.692l4.978 4.978c.289.29.762.287 1.055-.006.145-.145.219-.335.221-.525.002-.192-.07-.384-.215-.529z" fill-rule="nonzero"/></svg>
        </div>
    )
}
export const Layout = ({children, isToc = false}) => {
    const dispatch = useDispatch();
    //switching between dark mode and light mode
    //light == false, dark == true
    const colorState = useSelector(state => state.common.colorState);
    const darkSwitchRef = useRef();
    useEffect(()=>{
        const bgMode = window.localStorage.getItem('bgMode');
        if(bgMode === "dark"){
            dispatch(colorSwitch(true));
            darkSwitchRef.current.innerText = "L";
        }
        else {
            darkSwitchRef.current.innerText = "D";
        }
    },[]);
    const darkSwitch = () => {
        if(document.getElementsByTagName("html")[0].classList.contains("dark-mode")){
            document.getElementsByTagName("html")[0].classList.remove("dark-mode");
            window.localStorage.setItem("bgMode", "light");
            document.querySelector(".dark-mode-highlighter").disabled = true;
            document.querySelector(".light-mode-highlighter").disabled = false;
            darkSwitchRef.current.innerText = "D";
            dispatch(colorSwitch(false));
        }
        else {
            document.getElementsByTagName("html")[0].classList.add("dark-mode");
            window.localStorage.setItem("bgMode", "dark");
            document.querySelector(".light-mode-highlighter").disabled = true;
            document.querySelector(".dark-mode-highlighter").disabled = false;
            darkSwitchRef.current.innerText = "L";
            dispatch(colorSwitch(true));
        }
    }

    const user = useSelector(state => state.user);
    const [categoryToggle, setCategoryToggle] = useState(false);
    let onToggle = () => setCategoryToggle(!categoryToggle);


    const [panelMenuToggle, setPanelMenuToggle] = useState(false);
    const panelMenuSwitch = () => {
        setPanelMenuToggle(!panelMenuToggle);
    }
    return (
        <div>
            <div className={`panel-wrapper category-${categoryToggle ? 'on' : 'off'} panelMenu-${panelMenuToggle ? 'on' : 'off'}`}>
                <div className="panel-menu">
                    <div className={`panel-menu-inner panelMenu-mdlg-${panelMenuToggle ? 'on': 'off'}`}>
                        <div className="a">
                            <div className={`bg-btn ${categoryToggle ? 'btn-open' : ''}`} onClick={onToggle}>
                                <div className="burger-btn"></div>
                            </div>
                            {/*<button onClick={onToggle}>button</button>*/}
                        </div>
                        <div className="b">
                            <Logo />
                        </div>
                        <div className="c">
                            <Avatar/>
                            <User user={user} />
                            {user.isLogined && user.level == 0 && <div className="upload-link-wrapper"><a href="/upload">글 작성</a></div>}
                            <div className="category-wrapper">
                                <Category />
                            </div>
                            {isToc ? <Toc /> : ''}
                        </div>

                    </div>
                    <div className='panel-mdlg-logo'>
                        <Logo />
                    </div> 
                </div>
                <div className={`panel-smmd-category-${categoryToggle ? 'on' : 'off'} `}>
                    <Category />
                    {user.isLogined && user.level == 0 && <div className="upload-link-wrapper"><a href="/upload">글 작성</a></div>}
                    {!user.isLogined && <div className="register-wrapper"><a href="/api/register">회원가입</a></div>}
                </div>
                <div className="panel-content">
                    <div>
                        {children}
                    </div>
                </div>
                <TopScroll />
                <button className="dark-switch" onClick={darkSwitch} ref={darkSwitchRef}></button>
                <div className={`panel-menu-switch panel-menu-switch-${panelMenuToggle ? 'on' : 'off'}`} onClick={panelMenuSwitch}>
                    {panelMenuToggle ? 
                        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m3.514 6.61c-.317.179-.514.519-.514.887v8.95c0 .37.197.708.514.887 1.597.901 6.456 3.639 8.005 4.512.152.085.319.128.487.128.164 0 .328-.041.477-.123 1.549-.855 6.39-3.523 7.994-4.408.323-.177.523-.519.523-.891v-9.055c0-.368-.197-.708-.515-.887-1.595-.899-6.444-3.632-7.999-4.508-.151-.085-.319-.128-.486-.128-.168 0-.335.043-.486.128-1.555.876-6.405 3.609-8 4.508m15.986 2.115v7.525l-6.75 3.722v-7.578zm-15 7.425v-7.458l6.75 3.75v7.511zm.736-8.769 6.764-3.813 6.801 3.834-6.801 3.716z" fill-rule="nonzero"/></svg>
                        :
                        <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 7.702-8.5 4.62v9.678c1.567-.865 6.379-3.517 7.977-4.399.323-.177.523-.519.523-.891zm-9.5 4.619-8.5-4.722v9.006c0 .37.197.708.514.887 1.59.898 6.416 3.623 7.986 4.508zm-8.079-5.629 8.579 4.763 8.672-4.713s-6.631-3.738-8.186-4.614c-.151-.085-.319-.128-.486-.128-.168 0-.335.043-.486.128-1.555.876-8.093 4.564-8.093 4.564z" fill-rule="nonzero"/></svg>
                    }
                </div>
            </div>
            <div className='lfooter'>
                <div>© 2022 kimtahen. All Rights Reserved</div>
            </div>
        </div>
           )
}


