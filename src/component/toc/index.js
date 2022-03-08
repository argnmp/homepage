import React, {useState,useEffect,useRef} from 'react';

import './style.scss';

const Headings = ({headings, activeId}) => {
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
                console.log(nestedHeadings.length);
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
            console.log(nestedHeadings);
            return nestedHeadings;

        }
        
        const composed = composer(headingElements);
        setNestedHeadings(composed);
    },[]);

    useEffect(()=>{
        //console.log('nested',nestedHeadings);
    },[nestedHeadings]);

    return {nestedHeadings};
    
}
const useIntersectionObserver = (setActiveId) => {
    const headingElementsRef = useRef({});
    useEffect(()=>{
        const callback = (headings) => {
            headingElementsRef.current = headings.reduce((map, headingElement)=>{
                map[headingElement.target.id] = headingElement;
                return map;
            },headingElementsRef.current);
            //console.log(headingElementsRef.current)
            
            const visibleHeadings = [];
            Object.keys(headingElementsRef.current).forEach((key)=>{
                const headingElement = headingElementsRef.current[key];
                if(headingElement.isIntersecting) visibleHeadings.push(headingElement);
            });
            
            const getIndexFromId = (id) => 
                headingElements.findIndex((heading) => heading.id === id);
            //console.log('visibleHeadings',visibleHeadings); 
            if(visibleHeadings.length === 1){
                setActiveId(visibleHeadings[0].target.id);
            } else if (visibleHeadings.length > 1) {
                const sortedVisibleHeadings = visibleHeadings.sort(
                    (a,b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
                );
                setActiveId(sortedVisibleHeadings[0].target.id);
            }

        };


        const observer = new IntersectionObserver(callback, {
            rootMargin: '-8px 0px 0px -8px', 
        })
        
        const headingElements = Array.from(document.querySelectorAll("h1, h2, h3"));
        headingElements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    },[])
}
export const Toc = () => {
    const [activeId, setActiveId] = useState();
    const {nestedHeadings} = useHeadingsData();
    useIntersectionObserver(setActiveId);
    return (
        <nav className="toc-wrapper">
            <Headings headings={nestedHeadings} activeId={activeId}/>
        </nav>
    ) 
};

