import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
//let list = require('../../../server/metadata/category.json');

import './style.scss';

export const Category = () => {
    const list = useSelector(state => state.category.categoryData);
    let getUrl = (page, isPost, upperPage) => {
        let targetUrl;
        if(isPost){
            if(upperPage == null)
                targetUrl = `/post/${page}`
            else 
                targetUrl = `/post/${upperPage}/${page}`
        }
        else{
            targetUrl = `/${page}`;
        }
        return targetUrl;
    }

    let createCategory = (list, isUpper, upperPage) => {
        let returnElement = [];
        for(let i in list){
            if(typeof(list[i])=='object'){        
                const targetUrl = getUrl(i,true,upperPage);
                returnElement.push(<li key={i} onClick={(e)=>{e.stopPropagation(); document.location.href=targetUrl;}}>{i}{createCategory(list[i], false, i)}</li>)        
                //stopPropagation이 없다면 onclick 이벤트가 버블링 되어서 상위의 카테고리가 마지막으로 눌리게 됨. 이것때문에 많이 고생함..
            }else{

                const targetUrl = getUrl(i,list[i],upperPage);
                returnElement.push(<li key={i} onClick={(e)=>{e.stopPropagation(); document.location.href=targetUrl;}}>{i}</li>);
            }
        }
        if(isUpper){
            return <ul className="upper-category-list">{returnElement}</ul>;
        }
        else {
            return <ul className="lower-category-list">{returnElement}</ul>;
            
        }
    }
    useEffect(()=>{createCategory(list,true,null)},[]);
    return (
        <>
            <div className="header">
                <span>Category</span>
            </div>
            {createCategory(list, true, null)}
            <div className="header">

            </div>
        </>
    )
}
