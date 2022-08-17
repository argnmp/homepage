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
                <div>
                    <span className="author">{author}</span>
                    <span className="bar">|</span>
                    <span className="date">{date}</span>
                </div>
                <div className="view">{view} views</div>
            </div>
        </div>
    )
}
export const List = () => {
    const list = useSelector(state => state.page.currentPageData);
    const {currentCategory, totalPost, startPage, endPage, currentPage, currentUri} = useSelector(state => state.page.currentPageMetadata);

    const listRenderer = (list) => {
        let result = [];
        let odd_result = [];
        let even_result = [];
        
        list.forEach((i, idx) => {
            result.push(<Item key={idx} view={i.view} uri={i.uri} title={i.title} author={'author' in i  ? i.author.name : 'undefined'} date={moment(i.uploadDate).format('YYYY-MM-DD HH:mm:ss')} preview={i.preview.replace(/&lt;/g,"<").replace(/&gt;/g,">")}/>);
            if(idx%2==0){
                odd_result.push(<Item key={idx} view={i.view} uri={i.uri} title={i.title} author={'author' in i  ? i.author.name : 'undefined'} date={moment(i.uploadDate).format('YYYY-MM-DD HH:mm:ss')} preview={i.preview.replace(/&lt;/g,"<").replace(/&gt;/g,">")}/>);
            } 
            else {
                even_result.push(<Item key={idx} view={i.view} uri={i.uri} title={i.title} author={'author' in i  ? i.author.name : 'undefined'} date={moment(i.uploadDate).format('YYYY-MM-DD HH:mm:ss')} preview={i.preview.replace(/&lt;/g,"<").replace(/&gt;/g,">")}/>);

            }
        });
        return (
            <>
            <div className='list-wrapper'>
                <div className='list-column-wrapper'>
                    {odd_result}
                </div>
                <div className='list-column-wrapper'>
                    {even_result}
                </div>
            </div>
            <div className='list-wrapper-smmd'>
                <div className='list-column-wrapper'>
                    {result}
                </div>
            </div>
            </>
            );
    }
    return (
        <Layout>
            <div className="listupperwrapper">
                <div className="index-wrapper">
                    <span className="category">{currentCategory}</span>
                    <span className="post">{totalPost} posts</span>
                </div>
                {listRenderer(list)} 
                <div className="pn-wrapper">
                    <Pagination startPage={startPage} endPage={endPage} currentPage={currentPage} currentUri={currentUri}/>
                </div>
            </div>
        </Layout>
           ) 
}
