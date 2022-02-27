import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';

import {Layout} from '../../layout/index';

import './style.scss';

export const Index = () => {
    const pageData = useSelector(state => state.page.currentPageData);
    return (
        <Layout>
            <div className="wrapper">
                <div className="markdown-body" dangerouslySetInnerHTML={{__html:pageData}}></div>
            </div>
        </Layout>
           ) 
}
