import * as types from '../actions/ActionTypes';

const initialState = {
    isLogin: false
};

export default function login (state = initialState, action ) {
    switch (action.type) {
        case types.LOGINCHECK:
            return { ...state, isLogin: true };
        case types.LOGOUTCHECK:
            return { ...state, isLogin: false };
        default:
            return state; 
    }
}