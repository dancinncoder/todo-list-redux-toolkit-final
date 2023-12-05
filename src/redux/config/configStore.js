// 1. store 만들기
// 2. export
// 3. reducer import

import { configureStore } from "@reduxjs/toolkit";
import todos from "../modules/todosSlice"; // todos라는 이름으로 리듀서가 store안에 들어간다.

const store = configureStore({
  reducer: {
    todos: todos,
  },
});

export default store;
