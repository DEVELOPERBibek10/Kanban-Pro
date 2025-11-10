import { Input } from "./ui/input";
import { Check } from "lucide-react";
import { returnIcons } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { setActiveProjectId } from "@/lib/Slice/ActiveProjectSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import useDebounce from "@/Hooks/useDebounce";
import type { RootState } from "@/lib/Store/Store";
import type { ControllerFieldState } from "react-hook-form";

interface ProjectsDropdownProps {
  field?: {
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    name: string;
  };
  fieldState?: ControllerFieldState;
  showActiveStatus: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectsDropdown = ({
  showActiveStatus,
  setOpen,
  field,
}: ProjectsDropdownProps) => {
  const projects = useSelector((state: RootState) => state.kanban);
  const activeId = useSelector((state: RootState) => state.active.id);
  const selectedId = field && field.value ? field?.value : null;
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 600);
  const searchResult = useMemo(() => {
    if (debouncedSearch) {
      return projects.filter((project) =>
        project.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }
    return projects;
  }, [projects, debouncedSearch]);

  return (
    <>
    
        <Input
          placeholder="Search a project..."
          className="border-0 shadow-none outline-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Separator />
        <ul>
          {searchResult.map((project) => (
            <li
              key={project.id}
              onClick={() => {
                if (field) {
                  field.onChange(project.id);
                  field.onBlur();
                }
                if (showActiveStatus) {
                  dispatch(setActiveProjectId({ id: project.id }));
                }
                if (setOpen) {
                  setOpen(false);
                }
              }}
              className="w-full border-0 cursor-pointer p-1.5 rounded-lg flex items-center justify-between"
            >
              <div className="w-full rounded-lg flex gap-2 items-center">
                <div className="bg-primary size-7 flex justify-center items-center rounded-lg">
                  <img
                    loading="lazy"
                    src={returnIcons(project.type!).icon}
                    alt={returnIcons(project.type!).name}
                    className="size-5"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm dark:text-gray-200 line-clamp-1">
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
              {showActiveStatus && activeId === project.id && (
                <Check color="green" className="mb-1 size-5" />
              )}
              {selectedId && selectedId === project.id && (
                <Check color="gray" className="size-4" />
              )}
            </li>
          ))}
        </ul>
   
    </>
  );
};

export default ProjectsDropdown;
