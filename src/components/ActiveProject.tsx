import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RootState } from "@/lib/Store/Store";
import { returnIcons, selectProjectById } from "@/lib/utils";

import { useDispatch, useSelector } from "react-redux";
import { setActiveProjectId } from "@/lib/Slice/ActiveProjectSlice";
import { useEffect, useState } from "react";

import ProjectsDropdown from "./ProjectsDropdown";
const ActiveProject = () => {
  const projects = useSelector((state: RootState) => state.kanban);
  const activeId = useSelector((state: RootState) => state.active.id);
  const project = useSelector(selectProjectById(activeId!));
  const dispatch = useDispatch();
  const [open,setOpen] = useState(false)

  useEffect(() => {
    if (projects.length === 1) {
      dispatch(setActiveProjectId({ id: projects[0].id }));
    }
  }, [dispatch, projects]);

  return (
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
        <ProjectsDropdown showActiveStatus={ true } setOpen={setOpen} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActiveProject;
