import { CheckIcon } from "@heroicons/react/24/outline";
import {
  CalendarIcon,
  ChatBubbleBottomCenterTextIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import useGetTasks from "../hooks/useGetTasks";
import { useSelector } from "react-redux";
import useCompare from "../hooks/useCompare";
import CardTask from "../components/CardTask";

export default function MyTask() {
  const { tasks } = useGetTasks();
  const auth = useSelector((state: any) => state.user);
  const { isComplete, isInWork, isDue } = useCompare();

  const myTasks = tasks.filter((task) =>
    task.users.find((user) => user.id === auth.userId)
  );

  const tasksComplete = myTasks.filter((task) => isComplete(task));
  const tasksAtWork = myTasks.filter((task) => isInWork(task));
  const tasksIsDue = myTasks.filter((task) => isDue(task));

  return (
    <div className="flex gap-4">
      {/* Taks */}
      <div className="basis-4/12 ">
        <header className="uppercase border-blue-500 border-b-4 py-3 font-bold">
          Tasks At Work
          <span className="text-gray-400 border-[1px] rounded-full px-1 ml-2">
            {tasksAtWork.length}
          </span>
        </header>
        <div className="pt-7 flex flex-col gap-6">
          {tasksAtWork.map((task) => (
            <CardTask task={task} />
          ))}
        </div>
      </div>
      {/* Completed Tasks */}
      <div className="basis-4/12 ">
        <header className="uppercase border-green-500 border-b-4 py-3 font-bold">
          Completed Tasks
          <span className="text-gray-400 border-[1px] rounded-full px-1 ml-2">
            {tasksComplete.length}
          </span>
        </header>
        <div className="pt-7 flex flex-col gap-6">
          {tasksComplete.map((task) => (
            <CardTask task={task} />
          ))}
        </div>
      </div>
      {/* Due Date */}
      <div className="basis-4/12 ">
        <header className="uppercase border-red-500 border-b-4 py-3 font-bold">
          Due Date
          <span className="text-gray-400 border-[1px] rounded-full px-1 ml-2">
            {tasksIsDue.length}
          </span>
        </header>
        <div className="pt-7 flex flex-col gap-6">
          {tasksIsDue.map((task) => (
            <CardTask task={task} />
          ))}
        </div>
      </div>
    </div>
  );
}
