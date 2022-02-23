import React from 'react';
import './style.scss';

import {Profile} from './page/profile';

interface props {
    page: string,
    data: string
}

const App : React.FC<props>  = ({page, data}) => {
    return (
    <>
        <Profile data={data}/>
    </>
           )
}
export default App;
