import React from 'react';
import { connect } from 'react-redux';
import { todoAction } from '../redux/action';

const TodoList = (props) => {
    const { todos, dispatch } = props;

    const deleteTodo = (id) => {
        dispatch(todoAction.delete(id))
    }
    return (
        <div>
            <ul>
                {
                    todos.map((todo,idx)=>{
                        return (
                            <li onClick={() => deleteTodo(todo.id)} key={idx}>
                                {todo.title}
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      todos : state.todos,
    }
}

export default connect(mapStateToProps)(TodoList);