import TaskCard from "@/components/taskCard";
import { AddTaskModal } from "@/module/AddTaskModal";
import { selectTasks } from "@/redux/features/task/taskSlice";
import { useAppSelector } from "@/redux/hooks";

export default function Task() {
  const tasks = useAppSelector(selectTasks);
  return (
    <div>
      <div className="flex justify-between items-center p-10">
        <h1>Tasks</h1>
        <AddTaskModal />
      </div>
      <div className="grid grid-cols-1 gap-4 p-10">
      {
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))
      }
      </div>
    </div>
  );
}
