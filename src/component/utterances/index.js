import React, {createRef, useEffect} from 'react';
import './style.scss';
/*
        <script src="https://utteranc.es/client.js"
        repo="kimtahen/homepage-comments"
        issue-term="pathname"
        theme="github-light"
        crossorigin="anonymous"
        async>
        </script>
        */

const src = 'https://utteranc.es/client.js';

const Utterances = ({repo='kimtahen/homepage-comments', theme='photon-dark'}) => {
    const containerRef = createRef();

    useEffect(()=>{
        const utterances = document.createElement('script');
        const attributes = {
            src,
            repo,
            theme,
            'issue-term': 'pathname',
            'label': 'comments',
            'crossorigin': 'anonymous',
            async: 'true',
        };
        Object.entries(attributes).forEach(([key,value])=>{
            utterances.setAttribute(key,value);
        })
        containerRef.current.appendChild(utterances);

    },[repo]);
    return <div className="utterances-wrapper" ref={containerRef}/>;
}

export default Utterances;
