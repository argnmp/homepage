import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {imgUpload, postUpload} from '../../modules/upload';
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment';

import {marked} from 'marked';
marked.setOptions({
    headerPrefix: 'hid'
})

import './style.scss';

export const Upload = () => {
    const page = useSelector(state=>state.page);
    const dispatch = useDispatch();
    const [postData, setPostData] = useState(page.currentPageData.replace(/&lt;/g,"<").replace(/&gt;/g,">"));
    const [buttonTarget, setButtonTarget] = useState(-1);
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
    
    const bottomAnchor = (t, e)=>{
        if(e.target.scrollHeight===e.target.clientHeight || (e.target.value.length - e.target.selectionStart)<=10)
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
        let idx = 1;
        const taker = (list) => {
            for(let i in list){
                if(typeof(list[i])=='object'){
                    taker(list[i]);
                }
                else if(list[i]===true){
                    options.push(<option key={idx}>{i}</option>);
                    idx++;
                }
            }
        }
        taker(categoryData);
        return <select ref={categoryRef} defaultValue={page.currentPageMetadata.orgCategory}>{options}</select>
    }
    
    //image upload button
    let hiddenImgInput = useRef();
    const upload = useSelector(state=>state.upload);
    const toastId = React.useRef();
    useEffect(()=>{
        if(buttonTarget===0){
            if (upload.isPending == true) {
                toastId.current = toast("Image Upload in progress...", { autoClose: false, theme: 'colored', isLoading: true });
            }
            if (upload.isPending == false && upload.isLastImgUploadSuccess === true) {
                let currentData = postData;
                for (let i of upload.imgUris) {
                    currentData += `\n![](${i.url})`;
                }
                inputPanelRef.current.value = currentData;
                setPostData(currentData);
                toast.dismiss(toastId.current);
                toast.success("Image Upload Success",{theme: 'colored'});
            }
            if (upload.isPending == false && upload.isLastImgUploadSuccess === false) {
                toast.dismiss(toastId.current);
                toast.error("Image Upload Fail",{theme: 'colored'});
            }

        }
    },[upload.isPending])
    const imageHandler = (e)=>{
        e.preventDefault();
        setButtonTarget(0);
        dispatch(imgUpload(e.target.files));     
    }

    //final upload sequence
    let titleRef = useRef();
    let categoryRef = useRef();
    let dateRef = useRef();
    let timeRef = useRef();
    const uploadHander = (e)=>{
        e.preventDefault();
        setButtonTarget(1);

        let uploadDate = new Date(`${dateRef.current.value} ${timeRef.current.value}`);
        let payload = {
            orgUri: page.currentPageMetadata.orgUri,
            title: titleRef.current.value,
            category: categoryRef.current.value,
            data: inputPanelRef.current.value,
            uploadDate,
        }
        if(payload.title===""){
            toast.warn("Title is required",{theme: 'colored'});
            return;
        }
        if(payload.data===""){
            toast.warn("Text is required",{theme: 'colored'});
            return;
        }
        
        dispatch(postUpload(payload));
    }
    useEffect(()=>{
        if(buttonTarget===1){
            if (upload.isPending == true) {
                toastId.current = toast("Post Upload in progress...", {autoClose: false, theme: 'colored', isLoading: true});
            }
            if (upload.isPending == false && upload.isLastPostUploadSuccess === true) {
                toast.dismiss(toastId.current);
                toast.success("Post Upload Success",{theme: 'colored'});
                setTimeout(()=>{
                    window.location.href = upload.redirectUrl;
                },1000);
            }
            if (upload.isPending == false && upload.isLastPostUploadSuccess === false) {
                toast.dismiss(toastId.current);
                toast.error("Post Upload Fail",{theme: 'colored'});
            }
        }
    },[upload.isPending]);

    return (
        <div className="upload-wrapper">
            <div className="menu-panel">
                <div className="menu-inner">
                    {categoryRenderer(categoryData)}
                    <input type="text" ref={titleRef} defaultValue={page.currentPageMetadata.orgTitle} /> 
                    <input type="button" value="img" onClick={()=>{hiddenImgInput.current.click()}}/>
                    <input type="file" ref={hiddenImgInput} name="image" multiple accept="image/*" onChange={(e)=>{imageHandler(e)}} />
                    <input type="date" ref={dateRef} defaultValue={moment(page.currentPageMetadata.orgUploadDate).format('YYYY-MM-DD')}/>
                    <input type="time" ref={timeRef} step='1' defaultValue={moment(page.currentPageMetadata.orgUploadDate).format('HH:mm:ss')}/>
                    <input type="button" value="upload" onClick={(e)=>{uploadHander(e)}}/>
                </div>
            </div>
            <div className="input-panel">
                <div className="inner">
                    <textarea className="postInput" onChange={(e)=>{setPostData(e.target.value);  bottomAnchor(outputPanelRef, e);}} ref={inputPanelRef} defaultValue={page.currentPageData.replace(/&lt;/g,"<").replace(/&gt;/g,">")} ></textarea>
                </div>
            </div>
            <div className="output-panel">
                <div className="inner markdown-wrapper" ref={outputPanelRef}>
                    <div className="markdown-body" dangerouslySetInnerHTML={{__html: mdConverter(postData)}} ></div>
                </div>
            </div>
            <ToastContainer/> 
        </div>
           ) 
}
