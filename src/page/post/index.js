import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Layout} from '../../layout/index';
import moment from 'moment';
import { postDelete } from '../../modules/common';

import './style.scss';

export const Post = () => {
    const dispatch = useDispatch();
    const pageData = useSelector(state => state.page.currentPageData);
    const pageMetadata = useSelector(state=>state.page.currentPageMetadata);
    let common = useSelector(state=>state.common);
    const user = useSelector(state => state.user);

    const deleteHandler = (e)=>{
        e.preventDefault();
        dispatch(postDelete(pageMetadata.uri));
    }
    useEffect(()=>{
        if(common.isLastFunctionSuccess===true){
            window.location.href = common.redirectUrl;
        }
    },[common.isLastFunctionSuccess]);
    return (
        <Layout isToc={true}>
            <div className="upwrapper">
                <div className="index">
                    <div className="title">
                        {pageMetadata.title}
                    </div>
                    <div className="payload">
                        <span>{moment(pageMetadata.uploadDate).format('YYYY-MM-DD hh:mm:ss')}  </span>
                        <span><i>posted by </i>{pageMetadata.author}</span>
                    </div>
                    {user.isLogined && 
                    <div className="options">
                        <span><a href={`/upload/${pageMetadata.uri}`}>수정</a></span>
                        <span onClick={(e)=>{deleteHandler(e)}}>삭제</span>
                    </div>
                    }
                </div>
                <div className="wrapper">
                <div className="markdown-body" dangerouslySetInnerHTML={{__html:pageData}}></div>
                </div>

            </div>
        </Layout>
           ) 
}
