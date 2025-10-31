import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteProject } from "@/lib/Slice/kanbanSlice";
import { useDispatch } from "react-redux";

interface DeleteProjectAlertProps {
  projectId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteProjectAlert = ({
  projectId,
  open,
  setOpen,
}: DeleteProjectAlertProps) => {
  const dispatch = useDispatch();
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            project.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => dispatch(deleteProject({ id: projectId }))}
            className="bg-red-500 hover:bg-red-600 cursor-pointer"
          >
            Delete
          </AlertDialogAction>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProjectAlert;
