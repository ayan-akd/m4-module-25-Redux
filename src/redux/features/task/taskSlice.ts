import { RootState } from "@/redux/store";
import { ITask } from "@/types";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { format } from "date-fns";

interface InitialState {
  tasks: ITask[];
  filter: "all" | "high" | "medium" | "low";
}

const initialState: InitialState = {
  tasks: [
    {
      id: "1",
      title: "Task 1",
      description: "Description 1",
      dueDate: "01-01-2022",
      priority: "high",
      isCompleted: false,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Description 2",
      dueDate: "02-02-2022",
      priority: "medium",
      isCompleted: false,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Description 3",
      dueDate: "03-03-2022",
      priority: "low",
      isCompleted: false,
    },
  ],
  filter: "all",
};

type DraftTask = Pick<ITask, "title" | "description" | "dueDate" | "priority">;

const createTask = (taskData: DraftTask): ITask => {
  return {
    id: nanoid(),
    isCompleted: false,
    ...taskData,
  };
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<ITask>) => {
      action.payload.dueDate = format(
        new Date(action.payload.dueDate),
        "dd-MM-yyyy"
      );
      const taskData = createTask(action.payload);
      state.tasks.push(taskData);
    },
    toggleCompleteState: (state, action: PayloadAction<string>) => {
      state.tasks.forEach((task) =>
        task.id === action.payload
          ? (task.isCompleted = !task.isCompleted)
          : task
      );
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    }
  },
});

export const selectTasks = (state: RootState) => {
  return state.todo.tasks;
};

export const selectFilter = (state: RootState) => {
  return state.todo.filter;
};

export const { addTask, toggleCompleteState, deleteTask } = taskSlice.actions;

export default taskSlice.reducer;
