import React, {useEffect} from 'react';
import './style.scss';

import {Category} from './page/category';
import {PNF} from './page/404';


interface props {
    page: string,
    data: string
}

const App : React.FC<props>  = ({page, data}) => {
    let pageRenderer = (page: any) => {
        switch(page){
            case 'category' :
                return <Category data={data}/>
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
