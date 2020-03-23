import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SelectedTodoIdState = string | null;

interface SelectPayload {
  id: string;
}

const selectedTodoIdSlice = createSlice({
  name: "selectedTodoId",
  initialState: null as SelectedTodoIdState,
  reducers: {
    select: (state, action: PayloadAction<SelectPayload>) => action.payload.id,
    deselect: () => null,
  },
});

export const {
  deselect: deselectTodoId,
  select: selectTodoId,
} = selectedTodoIdSlice.actions;

export default selectedTodoIdSlice.reducer;
