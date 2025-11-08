import { statusToColumnMap } from "@/constants";
import type {
  Project,
  ProjectType,
  Task,
  TaskPriorityType,
  TaskStatusType,
} from "@/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";



export function CreateProjectReducer(
  state: Project[],
  action: PayloadAction<{
    name: string;
    description?: string;
    type: ProjectType;
  }>
) {
  const createdAt = new Date().toISOString();
  const newProject: Project = {
    id: uuid(),
    name: action.payload.name,
    description: action.payload.description,
    type: action.payload.type,
    columns: {
      todo: { name: "To Do", tasks: [] },
      inProgress: {
        name: "In Progress",
        tasks: [],
      },
      done: { name: "Done", tasks: [] },
    },
    createdAt: createdAt,
    updatedAt: createdAt,
  };
  state.push(newProject);
}

export function updateProjectReducer(
  state: Project[],
  action: PayloadAction<{
    id: string;
    name?: string;
    description?: string;
    type: ProjectType;
  }>
) {
  const project = state.find((p) => p.id === action.payload.id);
  if (project) {
    let changed = false;
    if (action.payload.name && action.payload.name !== project.name) {
      project.name = action.payload.name;
      changed = true;
    }

    if (action.payload.type && action.payload.type !== project.type) {
      project.type = action.payload.type;
      changed = true;
    }

    if (action.payload.description !== project.description) {
      project.description = action.payload.description;
      changed = true;
    }

    if (changed) {
      project.updatedAt = new Date().toISOString();
    }
  }
}


export function deleteProjectReducer(
  state: Project[],
  action: PayloadAction<{ id: string }>
) {
  const index = state.findIndex((p) => p.id === action.payload.id);
  if (index !== -1) {
    state.splice(index, 1);
  }
}

export function addTaskReducer(
  state: Project[],
  action: PayloadAction<{
    id?:string,
    projectId: string;
    title: string;
    description?: string;
    columnId: string;
    priority: TaskPriorityType;
  }>
) {
  const project = state.find((p) => p.id === action.payload.projectId);

  if (project) {
    const createdAt = new Date().toISOString();

    const newTask: Task = {
      id: !action.payload.id ? uuid() : action.payload.id,
      projectId: action.payload.projectId,
      title: action.payload.title,
      description: action.payload.description,
      priority: action.payload.priority,
      status: project.columns[action.payload.columnId].name as TaskStatusType,
      createdAt: createdAt,
      updatedAt: createdAt,
    };
    project.columns[action.payload.columnId].tasks.push(newTask);
    project.updatedAt = new Date().toISOString();
  }
}

export function updateTaskReducer(
  state: Project[],
  action: PayloadAction<{
    projectId: string;
    columnId: string;
    id: string;
    title?: string;
    description?: string;
    priority?: TaskPriorityType;
    status?: TaskStatusType;
    targetIndex?: number;
  }>
) {
  const project = state.find((p) => p.id === action.payload.projectId);

  if (!project) return;

  const currentColumn = project.columns[action.payload.columnId];

  if (!currentColumn) {
    console.log(`${currentColumn} does not exist`);
    return;
  }

  const taskIndex = currentColumn.tasks.findIndex(
    (task) => task.id === action.payload.id
  );

  const existingTask = currentColumn.tasks[taskIndex];

  let changed = false;

  if (action.payload.title && existingTask.title !== action.payload.title) {
    existingTask.title = action.payload.title;
    changed = true;
  }
  if (
    action.payload.description &&
    existingTask.description !== action.payload.description
  ) {
    existingTask.description = action.payload.description;
    changed = true;
  }
  if (
    action.payload.priority &&
    existingTask.priority !== action.payload.priority
  ) {
    existingTask.priority = action.payload.priority;
    changed = true;
  }
  if (action.payload.title && existingTask.title !== action.payload.title) {
    existingTask.title = action.payload.title;
    changed = true;
  }
  let newColumnId = action.payload.columnId;
  if (
    (action.payload.status && action.payload.targetIndex !== null)
  ) {
    const newStatus = action.payload.status;
    newColumnId = statusToColumnMap[newStatus!];
    if (!project.columns[newColumnId]) {
      console.log(`No colum named ${newColumnId} in the current Project`);
      return;
    }

    existingTask.status = newStatus;
    changed = true;

    currentColumn.tasks.splice(taskIndex, 1);

    project.columns[newColumnId].tasks.splice(
      action.payload.targetIndex!,
      0,
      existingTask
    );
  }

  if (changed) {
    existingTask.updatedAt = new Date().toISOString();
    project.updatedAt = new Date().toISOString();
  }
}

export function deleteTaskReducer(
  state: Project[],
  action: PayloadAction<{ projectId: string; columnId: string; id: string }>
) {
  const project = state.find((p) => p.id === action.payload.projectId);

  if (!project) return;

  const taskColumn = project.columns[action.payload.columnId];

  if (!taskColumn) {
    console.log(`${taskColumn} column does not exist`);
    return;
  }

  const taskIndex = taskColumn.tasks.findIndex(
    (task) => task.id === action.payload.id
  );

  if (taskIndex == -1) {
    console.log("The task does not exist");
    return;
  }

  taskColumn.tasks.splice(taskIndex, 1);
  project.updatedAt = new Date().toISOString();
}
