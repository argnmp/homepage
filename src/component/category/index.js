import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
//let list = require('../../../server/metadata/category.json');

import './style.scss';

export const Category = () => {
    const categoryList = useSelector(state => state.category.categoryData.categoryList);
    const categoryCount = useSelector(state => state.category.categoryData.categoryCount);
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

    let createCategory = (list, isUpper, upperPage) => {
        let returnElement = [];
        for(let i in list){
            if(typeof(list[i])=='object'){        
                const targetUrl = getUrl(i,true,upperPage);
                returnElement.push(<li key={i} >
                    <div className='category-text'>
                        <span onClick={(e)=>{e.stopPropagation(); document.location.href=targetUrl;}}>{`${i} ${categoryCount[i]!==null ? '('+categoryCount[i]+')' : ""}`}</span>
                    </div>
                    {createCategory(list[i], false, i)}
                    </li>)        
                //stopPropagation이 없다면 onclick 이벤트가 버블링 되어서 상위의 카테고리가 마지막으로 눌리게 됨. 이것때문에 많이 고생함..
            }else{

                const targetUrl = getUrl(i,list[i],upperPage);
                returnElement.push(<li key={i}>
                    <div className='category-text'>
                        <span onClick={(e)=>{e.stopPropagation(); document.location.href=targetUrl;}}>{`${i} ${categoryCount[i]!==null ? '('+categoryCount[i]+')' : ""}`}</span>
                    </div>
                    </li>);
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
        <div className="category-wrapper">
            {createCategory(categoryList, true, null)}
        </div>
    )
}
