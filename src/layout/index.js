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
        }
        else {
            
        }
        /*
        let docStyle = document.documentElement.style;
        document.addEventListener('mousemove', function(e){
            docStyle.setProperty('--mouse-x',e.clientX);
            docStyle.setProperty('--mouse-y',e.clientY);
        })
        */
    },[]);
    const darkSwitch = () => {
        if(document.getElementsByTagName("html")[0].classList.contains("dark-mode")){
            document.getElementsByTagName("html")[0].classList.remove("dark-mode");
            window.localStorage.setItem("bgMode", "light");
            document.querySelector(".dark-mode-highlighter").disabled = true;
            document.querySelector(".light-mode-highlighter").disabled = false;
            //darkSwitchRef.current.innerText = "D";
            dispatch(colorSwitch(false));
        }
        else {
            document.getElementsByTagName("html")[0].classList.add("dark-mode");
            window.localStorage.setItem("bgMode", "dark");
            document.querySelector(".light-mode-highlighter").disabled = true;
            document.querySelector(".dark-mode-highlighter").disabled = false;
            //darkSwitchRef.current.innerText = "L";
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
                <div className={`panel-menu panelMenu-mdlg-${panelMenuToggle ? 'on': 'off'}`}>
                    <div className={`panel-menu-inner `}>
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
                <div className="dark-switch" onClick={darkSwitch} ref={darkSwitchRef}>
                    {colorState?
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.069 13h-4.069v-2h4.069c-.041.328-.069.661-.069 1s.028.672.069 1zm3.034-7.312l-2.881-2.881-1.414 1.414 2.881 2.881c.411-.529.885-1.003 1.414-1.414zm11.209 1.414l2.881-2.881-1.414-1.414-2.881 2.881c.528.411 1.002.886 1.414 1.414zm-6.312-3.102c.339 0 .672.028 1 .069v-4.069h-2v4.069c.328-.041.661-.069 1-.069zm0 16c-.339 0-.672-.028-1-.069v4.069h2v-4.069c-.328.041-.661.069-1 .069zm7.931-9c.041.328.069.661.069 1s-.028.672-.069 1h4.069v-2h-4.069zm-3.033 7.312l2.88 2.88 1.415-1.414-2.88-2.88c-.412.528-.886 1.002-1.415 1.414zm-11.21-1.415l-2.88 2.88 1.414 1.414 2.88-2.88c-.528-.411-1.003-.885-1.414-1.414zm6.312-10.897c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z"/></svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 10.999c1.437.438 2.562 1.564 2.999 3.001.44-1.437 1.565-2.562 3.001-3-1.436-.439-2.561-1.563-3.001-3-.437 1.436-1.562 2.561-2.999 2.999zm8.001.001c.958.293 1.707 1.042 2 2.001.291-.959 1.042-1.709 1.999-2.001-.957-.292-1.707-1.042-2-2-.293.958-1.042 1.708-1.999 2zm-1-9c-.437 1.437-1.563 2.562-2.998 3.001 1.438.44 2.561 1.564 3.001 3.002.437-1.438 1.563-2.563 2.996-3.002-1.433-.437-2.559-1.564-2.999-3.001zm-7.001 22c-6.617 0-12-5.383-12-12s5.383-12 12-12c1.894 0 3.63.497 5.37 1.179-2.948.504-9.37 3.266-9.37 10.821 0 7.454 5.917 10.208 9.37 10.821-1.5.846-3.476 1.179-5.37 1.179z"/></svg>
                }
                </div>
                <div className={`panel-menu-switch panel-menu-switch-${panelMenuToggle ? 'on' : 'off'}`} onClick={panelMenuSwitch}>
                    {panelMenuToggle ? 
                        <svg width="28" height="28" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m3.514 6.61c-.317.179-.514.519-.514.887v8.95c0 .37.197.708.514.887 1.597.901 6.456 3.639 8.005 4.512.152.085.319.128.487.128.164 0 .328-.041.477-.123 1.549-.855 6.39-3.523 7.994-4.408.323-.177.523-.519.523-.891v-9.055c0-.368-.197-.708-.515-.887-1.595-.899-6.444-3.632-7.999-4.508-.151-.085-.319-.128-.486-.128-.168 0-.335.043-.486.128-1.555.876-6.405 3.609-8 4.508m15.986 2.115v7.525l-6.75 3.722v-7.578zm-15 7.425v-7.458l6.75 3.75v7.511zm.736-8.769 6.764-3.813 6.801 3.834-6.801 3.716z" fill-rule="nonzero"/></svg>
                        :
                        <svg width="28" height="28" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m21 7.702-8.5 4.62v9.678c1.567-.865 6.379-3.517 7.977-4.399.323-.177.523-.519.523-.891zm-9.5 4.619-8.5-4.722v9.006c0 .37.197.708.514.887 1.59.898 6.416 3.623 7.986 4.508zm-8.079-5.629 8.579 4.763 8.672-4.713s-6.631-3.738-8.186-4.614c-.151-.085-.319-.128-.486-.128-.168 0-.335.043-.486.128-1.555.876-8.093 4.564-8.093 4.564z" fill-rule="nonzero"/></svg>
                    }
                </div>
            </div>
            <div className='lfooter'>
                <div>© 2022 kimtahen. All Rights Reserved</div>
            </div>
        </div>
           )
}


