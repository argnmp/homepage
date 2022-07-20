import React, {useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Layout} from '../../layout/index';
import {Comment} from '../../component/comment';
import moment from 'moment';
import { postDelete } from '../../modules/common';
import { Toc } from '../../component/toc';

import './style.scss';

export const Post = () => {
    const dispatch = useDispatch();
    const pageData = useSelector(state => state.page.currentPageData);
    const pageMetadata = useSelector(state=>state.page.currentPageMetadata);
    let common = useSelector(state=>state.common);
    const user = useSelector(state => state.user);

    const postRef = useRef();

    const deleteHandler = (e)=>{
        e.preventDefault();
        dispatch(postDelete(pageMetadata.uri));
    }
    useEffect(()=>{
        const imgs = postRef.current.querySelectorAll("img"); 
        imgs.forEach((img)=>img.addEventListener("click",(e)=>{
            window.open(img.src);
        }))
        const hids = postRef.current.querySelectorAll("h1, h2, h3, h4, h5, h6");
        hids.forEach((h)=>{
            const a = document.createElement("a");
            a.href = '#'+h.id;
            a.innerText = h.innerText;
            h.innerText = "";
            h.appendChild(a);
        })
    }, []);
    useEffect(()=>{
        if((common.isPending===false) && (common.isLastPostDeletionSuccess===true)){
            window.location.href = common.redirectUrl;
        }
    },[common.isPending]);
    
    return (
        <Layout isToc={true}>
            <div className="upwrapper">
                <div className="index">
                    <div className="index-down">
                        <div className="index-category">
                            <span>{pageMetadata.category}</span>
                        </div>
                        <div className="title">
                            {pageMetadata.title}
                        </div>
                        <div className="payload">
                            <span>{pageMetadata.view} views</span>
                            <span>{moment(pageMetadata.uploadDate).format('YYYY-MM-DD hh:mm:ss')}  </span>
                            <span><i>posted by </i>{pageMetadata.author}</span>
                        </div>
                        {user.isLogined && user.level == 0 &&
                            <div className="options">
                                <span><a href={`/upload/${pageMetadata.uri}`}>수정</a></span>
                                <span onClick={(e) => { deleteHandler(e) }}>삭제</span>
                            </div>
                        }

                    </div>
                </div>
                <div className="postcontent">
                    <div className="dummywrapper"></div>
                    <div className="postinnercontent">
                        <div ref={postRef} className="markdown-body" dangerouslySetInnerHTML={{ __html: pageData.replace(/&amp;lt;/g, "<").replace(/&amp;gt;/g, ">") }}></div>
                    </div>
                    <div className="tocwrapper">
                        <div className='tocinnerwrapper'>
                            <Toc/>                        
                        </div>
                    </div>
                </div>
                <Comment />

            </div>
        </Layout>
           ) 
}
