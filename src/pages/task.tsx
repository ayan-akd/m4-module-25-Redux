import TaskCard from "@/components/taskCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddTaskModal } from "@/module/AddTaskModal";
import { selectTasks, updateFilter } from "@/redux/features/task/taskSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Task() {
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();
  return (
    <div>
      <div className="flex justify-between items-center p-10">
        <h1>Tasks</h1>
        <Tabs defaultValue={"all"}>
          <TabsList className="grid w-full grid-cols-4 gap-2">
            <TabsTrigger onClick={()=>dispatch(updateFilter('all'))} value="all">All</TabsTrigger>
            <TabsTrigger onClick={()=>dispatch(updateFilter('low'))} value="low">Low</TabsTrigger>
            <TabsTrigger onClick={()=>dispatch(updateFilter('medium'))} value="medium">Medium</TabsTrigger>
            <TabsTrigger onClick={()=>dispatch(updateFilter('high'))} value="high">High</TabsTrigger>
          </TabsList>
        </Tabs>
        <AddTaskModal />
      </div>
      <div className="grid grid-cols-1 gap-4 p-10">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
