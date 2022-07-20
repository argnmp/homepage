import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';

import {Logo} from '../logo/index';

import './style.scss';

const User = ()=>{
    const user = useSelector(state => state.user);
    return (
        <div className="user-wrapper">
            {user.isLogined ?
                [<div key={1} className="user-item user-name">{user.name}</div>,
                    <div key={2} className="user-item user-item-upload"><a href="/upload">upload</a></div>,
                    <div key={2} className="user-item"><a href="/api/logout">logout</a></div>] :
                <div className='user-item'>
                    <a href="/api/login">login</a>
                </div>
            }
            {!user.isLogined &&
                <div className="user-item user-item-register">
                    <a href="/api/register">register</a>
                </div>
            }
        </div>
    )
}

export const Header = ({sideToggle, onSideToggle}) => {
    const categoryList = useSelector(state => state.category.categoryData.categoryList);
    const categoryCount = useSelector(state => state.category.categoryData.categoryCount);
    let upperLevel = [];
    let lowerLevel = [];
    let getUrl = (page, isPost, upperPage) => {
        let targetUrl;
        if(isPost){
            if(upperPage == null)
                targetUrl = `/category/${page}`
            else 
                targetUrl = `/category/${upperPage}/${page}`
        }
        else{
            targetUrl = `/${page}`;
        }
        return targetUrl;
    }

    for (let i in categoryList) {
        if(typeof(categoryList[i])=='object'){
            let lowerLevelRef = useRef();
            let tempList = [];  
            for(let k in categoryList[i]){
                tempList.push(<div className="lowerItem"><div><a href={getUrl(k, categoryList[i][k], i)}>{`${k}${(categoryList[i][k] && (categoryCount[k]!==null)) ? '('+categoryCount[k]+')' : ""}`}</a></div></div>) 
            }
            lowerLevel.push(<div className="sub-header-wrapper"><div className="sub-header" 
                    onMouseEnter={() => {
                        lowerLevelRef.current.style.height = "40px";
                    }}
                    onMouseLeave={() => {
                        lowerLevelRef.current.style.height = "0px";
                    }} 
                    ref={lowerLevelRef}
            >
                <div className="lowerItems">{tempList}</div></div></div>);

            upperLevel.push(<div className="upperItem" 
            onMouseEnter={(e) => {
                lowerLevelRef.current.style.height = "40px";
            }}
            onMouseLeave={() => {
                lowerLevelRef.current.style.height = "0px";
            }} 
            
            ><div><a href={getUrl(i, categoryList[i], null)}>{`${i}${categoryCount[i]!==null ? '('+categoryCount[i]+')' : ""}`}</a></div></div>);
        }
        else {
            upperLevel.push(<div className="upperItem"><div><a href={getUrl(i, categoryList[i], null)}>{i}{(categoryList[i] && (categoryCount[i]!==null)) ? '('+categoryCount[i]+')' : ""}</a></div></div>);

        }
    }
    
    useEffect(()=>{
    },[]);
    return (
        <div className={`lheader`}>
            <div className={`main-header`}>
                <div className={`bg-btn ${sideToggle ? "btn-open" : ""}` } onClick={()=>{onSideToggle();}} >
                    <div className={`burger-btn`}></div>
                </div>
                <Logo />
                <div className={`main-header-items`}>
                    <div className="upperItems">
                        {upperLevel}
                    </div>
                </div>
                <User />
            </div>
            <div className={`mdlg-header`}>
                <div className="upperItems">
                    {upperLevel}
                </div>
            </div>
            {lowerLevel}
        </div>
    )
}
