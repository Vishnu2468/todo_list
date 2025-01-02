import React, { useState } from "react";
import './Todo.css'; // Assuming you are using a separate CSS file

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [deletedTodos, setDeletedTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [inputText, setInputText] = useState("");

  const addTodo = () => {
    if (inputText) {
      setTodos([...todos, { text: inputText, checked: false }]);
      setInputText("");
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const toggleCheck = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].checked = !updatedTodos[index].checked;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const todoToDelete = todos[index];
    setDeletedTodos([...deletedTodos, todoToDelete]);
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const showChecked = () => {
    setFilteredTodos(todos.filter(todo => todo.checked));
  };

  const showUnchecked = () => {
    setFilteredTodos(todos.filter(todo => !todo.checked));
  };

  const showDeleted = () => {
    setFilteredTodos(deletedTodos);
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <input
        type="text"
        id="todoInput"
        placeholder="Add a new todo"
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={addTodo}>Add</button>

      {/* Display Todos Heading */}
      <h2>Todos</h2>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={todo.checked}
              onChange={() => toggleCheck(index)}
            />
            {todo.text}
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>

      <div className="actions">
        <h2>Actions</h2>
        <button onClick={showChecked}>Show Checked Items</button>
        <button onClick={showUnchecked}>Show Unchecked Items</button>
        <button onClick={showDeleted}>Show Deleted Items</button>
      </div>

      <div className="filtered-list">
        <h2>Filtered List</h2>
        <ul>
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo, index) => <li key={index}>{todo.text}</li>)
          ) : (
            <li>No items to display</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
