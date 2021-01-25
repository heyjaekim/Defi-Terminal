import * as types from './ActionTypes';

export const loginCheck = () => {
    return {
        type: types.LOGINCHECK,
    };
};

export const logoutClickevent = () => {
    console.log('DISCONNECTED THE METAMASK WALLET FROM THE SEVER');
    return {
        type: types.LOGOUTCHECK,
    };
};