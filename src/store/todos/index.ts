import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v1 as uuid } from "uuid";

import TodoCategory from "store/TodoCategory";
import todosInitialState from "./initialState";

export interface TodoState {
  id: string;
  desc: string;
  category: TodoCategory;
  isComplete: boolean;
}

type CreatePreparePayload = Pick<TodoState, "desc" | "category">;
type CreatePayload = TodoState;
type EditPayload = Pick<TodoState, "id"> &
  Partial<Pick<TodoState, "desc" | "category">>;
type TogglePayload = Pick<TodoState, "id">;
type RemovePayload = Pick<TodoState, "id">;

const todosSlice = createSlice({
  name: "todos",
  initialState: todosInitialState,
  reducers: {
    create: {
      reducer: (state, action: PayloadAction<CreatePayload>) => {
        state.push(action.payload);
      },
      prepare: (payload: CreatePreparePayload) => ({
        payload: {
          id: uuid(),
          desc: payload.desc,
          category: payload.category,
          isComplete: false,
        },
      }),
    },
    edit: (state, action: PayloadAction<EditPayload>) => {
      const { payload } = action;
      const todo = state.find((todo) => todo.id === payload.id);
      if (todo) {
        if (payload.desc) todo.desc = payload.desc;
        if (payload.category) todo.category = payload.category;
      }
    },
    toggle: (state, action: PayloadAction<TogglePayload>) => {
      const { payload } = action;
      const todo = state.find((todo) => todo.id === payload.id);
      if (todo) {
        todo.isComplete = !todo.isComplete;
      }
    },
    remove: (state, action: PayloadAction<RemovePayload>) => {
      const { payload } = action;
      const todoIndex = state.findIndex((todo) => todo.id === payload.id);
      if (todoIndex !== -1) {
        state.splice(todoIndex, 1);
      }
    },
  },
});

export const {
  create: createTodo,
  edit: editTodo,
  toggle: toggleTodo,
  remove: removeTodo,
} = todosSlice.actions;

export default todosSlice.reducer;
