import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import {Layout} from '../../layout/index';
import moment from 'moment';

import './style.scss';

export const Post = () => {
    const pageData = useSelector(state => state.page.currentPageData);
    const pageMetadata = useSelector(state=>state.page.currentPageMetadata);
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
                </div>
                <div className="wrapper">
                <div className="markdown-body" dangerouslySetInnerHTML={{__html:pageData}}></div>
                </div>

            </div>
        </Layout>
           ) 
}
