import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {imgUpload} from '../../modules/upload';
import axios from 'axios';

import {marked} from 'marked';
marked.setOptions({
    headerPrefix: 'hid'
})

import './style.scss';

export const Upload = () => {
    const dispatch = useDispatch();
    const [postData, setPostData] = useState("");
    const inputPanelRef = useRef();
    const outputPanelRef = useRef();

    useEffect(()=>{
        inputPanelRef.current.addEventListener('scroll',()=>{onScroll(inputPanelRef, outputPanelRef)});
        return ()=>inputPanelRef.current.removeEventListener('scroll',()=>{onScroll(inputPanelRef, outputPanelRef)});
    },[]);

    const onScroll = (from, to) => {
        let percentage = from.current.scrollTop / (from.current.scrollHeight - from.current.offsetHeight);
        to.current.scrollTop = percentage * (to.current.scrollHeight - to.current.offsetHeight);
    }
    
    const bottomAnchor = (t)=>{
        t.current.scrollTop = t.current.scrollHeight - t.current.offsetHeight;
    }

    //markdown convert to html
    const mdConverter = (mdraw) => {
        let html = marked.parse(mdraw);
        return html;
    }

    //upload category list renderer
    const categoryData = useSelector(state => state.category.categoryData);
    const categoryRenderer = (categoryData)=>{
        let options = []; 
        const taker = (list) => {
            for(let i in list){
                if(typeof(list[i])=='object'){
                    taker(list[i]);
                }
                else if(list[i]===true){
                    options.push(<option>{i}</option>);
                }
            }
        }
        taker(categoryData);
        return <select>{options}</select>
    }
    
    //image upload button
    let hiddenImgInput = useRef();
    const upload = useSelector(state=>state.upload);
    useEffect(()=>{
        if(upload.isLastImgUploadSuccess===true){
            let currentData = postData;
            for(let i of upload.imgUris){
                currentData += `\n![](${i.url})`;
            }
            inputPanelRef.current.value = currentData;
            setPostData(currentData);
            
        }
    },[upload])
    const imageHandler = (e)=>{
        dispatch(imgUpload(e.target.files));     
    }

    
    return (
        <div className="upload-wrapper">
            <div className="menu-panel">
                <div className="inner">
                    {categoryRenderer(categoryData)}
                    <input type="text" /> 
                    <input type="button" value="IMG" onClick={()=>{hiddenImgInput.current.click()}}/>
                    <input type="file" ref={hiddenImgInput} name="image" multiple accept="image/*" onChange={(e)=>{imageHandler(e)}} />
                    <input type="button" value="UPLOAD"/>
                </div>
            </div>
            <div className="input-panel">
                <div className="inner">
                    <textarea className="postInput" onChange={(e)=>{setPostData(e.target.value); bottomAnchor(outputPanelRef)}} ref={inputPanelRef} ></textarea>
                </div>
            </div>
            <div className="output-panel">
                <div className="inner markdown-wrapper" ref={outputPanelRef}>
                    <div className="markdown-body" dangerouslySetInnerHTML={{__html: mdConverter(postData)}} ></div>
                </div>
            </div>
            
        </div>
           ) 
}
