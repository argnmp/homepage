import React, {useEffect} from 'react';
let list = require('../../../server/category/index.json');

import './style.scss';

export const Category = () => {
    const moveHref = (page : any) => {
        document.location.href = `/${page}`;
    }
    let createCategory = (list : any, isUpper : boolean) => {
        let returnElement = [];
        for(let i in list){
            if(typeof(list[i])=='object'){
                returnElement.push(<li key={i}><span className="link-item" onClick={()=>moveHref(i)}>{i}</span>{createCategory(list[i], false)}</li>)        
            }else{
                returnElement.push(<li key={i}><span className="link-item" onClick={()=>moveHref(i)}>{i}</span></li>);
            }
        }
        if(isUpper){
            return <ul className="upper-category-list">{returnElement}</ul>;
        }
        else {
            return <ul className="lower-category-list">{returnElement}</ul>;
            
        }
    }

    return (
        <>
            <div className="header">
                <span>Category</span>
            </div>
            {createCategory(list, true)}
            <div className="header">

            </div>
        </>
    )
}
