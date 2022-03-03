import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import './style.scss';

import {Index} from './page/index';
import {Profile} from './page/profile';
import {Post} from './page/post';
import {List} from './page/list';
import {PNF} from './page/404';


const App = () => {
    const currentPage = useSelector(state => state.page.currentPage);
    let pageRenderer = (currentPage) => {
        switch(currentPage){
            case 'index':
                return <Index/>
            case 'profile':
                return <Profile/>
            case 'post' :
                return <Post/>
            case 'list' :
                return <List/>
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
