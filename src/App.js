import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import './style.scss';

import {Profile} from './page/profile';
import {Post} from './page/post';
import {PNF} from './page/404';


const App = () => {
    const currentPage = useSelector(state => state.page.currentPage);
    let pageRenderer = (currentPage) => {
        switch(currentPage){
            case 'profile':
                return <Profile/>
            case 'post' :
                return <Post/>
            default :
                return <PNF />
        } 
    }
    return (
    <>
        {pageRenderer(currentPage)}
    </>
           )
}
export default App;
