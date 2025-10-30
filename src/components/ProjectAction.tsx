import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useSelector } from "react-redux";
import type { RootState } from "@/lib/Store/Store";

import ProjectForm from "./ProjectForm";
import { useMemo, useState } from "react";

import type { ProjectType } from "@/types";
import useDebounce from "@/Hooks/useDebounce";
import { BiSolidError } from "react-icons/bi";
import ProjectItem from "./ProjectItem";

const ProjectAction = () => {
  const Projects = useSelector((state: RootState) => state.kanban);
  const [open, setOpen] = useState(false);
  const [projectUpdate, setProjectUpdate] = useState(false);
  const [projectDetail, setProjectDetail] = useState<{
    id: string;
    type: ProjectType;
    name: string;
    description: string;
  } | null>(null);

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 600);
  const searchResult = useMemo(() => {
    if (debouncedSearch) {
      return Projects.filter(
        (project) =>
          project.name.toLowerCase().includes((debouncedSearch).toLowerCase())
      );
    }
    return Projects;
  }, [Projects, debouncedSearch]);

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Eye
            width={26}
            className="text-muted-foreground mt-1 cursor-pointer"
          />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader className="w-full border-b-2 border-gray-300 dark:border-zinc-600">
            <DialogTitle className="text-xl font-bold leading-4">
              All Projects
            </DialogTitle>
            <p className="text-muted-foreground text-sm">
              List of all available projects
            </p>
            <div className="w-full flex justify-between gap-3 items-center mt-2 mb-4">
              <Input
                className="focus-visible:ring-0 outline-0 border-0 shadow-sm focus-visible:ring-offset-1 focus-visible:ring-offset-primary"
                placeholder="Search a Project..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Button
                onClick={() => {
                  setProjectUpdate(false);
                  setOpen(!open);
                  setProjectDetail(null);
                }}
                className="bg-secondary hover:bg-secondary text-zinc-800 dark:text-gray-200 cursor-pointer"
              >
                Create Project
              </Button>
            </div>
          </DialogHeader>
          <ul className="flex flex-col gap-4 justify-center">
            {searchResult.length !== 0 ? (
              searchResult.map((project) => (
                <ProjectItem
                  project={project}
                  open={open}
                  setOpen={setOpen}
                  setProjectDetail={setProjectDetail}
                  setProjectUpdate={setProjectUpdate}
                />
              ))
            ) : (
              <li className="h-28 w-full flex flex-col gap-3 items-center justify-center">
                <BiSolidError size={50} color="gray" />
                <p className="text-muted-foreground text-center w-full text-sm">
                  Project Not found...
                </p>
              </li>
            )}
          </ul>

          <p className="text-[13px] text-muted-foreground">
            {Projects.length} Projects
          </p>
        </DialogContent>
      </Dialog>
      {
        <ProjectForm
          open={open}
          setOpen={setOpen}
          status={projectUpdate ? "Update" : "Create"}
          detail={projectUpdate ? projectDetail : null}
        />
      }
    </>
  );
};

export default ProjectAction;
