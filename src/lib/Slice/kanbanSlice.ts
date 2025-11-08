import type { Project, ProjectType, TaskPriorityType, TaskStatusType } from "@/types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  addTaskReducer,
  CreateProjectReducer,
  deleteProjectReducer,
  deleteTaskReducer,
  updateProjectReducer,
  updateTaskReducer,
} from "../Reducer/kanbanReducer";

const loadState = (): Project[] => {
  try {
    const serializedState = localStorage.getItem("kanban");
    return serializedState
      ? JSON.parse(serializedState)
      : [
          {
            id: "",
            name: "",
            description: "",
            type: "Software Development",
            columns: {
              "To Do": { name: "To Do", tasks: [] },
              "In Progress": { name: "In Progress", tasks: [] },
              Done: { name: "Done", tasks: [] },
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        ];
  } catch {
    return [
      {
        id: "",
        name: "",
        description: "",
        type: "Software Development",
        columns: {
          "To Do": { name: "To Do", tasks: [] },
          "In Progress": { name: "In Progress", tasks: [] },
          Done: { name: "Done", tasks: [] },
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }
};

const initialState: Project[] = loadState();

export const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    createProject: (
      state,
      action: PayloadAction<{
        name: string;
        description?: string;
        type: ProjectType;
      }>
    ) => CreateProjectReducer(state, action),
    updateProject: (
      state,
      action: PayloadAction<{
        id: string;
        name?: string;
        description?: string;
        type: ProjectType;
      }>
    ) => updateProjectReducer(state, action),
    deleteProject: (state, action: PayloadAction<{ id: string }>) =>
      deleteProjectReducer(state, action),

    //Task Reducers
    addTask: (state, action: PayloadAction<{ id?:string, projectId: string; title: string; description?: string; priority: TaskPriorityType; columnId:string }>) => addTaskReducer(state, action),
    
    updateTask: (state, action: PayloadAction<{ projectId: string, targetIndex?:number, columnId: string, id: string, title: string, description?: string, priority?: TaskPriorityType, status?: TaskStatusType, createdAt?: string }>) => updateTaskReducer(state, action),
    
    deleteTask: (state, action: PayloadAction<{ projectId: string, columnId: string; id:string}>)=> deleteTaskReducer(state,action)
  },
});


const originalReducer = kanbanSlice.reducer;
kanbanSlice.reducer = (state, action) => {
  const newState = originalReducer(state, action);
  localStorage.setItem("kanban", JSON.stringify(newState));
  return newState;
};

export const { createProject, updateProject, deleteProject, addTask,deleteTask,updateTask } =
  kanbanSlice.actions;
export default kanbanSlice.reducer; 