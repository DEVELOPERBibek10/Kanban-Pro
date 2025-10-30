import ActiveProject from "@/components/ActiveProject";
import ProjectAction from "@/components/ProjectAction";
import { Button } from "@/components/ui/button";
import type { RootState } from "@/lib/Store/Store";
import { selectProjectById } from "@/lib/utils";
import { useSelector } from "react-redux";

const Home = () => {
  const activeId = useSelector((state: RootState) => state.active.id);
  const project = useSelector(selectProjectById(activeId!));

  return (
    <main className="w-full flex gap-4 mx-4">
      <div className="bg-white dark:bg-zinc-800 w-[70%] rounded-xl">
        <div className="w-full flex justify-between">
          <div className="w-full flex justify-between items-center m-3">
            <div className="flex gap-2">
              <h2 className="text-2xl font-bold">Projects</h2>
              <ProjectAction />
            </div>
            <Button className="bg-secondary dark:bg-zinc-600 hover:bg-secondary text-zinc-700 dark:text-gray-200 rounded-full cursor-pointer">
              Add New Task
            </Button>
          </div>
        </div>
        {project &&
          Object.keys(project.columns).map((column) => (
            <div className="capitalize">{column}</div>
          ))}
      </div>
      <div className="bg-white dark:bg-zinc-800 w-[30%] rounded-xl">
        <ActiveProject />
      </div>
    </main>
  );
};

export default Home;
