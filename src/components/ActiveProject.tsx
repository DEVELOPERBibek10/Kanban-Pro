import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RootState } from "@/lib/Store/Store";
import { returnIcons } from "@/lib/utils";
import type { Project } from "@/types";
import { useSelector } from "react-redux";
import { Input } from "./ui/input";
const ActiveProject = ({ project }: { project: Project }) => {
  const projects = useSelector((state: RootState) => state.kanban);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="w-full p-3 outline-0 cursor-pointer"
        disabled={!project}
      >
        <div className="h-16 bg-muted dark:bg-white/10 rounded-lg flex items-center justify-between">
          <div className="flex flex-col items-start px-3 mt-2">
            <span className="text-gray-400 text-[13px]">PROJECT</span>
            <span className="dark:text-gray-300 text-lg line-clamp-1">
              {project.name}
            </span>
          </div>
          <div className="bg-primary size-10 flex justify-center items-center rounded-full mr-3">
            <img
              loading="lazy"
              src={returnIcons(project.type!).icon}
              alt={returnIcons(project.type!).name}
              className="size-5"
            />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Input
          placeholder="Search a project..."
          className="border-0 shadow-none outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <DropdownMenuSeparator />
        {projects.map((project) => (
          <DropdownMenuItem
            key={project.id}
            className="w-full border-0 cursor-pointer p-1.5 rounded-lg flex items-center justify-between"
          >
            <div className="w-full rounded-lg flex gap-2 items-center">
              <div className="bg-primary size-9 flex justify-center items-center rounded-lg">
                <img
                  loading="lazy"
                  src={returnIcons(project.type!).icon}
                  alt={returnIcons(project.type!).name}
                  className="size-7"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-[15px] dark:text-gray-200 line-clamp-1">
                  {project.name}
                </span>
                <span className="text-xs text-zinc-500">
                  <span className="mr-0.5">
                    {project.columns.todo.tasks.length +
                      project.columns.inProgress.tasks.length +
                      project.columns.done.tasks.length}
                  </span>
                  Tasks
                </span>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActiveProject;
