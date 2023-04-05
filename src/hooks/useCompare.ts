import { TasksType } from "../types";

export default function useCompare() {
  const isComplete = (task: TasksType) => task.complete;

  const isInWork = (task: TasksType) =>
    new Date(task.duedate).getTime() > new Date().getTime() && !task.complete;

  const isDue = (task: TasksType) =>
    new Date(task.duedate).getTime() < new Date().getTime() && !task.complete;

  return { isComplete, isInWork, isDue };
}
