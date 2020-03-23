import { createSlice } from "@reduxjs/toolkit";

export enum VisibilityFilterType {
  "All",
  "Completed",
  "Active",
}

type VisibilityFilterState = VisibilityFilterType;

const visibilityFilterSlice = createSlice({
  name: "visibilityFilter",
  initialState: VisibilityFilterType.All as VisibilityFilterState,
  reducers: {
    all: () => VisibilityFilterType.All,
    completed: () => VisibilityFilterType.Completed,
    active: () => VisibilityFilterType.Active,
  },
});

export const {
  all: setVisibilityFilterAll,
  completed: setVisibilityFilterCompleted,
  active: setVisibilityFilterActive,
} = visibilityFilterSlice.actions;

export default visibilityFilterSlice.reducer;
