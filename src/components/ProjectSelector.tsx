/* eslint-disable @typescript-eslint/no-explicit-any */
import type { RootState } from "@/lib/Store/Store";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "./ui/button";
import { cn, returnIcons } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";
import { PopoverContent } from "@radix-ui/react-popover";
import ProjectsDropdown from "./ProjectsDropdown";

interface ProjectSelectorProps {
  name: string;
  control: any;
  label: string;
}

const ProjectSelector = ({ name, control, label }: ProjectSelectorProps) => {
  const projects = useSelector((state: RootState) => state.kanban);
  const [open, setOpen] = useState(false);
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedProject = projects.find((p) => p.id === field.value);
        const error = fieldState.error;

        return (
          // We render the FormItem content directly here
          <FormItem className="w-full max-w-[300px] relative">
            <FormLabel>{label}</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger className="relative" asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    aria-invalid={!!error}
                    className={cn(
                      "w-full justify-between transition-all duration-200 cursor-pointer",
                      error ? "border-red-500 focus-visible:ring-red-500" : ""
                    )}
                    onBlur={field.onBlur}
                  >
                    <div className="flex items-center gap-2">
                      <div className=" bg-primary p-1 rounded-md">
                        <img
                          loading="lazy"
                          src={returnIcons(selectedProject!.type!).icon}
                          alt={returnIcons(selectedProject!.type!).name}
                          className="size-[18px]"
                        />
                      </div>
                      <span className="truncate text-left flex-1">
                        {selectedProject
                          ? selectedProject.name
                          : "Select a project..."}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-white dark:bg-zinc-900 shadow-lg rounded-md z-10 mt-1">
                <ProjectsDropdown
                  showActiveStatus={false}
                  setOpen={setOpen}
                  field={field}
                  fieldState={fieldState}
                />
              </PopoverContent>
            </Popover>
            {/* Error display is handled by FormMessage wrapper */}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default ProjectSelector;
