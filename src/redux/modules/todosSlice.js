// 1. initalState
// 2. todoSlice 만들기
// 3. todoSlice의 액션을 export : component 로직에 보내기
// 4. todoSlice의 리듀서를 export : store로 보내기

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import uuid from "react-uuid";

const initalState = {
  todos: [
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
  ],
  isLoading: false,
  isError: null,
};

export const __addTodo = createAsyncThunk(
  "addTodo",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_DV_SERVER_URL}todos`
      );
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
const todosSlice = createSlice({
  name: "todos",
  initialState: initalState.todos,
  reducers: {
    // addTodo: (state, action) => {
    //   // action.payload는 setBlabla 안에 들어가는 아이들
    //   const newTodo = action.payload;
    //   return [...state, newTodo];
    //   // state는 원래 initialState 배열값
    // },
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

  //   extraReducers: {
  //     [__addTodo.pending]: (state) => {
  //       state.isLoading = true;
  //       state.isError = null;
  //     },
  //     [__addTodo.fulfilled]: (state, action) => {
  //       state.isLoading = false;
  //       state.isError = null;
  //       state.todos = [...state.todos, action.payload];
  //     },
  //     [__addTodo.rejected]: (state, action) => {
  //       state.isLoading = false;
  //       state.isError = true;
  //       state.error = action.payload;
  //     },
  //   },
  // });
  extraReducers: (builder) => {
    builder
      .addCase(__addTodo.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(__addTodo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = null;
        state.todos.push(action.payload);
      })
      .addCase(__addTodo.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      });
  },
});

export const { addTodo, deleteTodo, switchTodo } = todosSlice.actions;
export default todosSlice.reducer;
