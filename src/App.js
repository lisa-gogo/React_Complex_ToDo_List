import "./styles.css";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [input, setInput] = useState("");
  const [isSearchTodo, setIsSearchTodo] = useState(false);
  const [todos, setTodos] = useState([]);
  const [seachInputFinal, setSearchInput] = useState("");
  const [all, setAll] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSearch = () => {
    if (todos.length > 0) {
      setIsSearchTodo(true);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setTodos([
        ...todos,
        {
          order: 1,
          key: uuidv4(),
          name: input,
          edit: false,
          show: true,
          processed: false
        }
      ]);
      handleSearch();
      setInput("");
      setIsSearchTodo(true);
    }
  };

  const handleDelete = (key) => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].key === key) {
        todos.splice(i, 1);
      }
    }
    setTodos([...todos]);

    if (todos.length === 0) {
      setIsSearchTodo(false);
    }
  };

  const recordDone = (key) => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].key === key) {
        todos[i].processed = true;
        console.log(todos[i]);
      }
    }
    setTodos([...todos]);
  };
  /// all button
  const allRed = {
    color: "red"
  };
  const allBlack = {
    color: "black"
  };
  //
  const processRed = {
    color: "red"
  };

  const processBlack = {
    color: "black"
  };
  /// done color
  const doneRed = {
    color: "red"
  };

  const doneBlack = {
    color: "black"
  };

  const handleDone = () => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].processed === false) {
        todos[i].show = false;
      }
    }
    setTodos([...todos]);
    setIsProcessing(false);
    setAll(false);
    setIsDone(true);
  };

  const handleProcess = () => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].processed === false) {
        todos[i].show = true;
      } else if (todos[i].processed === true) todos[i].show = false;
    }
    setIsProcessing(true);
    setAll(false);
    setIsDone(false);
    setTodos([...todos]);
  };

  const handleAll = () => {
    for (let i = 0; i < todos.length; i++) {
      todos[i].show = true;
    }
    setAll([...todos]);
    setIsProcessing(false);
    setIsDone(false);
    setAll(true);
  };

  const handleNumberAll = (key, number) => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].key === key) {
        todos[i].order = number;
        console.log(todos[i]);
      }
    }
    setTodos([...todos]);
    console.log(todos);

    for (let j = 0; j < todos.length - 1; j++) {
      //  console.log(todos)
      if (todos[j].order > todos[j + 1].order) {
        const todo = todos[j];
        todos.splice(j, 1);
        todos.splice(j + 1, 0, todo);
      }
    }
    setTodos([...todos]);
  };
  /// search input
  const searchInput = (e) => {
    // console.log(e.target.value)
    setSearchInput(e.target.value);
  };

  const handleSearchInput = (e) => {
    console.log(seachInputFinal);
    if (e.key === "Enter") {
      for (let i = 0; i < todos.length; i++) {
        if (todos[i].name === seachInputFinal) {
          todos[i].show = true;
          console.log(todos[i].show);
        } else {
          todos[i].show = false;
        }
      }
      setTodos([...todos]);
    }
  };
  // edit
  const handleEditAll = (key) => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].key === key) {
        todos[i].edit = true;
      }
    }
    setTodos([...todos]);
  };
  //edit save
  const handleEditSaveAll = (key, name) => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].key === key) {
        todos[i].name = name;
        todos[i].edit = false;
      }
    }
    setTodos([...todos]);
  };

  //edit cancel
  const handleEditCancel = (key) => {
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].key === key) {
        todos[i].edit = false;
      }
    }
    setTodos([...todos]);
  };

  //// return ALL
  return (
    <div>
      {isSearchTodo ? (
        <input
          onKeyPress={handleSearchInput}
          onChange={searchInput}
          placeholder="Search the to do list"
        ></input>
      ) : (
        <div></div>
      )}
      {todos.map((todo) => {
        return (
          <Todo
            recordDone={recordDone}
            todo={todo}
            handleDelete={handleDelete}
            handleNumberAll={handleNumberAll}
            handleEditAll={handleEditAll}
            handleEditSaveAll={handleEditSaveAll}
            handleEditCancel={handleEditCancel}
          />
        );
      })}

      <h1>{isSearchTodo ? <div></div> : <div>No to do here</div>}</h1>
      {isSearchTodo ? (
        <div id="processing">
          <div onClick={handleAll} style={all ? allRed : allBlack}>
            All
          </div>
          <div
            onClick={handleProcess}
            style={isProcessing ? processRed : processBlack}
          >
            Processing
          </div>
          <div onClick={handleDone} style={isDone ? doneRed : doneBlack}>
            Done
          </div>
        </div>
      ) : (
        <div></div>
      )}

      <input
        value={input}
        onKeyPress={handleEnter}
        onChange={handleInput}
        placeholder="Come on!!!"
      ></input>
    </div>
  );
}

/// todo component
const Todo = ({
  todo,
  handleEditAll,
  handleDelete,
  recordDone,
  handleNumberAll,
  handleEditSaveAll,
  handleEditCancel
}) => {
  const [eachNumber, setEachNumber] = useState(1);
  const [isStrike, setIsStrike] = useState(false);
  const [editInput, setEditInput] = useState("");

  const handleNumber = (e) => {
    setEachNumber(e.target.value);
  };

  const handleStrikeThrough = () => {
    setIsStrike(true);
    recordDone(todo.key);
  };

  const strikeThrough = {
    textDecoration: "line-through"
  };

  const noneStrike = {
    textDecoration: "none"
  };

  // document.getElementById("go").style.borderColor;

  const unclick = {
    pointerEvents: "none",
    backgroundColor: "#F8F8FF",
    color: "#DCDCDC",
    borderColor: "#DCDCDC"
  };

  const clickAble = {
    pointerEvents: "auto"
  };

  const handleDeleteEach = (e) => {
    const key = e.target.id;
    handleDelete(key);
  };

  const handleNumberEach = (e) => {
    if (e.key === "Enter") {
      handleNumberAll(todo.key, eachNumber);
      //  console.log(eachNumber)
      //  console.log(todo.key)
    }
  };

  // edit Each
  const handleEditEach = () => {
    handleEditAll(todo.key);
  };

  // edit change
  const editContent = (e) => {
    setEditInput(e.target.value);
  };
  // edit save
  const handleEditSave = () => {
    handleEditSaveAll(todo.key, editInput);
    console.log(editInput);
  };
  /// return

  const editCancel = () => {
    handleEditCancel(todo.key);
    setEditInput("");
  };

  return (
    <>
      {todo.show ? (
        <div>
          <li className="todo">
            <input
              Value={todo.order}
              type="number"
              onChange={handleNumber}
              onKeyPress={handleNumberEach}
            ></input>
            {todo.edit ? (
              <>
                <input onChange={editContent} defaultValue={todo.name}></input>
                <button onClick={editCancel}>cancel</button>
                <button onClick={handleEditSave}>save</button>
              </>
            ) : (
              <>
                <div
                  onClick={handleStrikeThrough}
                  style={isStrike ? strikeThrough : noneStrike}
                >
                  {todo.name}
                </div>
                <button
                  onClick={handleEditEach}
                  style={isStrike ? unclick : clickAble}
                >
                  Edit
                </button>
                <button id={todo.key} onClick={handleDeleteEach}>
                  Delete
                </button>
              </>
            )}
          </li>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};
