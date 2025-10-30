import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const loadState = (): {id:string| null} => {
  try {
    const serializedState = localStorage.getItem("active");
    return serializedState
      ? JSON.parse(serializedState)
      : { id: null };
  } catch {
    return { id: null };
  }
};

const initialState: { id: string | null } = loadState();

export const ActiveProjectSlice = createSlice({
    name: "active",
    initialState,
    reducers: {
        setActiveProjectId: (state, action: PayloadAction<{ id: string | null }>) => {
            if (state.id !== action.payload.id) { 
                state.id = action.payload.id
            }
        }
    }
});

export const Reducer = ActiveProjectSlice.reducer;
ActiveProjectSlice.reducer = (state, action) => {
  const newState = Reducer(state, action);
  localStorage.setItem("active", JSON.stringify(newState));
  return newState;
};

export const { setActiveProjectId } = ActiveProjectSlice.actions;
export default ActiveProjectSlice.reducer;