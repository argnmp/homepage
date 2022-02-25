import React, {useEffect} from 'react';
import {Layout} from '../../layout/index';

import './style.scss';

export const Category = ({data}) => {
    return (
        <Layout>
            <div className="wrapper">
                <div className="markdown-body" dangerouslySetInnerHTML={{__html:data}}></div>
            </div>
        </Layout>
           ) 
}
