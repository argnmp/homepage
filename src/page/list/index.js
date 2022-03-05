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
                <span><a href={`/category${currentUri}?page=${number}`}>{number}</a></span>
            </li>
        ))} 
        </ul>
    )
}
const Item = ({uri,title, author, date}) => {
    return (
        <div className="item-wrapper">
            <div className="title-wrapper">
                <a href={`/post/${uri}`}><span className="title">{title}</span></a>
            </div>
            <div className="info-wrapper">
                <span className="author">{author}</span>
                <span className="bar">|</span>
                <span className="date">{date}</span>
            </div>
        </div>
    )
}
export const List = () => {
    const list = useSelector(state => state.page.currentPageData);
    const {currentCategory, totalPost, startPage, endPage, currentPage, currentUri} = useSelector(state => state.page.currentPageMetadata);
    const listRenderer = (list) => {
        let result = [];
        for(let i of list){
            result.push(<li><Item uri={i.uri} title={i.title} author={i.author} date={moment(i.uploadDate).format('YYYY-MM-DD hh:mm:ss')}/></li>);
        }
        return <ul>{result}</ul>;
    }
    return (
        <Layout>
            <div className="wrapper">
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
