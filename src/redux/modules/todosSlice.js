// 1. initalState
// 2. todoSlice 만들기
// 3. todoSlice의 액션을 export : component 로직에 보내기
// 4. todoSlice의 리듀서를 export : store로 보내기

import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

const initalState = [
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
const todosSlice = createSlice({
  name: "todos",
  initialState: initalState,
  reducers: {
    addTodo: (state, action) => {
      // action.payload는 setBlabla 안에 들어가는 아이들
      const newTodo = action.payload;
      return [...state, newTodo];
      // state는 원래 initialState 배열값
    },
    deleteTodo: (state, action) => {
      const id = action.payload;
      const remainedTodo = state.filter((state) => state.id !== id);
      return [...remainedTodo];
    },
    switchTodo: (state, action) => {
      const id = action.payload;
      const updatedTodo = state.map(function (state) {
        if (state.id === id) {
          return { ...state, isDone: !state.isDone };
        } else {
          return state;
        }
      });
      return [...updatedTodo];
    },
  },
});

export const { addTodo, deleteTodo, switchTodo } = todosSlice.actions;
export default todosSlice.reducer;
