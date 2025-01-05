import { cn } from "@/lib/utils";
import { ITask } from "@/types";
import { Checkbox } from "./ui/checkbox";
import { Trash2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  deleteTask,
  toggleCompleteState,
} from "@/redux/features/task/taskSlice";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { EditTaskModal } from "@/module/EditTaskModal";
import { selectUsers } from "@/redux/features/user/userSlice";

interface IProps {
  task: ITask;
}

export default function TaskCard({ task }: IProps) {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const assignedUser = users.find((user) => user.id === task.assignTo);
  return (
    <div className="p-5 border-white border rounded-md">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div
            className={cn("size-3 rounded-full", {
              "bg-red-500": task.priority === "high",
              "bg-yellow-500": task.priority === "medium",
              "bg-green-500": task.priority === "low",
            })}
          ></div>
          <h1 className={cn({ "line-through": task.isCompleted })}>
            {task.title}
          </h1>
        </div>
        <div className="flex gap-3 items-center">
          <div>
            <AlertDialog>
              <AlertDialogTrigger>
                <Trash2 className="text-red-500 size-5" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="text-center">
                    Are you sure you want to delete this task?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-center">
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex gap-3 justify-center">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => dispatch(deleteTask(task.id))}
                  >
                    Delete
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div>
            <EditTaskModal task={task} />
          </div>
          <Checkbox
            checked={task.isCompleted}
            onClick={() => dispatch(toggleCompleteState(task.id))}
          />
        </div>
      </div>
      <p>{task.description}</p>
      <p>Assigned To - {assignedUser ? assignedUser.name : "None"}</p>
      <p>{task.dueDate}</p>
    </div>
  );
}
