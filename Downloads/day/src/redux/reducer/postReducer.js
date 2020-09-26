import { POST_LIST } from "../actionTypes";

const postInitialState = {};

const postReducer = function(state,action) {
    state = state || postInitialState;

    if(action.type === POST_LIST) {
        return { ...action.payload };
    }

    return state;
}

export default postReducer;