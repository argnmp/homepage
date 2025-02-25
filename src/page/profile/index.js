import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';

import {Layout} from '../../layout/index';

import './style.scss';

export const Profile = () => {
    const pageData = useSelector(state => state.page.currentPageData);
    return (
        <Layout>
            <div className="profile-wrapper">
                <div className="markdown-body" dangerouslySetInnerHTML={{__html:pageData}}></div>
            </div>
        </Layout>
           ) 
}
