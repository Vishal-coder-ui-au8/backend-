import React from 'react';
import { connect } from 'react-redux';
import '../App.css';
import TodoList from '../component/todoList';
import { todoAction } from '../redux/action';

class Todo extends React.Component {
  state = {
    title: ''
  }

  inputHandler = (e) => {
    this.setState({
      title: e.target.value
    });
  }

  submitForm = (e) => {
    e.preventDefault();
    this.props.createTodo(this.state.title);
    this.setState({title:''});
  }

  render() {
    const {  title } = this.state;
    return (
      <div className="App">
        <div>
          <h1>Todo App: click on todo-list task to delete</h1>
        </div>
        <div>
          <form onSubmit={this.submitForm}>
            <input type="text" name="title" value={title} onChange={this.inputHandler} />
            <button type="submit" disabled={!title}>Add</button>
          </form>
        </div>
        <TodoList />
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createTodo : (title) => dispatch(todoAction.create(title)),
  }
}
const initRedux = connect(null,mapDispatchToProps);
const TodoWrapped = initRedux(Todo);

export default TodoWrapped;
