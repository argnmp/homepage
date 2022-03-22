import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {imgUpload, postUpload} from '../../modules/upload';

import {marked} from 'marked';
marked.setOptions({
    headerPrefix: 'hid'
})

import './style.scss';

export const Upload = () => {
    const page = useSelector(state=>state.page);
    const dispatch = useDispatch();
    const [postData, setPostData] = useState(page.currentPageData);
    const inputPanelRef = useRef();
    const outputPanelRef = useRef();
    


    //scroll syncronization
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
                    options.push(<option key={i}>{i}</option>);
                }
            }
        }
        taker(categoryData);
        return <select ref={categoryRef} defaultValue={page.currentPageMetadata.orgCategory}>{options}</select>
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
    },[upload.imgUris])
    const imageHandler = (e)=>{
        e.preventDefault();
        dispatch(imgUpload(e.target.files));     
    }

    //final upload sequence
    let titleRef = useRef();
    let categoryRef = useRef();
    const uploadHander = (e)=>{
        e.preventDefault();
        let payload = {
            orgUri: page.currentPageMetadata.orgUri,
            title: titleRef.current.value,
            category: categoryRef.current.value,
            data: inputPanelRef.current.value
        }
        dispatch(postUpload(payload));
    }
    useEffect(()=>{
        if(upload.isLastPostUploadSuccess===true){
            window.location.href = upload.redirectUrl;
        }
    },[upload.redirectUrl]);

    useEffect(()=>{
        console.log(upload);
    },[upload.isPending]);
    
    
    return (
        <div className="upload-wrapper">
            <div className="menu-panel">
                <div className="inner">
                    {categoryRenderer(categoryData)}
                    <input type="text" ref={titleRef} defaultValue={page.currentPageMetadata.orgTitle} /> 
                    <input type="button" value="img" onClick={()=>{hiddenImgInput.current.click()}}/>
                    <input type="file" ref={hiddenImgInput} name="image" multiple accept="image/*" onChange={(e)=>{imageHandler(e)}} />
                    <input type="button" value="upload" onClick={(e)=>{uploadHander(e)}}/>
                </div>
            </div>
            <div className="input-panel">
                <div className="inner">
                    <textarea className="postInput" onChange={(e)=>{setPostData(e.target.value); bottomAnchor(outputPanelRef)}} ref={inputPanelRef} defaultValue={page.currentPageData} ></textarea>
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
