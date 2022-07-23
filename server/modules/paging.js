const paging = (page, totalPost) => {
    const maxPost = 12;
    const maxPage = 10;
    let currentPage = page ? parseInt(page) : 1;
    const totalPage = Math.ceil(totalPost/maxPost);
    if(currentPage > totalPage){
        
        currentPage = totalPage === 0 ? currentPage : totalPage;
    }
    const hidePost = (currentPage-1)*maxPost;
    const startPage = Math.floor(((currentPage - 1)/maxPage)) * maxPage + 1;
    let endPage = startPage + maxPage -1;
    if(endPage > totalPage){
        endPage = totalPage;
    }
    return {startPage, endPage, hidePost, maxPost, totalPage, currentPage};
}
export default paging
