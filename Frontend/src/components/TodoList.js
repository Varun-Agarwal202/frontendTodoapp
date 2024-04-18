import React from "react";

const TodoList = ({todos, deleteToDo}) => {
  return (
      <>
  {todos?.length > 0 ? (
      <ul className='todolist'>
        {todos.map((todo, index) => (
          <div className="todo">
            <li key = {index}> {todo.task} </li>
            <button className='delete-button' onClick={() => {deleteToDo(todo.id)}}>Delete</button>
            <br />
          </div>
        ))}
      </ul>
      ) : (
        <div className='empty'>
          <p>No Task Found</p>
          </div>
      )}
      
      </>
  );
        };
  export default TodoList; 