import { CREATE_TODO, DELETE_TODO } from '../actionTypes'

export const todoAction = {
    create: (title) => {
        return { type:CREATE_TODO, payload:title }
    },
    delete: (id) => {
        return { type:DELETE_TODO, payload:id }
    },
}