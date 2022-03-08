const CATEGORY_LOAD = 'CATEGORY_LOAD';

export const categoryLoad = ({type: CATEGORY_LOAD});

const initialState = {
    categoryData: null,
}

const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORY_LOAD: {
            return {
                ...state,
                categoryData: action.payload.categoryData
            }
        }
        default :
            return state;
    }
}

export default categoryReducer;
