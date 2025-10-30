import { configureStore } from "@reduxjs/toolkit";
import KanbanReducer from "../Slice/kanbanSlice"
import ActiveProjectReducer from "../Slice/ActiveProjectSlice"

export const store = configureStore({
  reducer: {
    kanban: KanbanReducer,
    active: ActiveProjectReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
