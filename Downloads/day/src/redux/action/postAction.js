import axios from 'axios';
import { POST_LIST } from '../actionTypes'

export const postAction = {
    fetchList: () => (dispatch,getState) => {
        console.log(getState())
        axios({
            method:'GET',
            url:'https://jsonplaceholder.typicode.com/posts'
        })
        .then(resp=>{
            dispatch({type:POST_LIST, payload:resp.data});
        })
    },

    list: (payload) => {
        return { type:POST_LIST, payload };
    },
}