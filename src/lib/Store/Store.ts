import { configureStore } from "@reduxjs/toolkit";
import KanbanReducer from "../Slice/kanbanSlice"

export const store = configureStore({
  reducer: {
  kanban: KanbanReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
