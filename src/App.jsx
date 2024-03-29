import { useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import TodoList from "./components/TodoList";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "./redux/modules/todosSlice";

function App() {
  // const initialState = [
  //   {
  //     id: uuid(),
  //     title: "테스트 제목 1",
  //     contents: "테스트 내용 1",
  //     isDone: false,
  //   },
  //   {
  //     id: uuid(),
  //     title: "테스트 제목 2",
  //     contents: "테스트 내용 2",
  //     isDone: true,
  //   },
  //   {
  //     id: uuid(),
  //     title: "테스트 제목 3",
  //     contents: "테스트 내용 3",
  //     isDone: false,
  //   },
  // ];

  // const [todos, setTodos] = useState(initialState);
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const todos = useSelector((state) => state.todos); //store의 상태(state)
  // console.log('state', state);
  // console.log('todos', state.todos);
  const dispatch = useDispatch();

  const addTodoHandler = (event) => {
    event.preventDefault();
    const newTodo = {
      id: uuid(),
      title,
      contents,
      isDone: false,
    };
    // setTodos([...todos, newTodo]);
    dispatch(addTodo(newTodo));
    setTitle("");
    setContents("");
  }

  const typeTitleHandler = (event) => {
    setTitle(event.target.value);
  }

  const typeContentsHandler = (event) => {
    setContents(event.target.value);
  }

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
            <form onSubmit={addTodoHandler}>
              <input
                type="text"
                placeholder="제목입력!"
                value={title}
                onChange={(event)=>typeTitleHandler(event)}
              />
              <input
                type="text"
                placeholder="내용입력!"
                value={contents}
                onChange={(event)=>typeContentsHandler(event)}
              />
              <button type="submit">제출</button>
            </form>
          </div>
        </div>
        <TodoList isDone={false} />
        <TodoList isDone={true} />
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
