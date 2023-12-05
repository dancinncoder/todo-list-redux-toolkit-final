import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo, switchTodo } from "../redux/modules/todosSlice";

function TodoList({isDone }) {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const deleteTodoHandler = (todo) => {
    dispatch(deleteTodo(todo.id));
  }

  const switchTodoHandler = (todo) => {
    // setTodos
    dispatch(switchTodo(todo.id, isDone));
  }

  return (
    <div>
      <h2>{isDone ? "DONELIST" : "TODOLIST"}</h2>
      {todos
        .filter(function (t) {
          return t.isDone === isDone;
        })
        .map(function (todo) {
          return (
            <div
              style={{
                border: "1px solid black",
                padding: "10px",
                margin: "10px",
              }}
              key={todo.id}
            >
              <p>{todo.id}</p>
              <p>{todo.title}</p>
              <p>{todo.contents}</p>
              <p>{todo.isDone.toString()}</p>
              <button onClick={()=> deleteTodoHandler(todo)}>
                삭제
              </button>
              <button
                onClick={()=> switchTodoHandler(todo)}
              >
                {isDone ? "취소" : "완료"}
              </button>
            </div>
          );
        })}
    </div>
  );
}

export default TodoList;
