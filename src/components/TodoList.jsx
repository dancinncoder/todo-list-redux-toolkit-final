import React from "react";

function TodoList({ todos, setTodos, isDone }) {
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
              <button
                onClick={function () {
                  const newTodos = todos.filter(
                    (filteredTodo) => filteredTodo.id !== todo.id
                  );

                  setTodos(newTodos);
                }}
              >
                삭제
              </button>
              <button
                onClick={function () {
                  // 새로운 배열 생성
                  const newTodos = todos.map(function (item) {
                    if (item.id === todo.id) {
                      return { ...item, isDone: !item.isDone };
                    } else {
                      return item;
                    }
                  });

                  // setTodos
                  setTodos(newTodos);
                }}
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
