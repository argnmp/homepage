const initialState = {
    currentPage: null,
    currentPageData: null,
}
const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PAGE_LOAD': {
            return {
                ...state,
                currentPage: action.payload.currentPage,
                currentPageData: action.payload.currentPageData
            }
        }
        default: 
            return state;
    }
}

export default categoryReducer;