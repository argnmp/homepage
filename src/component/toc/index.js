import React, {useState,useEffect,useRef} from 'react';
import { useDispatch } from 'react-redux';
import { tocheaderSet } from '../../modules/common';

import './style.scss';

const Headings = ({headings, activeId}) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        let search = (list)=>{
            for(let i of list){
                if(i.id===activeId){
                    return i.title;   
                } else{
                    if(i.items.length>0){
                        let res = search(i.items);
                        if(res) return res;
                    } 
                }
            } 
            
        }
        if(headings){
            let header = search(headings); //false or title
            dispatch(tocheaderSet(header ? header : 'TOC Ready' )); 
        }
    },[activeId]);
    

    const renderer = (list) => {
        let lilist = [];
        for(let i of list){
            let lowerlist;
            if(i.items.length > 0){
                lowerlist = renderer(i.items);
            }
            lilist.push(<li key={`${i.id}`} className={i.id === activeId ? "active" : ""}><a 
                href={`#${i.id}`} 
                onClick={(e)=>{
                    e.preventDefault();
                    document.querySelector(`#${i.id}`).scrollIntoView({
                        behavior: "smooth"
                    });
                }}>{i.title}</a>{lowerlist}</li>)
        }
        return (
            <ul>
                {lilist}
            </ul>
        )
    }
    return (
        <>
            {headings===undefined ? '' : renderer(headings)}
        </>
    )
}
const useHeadingsData = () => {
    const [nestedHeadings, setNestedHeadings] = useState();

    useEffect(()=>{
        const headingElements = Array.from(
            document.querySelectorAll("h1,h2,h3")
        );
        let searchIndex = 0;
        const composer = (headingElements) =>{

            let nestedHeadings = [];
            while(searchIndex < headingElements.length){
                const {innerText: title, id, nodeName} = headingElements[searchIndex];
                let h = nodeName === "H1" ? 1 : nodeName === "H2" ? 2 : 3;

                if(nestedHeadings.length === 0 || nestedHeadings[nestedHeadings.length-1].h == h){
                    nestedHeadings.push({h, id, title, items: []});
                }
                else if(nestedHeadings[nestedHeadings.length-1].h > h){
                    searchIndex --;
                    break;
                }
                else{
                    let returnItems = composer(headingElements);
                    returnItems.forEach((item)=>{
                        nestedHeadings[nestedHeadings.length-1].items.push(item);
                    })
                }
                searchIndex++;
            }
            return nestedHeadings;

        }
        
        const composed = composer(headingElements);
        setNestedHeadings(composed);
    },[]);


    return {nestedHeadings};
    
}
const useIntersectionObserver = (setActiveId) => {
    let init;
    if (window.innerWidth <= 576) {
        init = 1;
    } else if (window.innerWidth <= 1200) {
        init = 2;
    } else {
        init = 3;
    }
    
    const [currentWindowState, setCurrentWindowState] = useState(init);
    const currentWindowRef = useRef();
    currentWindowRef.current = init;

    const headingElementsRef = useRef({});
    useEffect(()=>{
        //window resize event handler with rare rendering
        const handleResize = () => {
            let newState;
            if (window.innerWidth <= 768) {
                newState = 1;
            } else if (window.innerWidth <= 1200) {
                newState = 2;
            } else {
                newState = 3;
            }
            if (newState != currentWindowRef.current) {
                setCurrentWindowState(newState);
                currentWindowRef.current = newState;
            }
        };
        window.addEventListener('resize', handleResize);

        const callback = (headings) => {
            headingElementsRef.current = headings.reduce((map, headingElement)=>{
                map[headingElement.target.id] = headingElement;
                return map;
            },headingElementsRef.current);
            
            const visibleHeadings = [];
            Object.keys(headingElementsRef.current).forEach((key)=>{
                const headingElement = headingElementsRef.current[key];
                if(headingElement.isIntersecting) visibleHeadings.push(headingElement);
            });
            const getIndexFromId = (id) => 
                headingElements.findIndex((heading) => heading.id === id);

            if(visibleHeadings.length >= 1){
                setActiveId(visibleHeadings[visibleHeadings.length-1].target.id);
            }
            else {
                setActiveId('TOC Ready');
            }

            // if(visibleHeadings.length === 1){
            //     setActiveId(visibleHeadings[0].target.id);
            // } else if (visibleHeadings.length > 1) {
            //     const sortedVisibleHeadings = visibleHeadings.sort(
            //             (a,b) => getIndexFromId(a.target.id) < getIndexFromId(b.target.id)
            //     );
            //     setActiveId(sortedVisibleHeadings[0].target.id);
            // }

        };


        let topMargin;  
        let bottomMargin;
        console.log(currentWindowRef.current);
        switch(currentWindowRef.current){
            case 1:
                topMargin = `${document.body.scrollHeight - 78}px`;
                bottomMargin = `-${window.innerHeight - 78}px`;
                break;
            case 2:
                topMargin = `${document.body.scrollHeight - 24}px`;
                bottomMargin = `-${window.innerHeight - 24}px`;
                break;
            case 3:
                topMargin = `${document.body.scrollHeight - 24}px`;
                bottomMargin = `-${window.innerHeight - 24}px`;
                break;
        }
        const observer = new IntersectionObserver(callback, {
            rootMargin: `${topMargin} 0px ${bottomMargin} 0px`, 
            threshold: 0,
        })
        
        const headingElements = Array.from(document.querySelectorAll("h1, h2, h3"));
        headingElements.forEach((element) => observer.observe(element));

        return () => {
            window.removeEventListener('resize', handleResize);
            return observer.disconnect();
        }
    },[])
}
export const Toc = () => {
    if (typeof window === 'undefined') return (<></>);

    const [activeId, setActiveId] = useState();
    const {nestedHeadings} = useHeadingsData();
    useIntersectionObserver(setActiveId);
    return (
        <nav className="toc-wrapper">
            <Headings headings={nestedHeadings} activeId={activeId} />
        </nav>
    ) 
};

