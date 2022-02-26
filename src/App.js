import React, {useEffect} from 'react';
import './style.scss';

import {Profile} from './page/profile';
import {Post} from './page/post';
import {PNF} from './page/404';


const App = ({page, data}) => {
    let pageRenderer = (page) => {
        switch(page){
            case 'profile':
                return <Profile data={data}/>
            case 'post' :
                return <Post data={data}/>
            default :
                return <PNF />
        } 
    }
    return (
    <>
        {pageRenderer(page)}
    </>
           )
}
export default App;
