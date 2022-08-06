import React ,{useEffect, useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';

import { Avatar } from '../component/avatar';
import {Category} from '../component/category';
import { Header } from '../component/header';
import {Toc} from '../component/toc';

import { colorSwitch } from '../modules/common';
import { userLoad } from '../modules/user';

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
    const user = useSelector(state => state.user);
    //switching between dark mode and light mode
    //light == false, dark == true
    const colorState = useSelector(state => state.common.colorState);
    const darkSwitchRef = useRef();
    const wrapRef = useRef();

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

    const [sideToggle, setSideToggle] = useState(false);
    let onSideToggle = () => {
        setSideToggle(!sideToggle);
    };


    const [panelMenuToggle, setPanelMenuToggle] = useState(false);
    const panelMenuSwitch = () => {
        setPanelMenuToggle(!panelMenuToggle);
    }
    return (
        <div className="wrap" ref={wrapRef}>
            <Header onSideToggle={onSideToggle} sideToggle={sideToggle}/>
            <div className={`smmd-side ${sideToggle ? "side-on" : "side-off"}`}>
                {user.isLogined && <div className={`welcome`}><b>{user.name}</b>님 환영합니다.</div>}
                {user.isLogined ? <div className={`smmd-side-item`}><a href='/upload'>upload</a></div> : <div className={`smmd-side-item`}><a href='/api/register'>register</a></div> }
                <div className='smmd-side-wrapper'>
                    <div className='smmd-side-category-wrapper'>
                        <div className={`smmd-side-title`}>Category</div>
                        <Category />
                    </div>
                    {isToc && 
                    <div className='smmd-side-toc-wrapper'>
                        <div className={`smmd-side-title`}>Table of Contents</div>
                        <div><Toc /></div>
                    </div>
                    }
                    
                </div>
            </div>
            <div className="content">
                {children}
            </div>
            <TopScroll />
            <div className="dark-switch" onClick={darkSwitch} ref={darkSwitchRef}>
                {colorState ?
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.069 13h-4.069v-2h4.069c-.041.328-.069.661-.069 1s.028.672.069 1zm3.034-7.312l-2.881-2.881-1.414 1.414 2.881 2.881c.411-.529.885-1.003 1.414-1.414zm11.209 1.414l2.881-2.881-1.414-1.414-2.881 2.881c.528.411 1.002.886 1.414 1.414zm-6.312-3.102c.339 0 .672.028 1 .069v-4.069h-2v4.069c.328-.041.661-.069 1-.069zm0 16c-.339 0-.672-.028-1-.069v4.069h2v-4.069c-.328.041-.661.069-1 .069zm7.931-9c.041.328.069.661.069 1s-.028.672-.069 1h4.069v-2h-4.069zm-3.033 7.312l2.88 2.88 1.415-1.414-2.88-2.88c-.412.528-.886 1.002-1.415 1.414zm-11.21-1.415l-2.88 2.88 1.414 1.414 2.88-2.88c-.528-.411-1.003-.885-1.414-1.414zm6.312-10.897c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z" /></svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 10.999c1.437.438 2.562 1.564 2.999 3.001.44-1.437 1.565-2.562 3.001-3-1.436-.439-2.561-1.563-3.001-3-.437 1.436-1.562 2.561-2.999 2.999zm8.001.001c.958.293 1.707 1.042 2 2.001.291-.959 1.042-1.709 1.999-2.001-.957-.292-1.707-1.042-2-2-.293.958-1.042 1.708-1.999 2zm-1-9c-.437 1.437-1.563 2.562-2.998 3.001 1.438.44 2.561 1.564 3.001 3.002.437-1.438 1.563-2.563 2.996-3.002-1.433-.437-2.559-1.564-2.999-3.001zm-7.001 22c-6.617 0-12-5.383-12-12s5.383-12 12-12c1.894 0 3.63.497 5.37 1.179-2.948.504-9.37 3.266-9.37 10.821 0 7.454 5.917 10.208 9.37 10.821-1.5.846-3.476 1.179-5.37 1.179z" /></svg>
                }
            </div>
            
            <div className='lfooter'>
                <div>© 2022 kimtahen. All Rights Reserved</div>
            </div>
        </div>
           )
}


