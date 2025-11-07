import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RootState } from "@/lib/Store/Store";
import { returnIcons, selectProjectById } from "@/lib/utils";

import { useDispatch, useSelector } from "react-redux";
import { setActiveProjectId } from "@/lib/Slice/ActiveProjectSlice";
import { useEffect, useMemo, useState } from "react";

import ProjectsDropdown from "./ProjectsDropdown";
import TaskStatusChart from "./TaskStatusChart";

const ActiveProject = () => {
  const projects = useSelector((state: RootState) => state.kanban);
  const activeId = useSelector((state: RootState) => state.active.id);
  const project = useSelector(selectProjectById(activeId!));
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const states = ["Total", "In Progress", "Waiting", "Completed"];

  const OverallTasksStates = (state: string) => {
    
    switch (state) {
      case "Total": {
        const columns = ["todo", "inProgress", "done"];
        let total = 0;
        for (const col of columns) {
          for (const proj of projects) {
            total += proj.columns[col].tasks.length;
          }
        }
        return total;
      }

      case "In Progress": {
        let inProgress = 0;
        for (const proj of projects) {
          inProgress += proj.columns["inProgress"].tasks.length;
        }
        return inProgress;
      }

      case "Waiting": {
        let todo = 0;
        for (const proj of projects) {
          todo += proj.columns["todo"].tasks.length;
        }
        return todo;
      }

      case "Completed": {
        let done = 0;
        for (const proj of projects) {
          done += proj.columns["done"].tasks.length;
        }
        return done;
      }

      default:
        return 0;
    }
  };

  const completionPercentage = useMemo(() => {
    if (!project) return null;

    const totalTasks =
      project.columns["todo"].tasks.length +
      project.columns["inProgress"].tasks.length +
      project.columns["done"].tasks.length;

    if (totalTasks === 0) return 0;

    return Math.round(
      (project.columns["done"].tasks.length / totalTasks) * 100
    );
  }, [project]);

  useEffect(() => {
    if (projects.length === 1) {
      dispatch(setActiveProjectId({ id: projects[0].id }));
    }
  }, [dispatch, projects]);

  return (
    <>
      <div className=" flex flex-col justify-between w-full items-center h-full">
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger
            className="w-full p-3 outline-0 cursor-pointer"
            disabled={!projects.length}
          >
            <div className="h-16 bg-muted dark:bg-white/10 rounded-lg flex items-center justify-between">
              <div className="flex flex-col items-start px-3 mt-2">
                <span className="text-gray-400 text-[13px]">PROJECT</span>
                <span className="dark:text-gray-300 text-lg line-clamp-1">
                  {project ? project.name : "No Projects yet.."}
                </span>
              </div>
              {project && (
                <div className="bg-primary size-10 flex justify-center items-center rounded-full mr-3">
                  <img
                    loading="lazy"
                    src={returnIcons(project.type!).icon}
                    alt={returnIcons(project.type!).name}
                    className="size-5"
                  />
                </div>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <ProjectsDropdown showActiveStatus={true} setOpen={setOpen} />
          </DropdownMenuContent>
        </DropdownMenu>

        <TaskStatusChart progress={completionPercentage} />

        <div className="flex flex-col gap-2 w-full p-4">
          <span className="font-bold text-xl">Tasks</span>
          <div className="grid grid-cols-2 gap-3 mt-3">
            {states.map((state) => (
              <div className="p-3 bg-gray-100 dark:bg-zinc-900 rounded-xl">
                <span className="text-gray-600 dark:text-gray-300 text-[12px]">{ state.toUpperCase() }</span>
                <div className="flex gap-2 mt-1 items-center">
                  <div
                    data-orientation="vertical"
                    aria-orientation="vertical"
                    role="separator"
                    className="w-1 h-4 bg-primary"
                  />
                 
                  <span className="font-bold text-lg dark:text-gray-200">{ OverallTasksStates(state) }</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ActiveProject;
