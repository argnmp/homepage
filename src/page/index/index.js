import React, {useEffect, useRef} from 'react';
import { useSelector } from 'react-redux';

import {Layout} from '../../layout/index';

import './style.scss';


export const Index = () => {
    const pageMetadata = useSelector(state => state.page.currentPageMetadata); 
    let targetCode = pageMetadata.code.replaceAll("<","&lt;").replaceAll(">","&gt;");
    pageMetadata.hi.forEach((elem)=>{targetCode = targetCode.replace(elem,`<span class="hi">${elem}</span>`)})

    const outputRef = useRef();
    const buttonRef = useRef();
    const embRef = useRef();
    const onExecute = ()=>{
        pageMetadata.output.forEach((element, idx) => {
            let t = document.createElement('div');
            t.innerText = element;
            setTimeout(()=>{
                outputRef.current.appendChild(t);
                if(idx===pageMetadata.output.length-1){
                    embRef.current.style.display = "";
                    const ytPlayer = embRef.current.querySelector('iframe');
                    ytPlayer.src += '?&autoplay=1';
                }
            },100*(idx+1));
        });
        buttonRef.current.remove();
    }
    return (
        <Layout>
            <div className="indexwrapper">
                <div className="innerwrapper">
                    <div>
                        <span>{'main.rs'}</span>
                        <div className="codewrapper">
                            <pre className="dummycode" dangerouslySetInnerHTML={{ __html: targetCode }}>
                            </pre>
                            <div>
                                <input type="button" value="EXECUTE" onClick={onExecute} ref={buttonRef} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <span>{'$bash'}</span>
                        <div className="codewrapper">
                            <pre className="dummycode" ref={outputRef}>
                            </pre>
                        </div>
                    </div>
                    <div ref={embRef} style={{ display: "none" }} >
                        <span>{'target'}</span>
                        <div className='codewrapper'>
                            <div dangerouslySetInnerHTML={{ __html: pageMetadata.emb }}></div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
           ) 
}
