//comment list sorted by depth   
export const commentBuilder = (comments) => {
    for(let i = 0; i<comments.length; i++){
        if(comments[i].isDeleted === true){
            comments[i].data = "이 댓글은 작성자에 의해 삭제되었습니다.";
        }
    }
    let copy = comments.slice();
    for(let i = 0; i<comments.length; i++){
        for(let k = 0; k<copy.length; k++){
            if((copy[k].depth === comments[i].depth-1) && (copy[k]._id.toString()===comments[i].parentComment.toString())){
                copy[k].childComments.push(comments[i]);
                copy.shift();
            }
        }
    }
    return copy;
}
