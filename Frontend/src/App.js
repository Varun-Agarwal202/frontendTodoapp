import './App.css';
import { useState, useEffect } from "react";
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import React from "react";
function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8081/users')
    .then(response => response.json())
    .then(data => setData(data))
    .then(err => console.log(err));

  }, [todos]);
    console.log(data)
  const addToDo = () => {
    if (todo !== "") {
      // Make a POST request to add the todo to the database
      fetch('http://localhost:8081/addTodo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task: todo }),
      })
      .then(response => response.json())
      .then(data => {
        // Update the local state with the new todo retrieved from the database
        setTodos([...todos, data]);
        setTodo("");
      })
      .catch(err => console.log(err));
    }
  }
  const deleteToDo = (todoId) => {
    // Make a DELETE request to delete the todo from the database
    fetch(`http://localhost:8081/deleteTodo/${todoId}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(() => {
      // Filter out the deleted todo from the local state
      const newTodos = todos.filter(todo => todo.id !== todoId);
      setTodos(newTodos);
    })
    .catch(err => console.log(err));
  };


  return (
    <div className="App">
      <h1>React To Do App</h1>
      <TodoInput todo={todo} setTodo={setTodo} addTodo={addToDo} />
      <TodoList todos={data} deleteToDo={deleteToDo} />
    </div>
  );
}

export default App;
