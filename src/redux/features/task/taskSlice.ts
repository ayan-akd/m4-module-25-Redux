import { RootState } from "@/redux/store";
import { ITask } from "@/types";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { format } from "date-fns";
import { removeUser } from "../user/userSlice";

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
      assignTo: null,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Description 2",
      dueDate: "02-02-2022",
      priority: "medium",
      isCompleted: false,
      assignTo: null,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Description 3",
      dueDate: "03-03-2022",
      priority: "low",
      isCompleted: false,
      assignTo: null,
    },
  ],
  filter: "all",
};

type DraftTask = Pick<
  ITask,
  "title" | "description" | "dueDate" | "priority" | "assignTo"
>;

const createTask = (taskData: DraftTask): ITask => {
  return {
    ...taskData,
    id: nanoid(),
    isCompleted: false,
    assignTo: taskData.assignTo ? taskData.assignTo : null,
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
    },
    editTask: (state, action: PayloadAction<ITask>) => {
      action.payload.dueDate = format(
        new Date(action.payload.dueDate),
        "dd-MM-yyyy"
      );
      const taskIndex = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      state.tasks[taskIndex] = action.payload;
    },
    updateFilter: (
      state,
      action: PayloadAction<"all" | "high" | "medium" | "low">
    ) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeUser, (state, action) => {
      state.tasks.forEach((task) =>
        task.assignTo === action.payload ? (task.assignTo = null) : task
      );
    });
  },
});

export const selectTasks = (state: RootState) => {
  const filter = state.todo.filter;
  if (filter === "low") {
    return state.todo.tasks.filter((task) => task.priority === "low");
  } else if (filter === "medium") {
    return state.todo.tasks.filter((task) => task.priority === "medium");
  } else if (filter === "high") {
    return state.todo.tasks.filter((task) => task.priority === "high");
  } else {
    return state.todo.tasks;
  }
};

export const selectFilter = (state: RootState) => {
  return state.todo.filter;
};

export const {
  addTask,
  toggleCompleteState,
  deleteTask,
  editTask,
  updateFilter,
} = taskSlice.actions;

export default taskSlice.reducer;
