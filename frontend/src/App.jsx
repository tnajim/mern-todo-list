import { useState, useEffect } from 'react';
import './App.css'

const API_BASE = "http://localhost:3000";

function App() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    GetTodos();
  }, [])

  const GetTodos = () => {
    fetch(API_BASE + "/todos")
      .then(res => res.json())
      .then(data => {
        setTodos(data)
        console.log(data);
      })
      .catch(err => console.error("Error: ", err))
  }

  const completeTodo = async id => {
    const data = await fetch(API_BASE + "/todos/complete/" + id)
      .then(res => res.json());

    setTodos(todos => todos.map(todo => {
      if (todo._id === data._id) {
        todo.completed = data.completed;
      }
      return todo;
    }))
  }

  const deleteTodo = async id => {
    // delete todo from the api db
    const data = await fetch(API_BASE + "/todos/delete/" + id, { method: "DELETE" })
      .then(res => res.json());

    // delete todo from the frontend
    setTodos(todos => todos.filter(todo => todo._id !== data._id));
  }

  return (
    <>
      <div className="main-div">
        <h1>Welcome, User</h1>
        <h4>Your Tasks</h4>
        <div className="todos">
          {todos.map(todo => (
            <div className={`todo ${todo.completed ? "is-complete" : ""}`} key={todo._id} onClick={() => completeTodo(todo._id)}>
              <div className="checkbox"></div>
              <div className="text">{todo.text}</div>
              <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
