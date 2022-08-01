import React, {useEffect, useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import './style.scss';

import { commentCreate, commentEdit, commentDelete } from '../../modules/comment';

const CommentRequestHead = ({depth}) => {
    const pageMetadata = useSelector(state=>state.page.currentPageMetadata);
    const dispatch = useDispatch();
    const inputRef = useRef();
    const applyHandler = (e) => {
        e.preventDefault();
        let payload = {
            depth,
            postId: pageMetadata._id,
            data: inputRef.current.value,
        }
        if(depth > 1){
            payload = {...payload, parentCommentId}
        }
        dispatch(commentCreate(payload));
        
    }
    return (
        <div className='commentRequest-wrapper'>
            <div className="box">
                <textarea className="comment-input" ref={inputRef} />
                <div>
                    <input type="button" onClick={(e) => {
                        applyHandler(e);
                    }} value="작성하기" />
                </div>
            </div> 
        </div>
    )

}
const CommentRequest = ({ depth, parentCommentId, author}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const pageMetadata = useSelector(state=>state.page.currentPageMetadata);
    const [isReplyOpen, setIsReplyOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const inputRef = useRef();
    const replyHandler = (e) => {
        e.preventDefault();
        let payload = {
            depth,
            postId: pageMetadata._id,
            data: inputRef.current.value,
        }
        if(depth > 1){
            payload = {...payload, parentCommentId}
        }
        dispatch(commentCreate(payload));
        
    }
    const editHandler = (e) => {
        e.preventDefault();
        let payload = {
            commentId: parentCommentId,
            data: inputRef.current.value,
        }
        dispatch(commentEdit(payload));
    }
    const deleteHandler = (e)=>{
        e.preventDefault();
        let payload = {
            _id: parentCommentId
        }
        dispatch(commentDelete(payload));
    }

    return (
        <div className='commentRequest-wrapper'>
            <div className="menu">
                {(depth != 1) && <input type="button" onClick={() => { setIsReplyOpen(!isReplyOpen); setIsEditOpen(false); }} value="답글" />}
                {(user._id.toString() === author._id.toString()/*||1*/) && (depth != 1) && <input type="button" onClick={() => { setIsEditOpen(!isEditOpen); setIsReplyOpen(false); }} value="수정" />}
                {(user._id.toString() === author._id.toString()/*||1*/) && (depth != 1) && <input type="button" onClick={(e) => { deleteHandler(e) }} value="삭제" />}
            </div>
            {(isReplyOpen || (depth == 1)) && <div className="box">
                <textarea className="comment-input" ref={inputRef}/>
                <div>
                <input type="button" onClick={(e)=>{
                    replyHandler(e);
                }} value="댓글 달기"/>
                </div>
                </div>} 
            {(isEditOpen) && <div className="box">
                <textarea className="comment-input" ref={inputRef}/>
                <div>
                    <input type="button" onClick={(e) => {
                        editHandler(e);
                    }} value="수정하기" />

                </div>
                </div>} 
        </div>
    )
    
}
const Item = ({commentId, index, data, author, uploadDate, editDate, depth}) => {
    const user = useSelector(state => state.user);
    return (
        <div key={index} className="comment-item-wrapper" style={{marginLeft: `${40*(depth-1)}px`}}>
            <div>
            <span className="author">{author.name}</span>
            <span className="uploadDate"><i>{uploadDate} {editDate==null ? '' : `| 수정: ${moment(editDate).format('YYYY-MM-DD hh:mm:ss')}`}</i></span>
            <div className="data">{data}</div>
            </div>
            {user.isLogined && depth < 5 && <CommentRequest depth={depth+1} parentCommentId={commentId} author={author} orgData={data}/>}
        </div>
    )

}
export const Comment = () => {
    const user = useSelector(state => state.user);
    const pageMetadata = useSelector(state=>state.page.currentPageMetadata);
    let comment = useSelector(state => state.comment);
    useEffect(()=>{
        if((comment.isPending===false)&&((comment.isLastCommentCreateSuccess===true)||(comment.isLastCommentEditSuccess===true)||(comment.isLastCommentDeleteSuccess===true))){
            window.location.reload();
        }
    },[comment.isPending]);

    let key=1;
    const renderer = (arr, depth) => {
        let renderResult = [];
        for(let i of arr){
            //_id is not a string, id is a string type
            renderResult.push(<Item key={key++} commentId={i.id} data={i.data} author={i.author} uploadDate={moment(i.uploadDate).format('YYYY-MM-DD hh:mm:ss')} editDate={i.hasOwnProperty('editDate') ? i.editDate : null} depth={depth}/>);
            if(i.childComments.length > 0){
                renderResult = renderResult.concat(renderer(i.childComments, depth + 1));
            }
        } 
        return renderResult;
    }
        
    return (
        <div className="comment-wrapper">
            <div className="comment-inner-wrapper">
                <div className="title">댓글</div>
                {user.isLogined ? <CommentRequestHead depth={1} /> : <div className="notLogined">로그인 후 댓글 작성이 가능합니다.</div>}
                {renderer(pageMetadata.comments, 1)}

            </div>
        </div>
    )
}
