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
    <main className="w-full flex flex-col gap-4 mx-4 lg:flex-row">
      <div className="bg-white dark:bg-zinc-800 w-full lg:w-[70%] rounded-xl">
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
        <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] auto-rows-fr mx-4">
          {project &&
            Object.keys(project.columns).map((column) => (
              <div className="border-2 rounded-lg dark:border-zinc-700 border-zinc-200 min-h-[500px] flex flex-col items-center px-3">
                <div className="w-full bg-zinc-200 dark:bg-zinc-700 p-2 mt-2.5 rounded-md flex justify-between items-center">
                  {project.columns[column].name}
                  <div className="w-8 h-8 rounded-full bg-primary text-gray-200 flex items-center justify-center">
                    {project.columns[column].tasks.length}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="bg-white dark:bg-zinc-800 w-full lg:w-[30%] rounded-xl">
        <ActiveProject />
      </div>
    </main>
  );
};

export default Home;
