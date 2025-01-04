import { cn } from "@/lib/utils";
import { ITask } from "@/types";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";
import { deleteTask, toggleCompleteState } from "@/redux/features/task/taskSlice";

interface IProps {
  task: ITask;
}

export default function TaskCard({ task }: IProps) {
  const dispatch = useAppDispatch();

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
          <Button onClick={()=> dispatch(deleteTask(task.id))} variant="ghost" size="icon" className="text-red-500">
            <Trash2 />
          </Button>
          <Checkbox checked={task.isCompleted} onClick={() => dispatch(toggleCompleteState(task.id))} />
        </div>
      </div>
      <p>{task.description}</p>
      <p>{task.dueDate}</p>
    </div>
  );
}
