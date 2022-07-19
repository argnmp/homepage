import React, {useEffect} from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import {Layout} from '../../layout/index';

import './style.scss';

const Pagination = ({startPage, endPage, currentPage, currentUri}) => {
    let pageNumbers = []; 
    for(let i = startPage; i<=endPage; i++) pageNumbers.push(i);
    return (
        <ul>
        {pageNumbers.map((number,index)=>(
            <li key={index}>
                <span className={`${number===currentPage ? 'current' : ''}`}><a href={`/category${currentUri}?page=${number}`}>{number}</a></span>
            </li>
        ))} 
        </ul>
    )
}
const Item = ({uri,title, author, date, preview, view}) => {
    return (
        <div className="item-wrapper" onClick={()=>{location.href = `/post/${uri}`}}>
            <div className="title-wrapper">
                <span className="title">{title}</span>
            </div>
            <div className="preview-wrapper">
                {preview}
            </div>
            <div className="info-wrapper">
                <span className="author">{author}</span>
                <span className="bar">|</span>
                <span className="date">{date}</span>
                <span className="view">{view} views</span>
            </div>
        </div>
    )
}
export const List = () => {
    const list = useSelector(state => state.page.currentPageData);
    const {currentCategory, totalPost, startPage, endPage, currentPage, currentUri} = useSelector(state => state.page.currentPageMetadata);

    const listRenderer = (list) => {
        let result = [];
        let k = 0;
        
        for(let i of list){
            result.push(<Item key={k} view={i.view} uri={i.uri} title={i.title} author={'author' in i  ? i.author.name : 'undefined'} date={moment(i.uploadDate).format('YYYY-MM-DD hh:mm:ss')} preview={i.preview.replace(/&lt;/g,"<").replace(/&gt;/g,">")}/>);
            k++;
        }
        return result;
    }
    return (
        <Layout>
            <div className="listupperwrapper">
                <div className="index-wrapper">
                    <span className="category">{currentCategory}</span>
                    <span className="post">{totalPost} posts</span>
                </div>
                <div className="list-wrapper">
                    {listRenderer(list)} 
                </div>
                <div className="pn-wrapper">
                    <Pagination startPage={startPage} endPage={endPage} currentPage={currentPage} currentUri={currentUri}/>
                </div>
            </div>
        </Layout>
           ) 
}
