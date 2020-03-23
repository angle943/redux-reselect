import { configureStore } from "@reduxjs/toolkit";

import todos from "./todos";
import selectedTodoId from "./selectedTodoId";
import visibilityFilter from "./visibilityFilter";

const store = configureStore({
  reducer: {
    todos,
    selectedTodoId,
    visibilityFilter,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
