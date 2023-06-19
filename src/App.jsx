import { useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import TodoList from "./components/TodoList";

function App() {
  const initialState = [
    {
      id: uuid(),
      title: "테스트 제목 1",
      contents: "테스트 내용 1",
      isDone: false,
    },
    {
      id: uuid(),
      title: "테스트 제목 2",
      contents: "테스트 내용 2",
      isDone: true,
    },
    {
      id: uuid(),
      title: "테스트 제목 3",
      contents: "테스트 내용 3",
      isDone: false,
    },
  ];

  const [todos, setTodos] = useState(initialState);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");

  return (
    <>
      <header
        style={{
          backgroundColor: "#f5dfa2",
          padding: "10px",
        }}
      >
        헤더입니다.
      </header>
      <main
        style={{
          backgroundColor: "#c3f7c9",
          padding: "10px",
        }}
      >
        <div>
          <h3>INPUT 영역</h3>
          <div>
            <form
              onSubmit={function (event) {
                event.preventDefault();

                // TODO: 넣을 객체 생성(new todo)
                const newTodo = {
                  id: uuid(),
                  title,
                  contents,
                  isDone: false,
                };

                // TODO: todos state에 넣어줘야 해!!
                setTodos([...todos, newTodo]);
              }}
            >
              <input
                type="text"
                placeholder="제목입력!"
                value={title}
                onChange={function (event) {
                  setTitle(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="내용입력!"
                value={contents}
                onChange={function (event) {
                  setContents(event.target.value);
                }}
              />
              <button type="submit">제출</button>
            </form>
          </div>
        </div>
        <TodoList todos={todos} setTodos={setTodos} isDone={false} />
        <TodoList todos={todos} setTodos={setTodos} isDone={true} />
      </main>
      <footer
        style={{
          backgroundColor: "#c3ddf7",
          padding: "10px",
        }}
      >
        푸터입니다.
      </footer>
    </>
  );
}

export default App;
