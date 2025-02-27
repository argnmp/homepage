const USER_LOAD = 'USER_LOAD';

export const userLoad = () => ({type: USER_LOAD});

const initialState = {
    isLogined: null,
    name: null,
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_LOAD: {
            return {
                ...state,
                isLogined: action.payload.isLogined,
                name: action.payload.name,
            }
        }
        default :
            return state;
    }
}

export default userReducer;
