import React, {useEffect} from 'react';
import {Layout} from '../../layout/index';

import './style.scss';

interface props {
    data: string
}
export const Category: React.FC<props> = ({data}) => {
    return (
        <Layout>
            <div className="wrapper">
                <div className="markdown-body" dangerouslySetInnerHTML={{__html:data}}></div>
            </div>
        </Layout>
           ) 
}
