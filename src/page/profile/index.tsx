import React, {useEffect} from 'react';
import {Layout} from '../../layout/index';

import './style.scss';

interface props {
    data: string
}
export const Profile: React.FC<props> = ({data}) => {
    return (
        <Layout>
            <div className="markdown-body" dangerouslySetInnerHTML={{__html:data}}></div>
        </Layout>
           ) 
}
