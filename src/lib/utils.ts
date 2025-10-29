import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { RootState } from "./Store/Store";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function returnIcons(projectType:string) {
  if (projectType === "Software Development") {
    return {
      name: "Code",
      icon: "https://cdn-icons-png.flaticon.com/128/3573/3573187.png",
    };
  } if (projectType === "IT Support") {
    return {
      name: "Computer",
      icon: "https://cdn-icons-png.flaticon.com/128/482/482466.png",
    };
  }
  if (projectType === "Marketing") {
     return {
       name: "Marketing",
       icon: "https://cdn-icons-png.flaticon.com/128/1077/1077221.png",
     };
  } if (projectType === "Product Management") {
    return {
      name: "Product Management",
      icon: "https://cdn-icons-png.flaticon.com/128/12474/12474335.png",
    };
  } if (projectType === "Design") {
    return {
      name: "Design",
      icon: "https://cdn-icons-png.flaticon.com/128/3159/3159310.png",
    };
  } if (projectType === "Human Resource") {
    return {
      name: "Human Resource",
      icon: "https://cdn-icons-png.flaticon.com/128/7570/7570373.png",
    };
  } if (projectType === "Customer Service") {
    return {
      name: "Customer Service",
      icon: "https://cdn-icons-png.flaticon.com/128/1067/1067566.png",
    };
  } if (projectType === "Finance") {
    return {
      name: "Finance",
      icon: "https://cdn-icons-png.flaticon.com/128/1077/1077976.png",
    };
  } if (projectType === "Sales") {
    return {
      name: "Sales",
      icon: "https://cdn-icons-png.flaticon.com/128/1389/1389079.png",
    };
  } if (projectType === "Legal") {
    return {
      name: "Legal",
      icon: "https://cdn-icons-png.flaticon.com/128/994/994414.png",
    };
  } if (projectType === "Data Science") {
    return {
      name: "Data Science",
      icon: "https://cdn-icons-png.flaticon.com/128/1449/1449158.png",
    };
  } else {
    return {
      name: "Unknown",
      icon: "https://cdn-icons-png.flaticon.com/128/17120/17120147.png",
    };
  }
}

export const selectProjectById = (id: string) => (state: RootState) =>
  state.kanban.find((project) => project.id === id) || null;
