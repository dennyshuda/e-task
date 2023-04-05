import {
  CalendarIcon,
  ChatBubbleBottomCenterTextIcon,
  CheckIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { tasksCount } from "../utility/constant";
import useGetTasks from "../hooks/useGetTasks";
import useCompare from "../hooks/useCompare";
import { useSelector } from "react-redux";
import CardTask from "../components/CardTask";

export default function Home() {
  const { tasks } = useGetTasks();

  const auth = useSelector((state: any) => state.user);

  const { isComplete, isInWork, isDue } = useCompare();

  const tasksComplete = tasks.filter((task) => isComplete(task));

  const tasksAtWork = tasks.filter((task) => isInWork(task));

  const tasksIsDue = tasks.filter((task) => isDue(task));

  const myTasks = tasks.filter((task) =>
    task.users.find((user) => user.id === auth.userId)
  );

  const itemCount = tasksCount(
    tasks.length,
    myTasks.length,
    tasksComplete.length,
    tasksIsDue.length
  );

  return (
    <div>
      <div className="flex gap-3 mb-8">
        {itemCount.map((tc, i) => (
          <div
            key={i}
            className="flex border-[1px] rounded-md p-3 basis-3/12 justify-between"
          >
            <div>
              <h6 className={`${tc.color} font-medium`}>{tc.title}</h6>
              <h1 className={`${tc.color} text-3xl font-bold`}>{tc.count}</h1>
            </div>
            {tc.icon}
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <div className="basis-4/12 ">
          <header className="uppercase border-blue-500 border-b-4 py-3 font-bold">
            Tasks In Work
            <span className="text-gray-400 border-[1px] rounded-full px-1 ml-2">
              {tasksAtWork.length}
            </span>
          </header>
          <div className="pt-7 flex flex-col gap-6">
            {tasksAtWork.map((task) => (
              <CardTask key={task.id} task={task} />
            ))}
          </div>
        </div>
        <div className="basis-4/12 ">
          <header className="uppercase border-green-500 border-b-4 py-3 font-bold">
            Completed Tasks
            <span className="text-gray-400 border-[1px] rounded-full px-1 ml-2">
              {tasksComplete.length}
            </span>
          </header>
          <div className="pt-7 flex flex-col gap-6">
            {tasksComplete.map((task) => (
              <CardTask key={task.id} task={task} />
            ))}
          </div>
        </div>
        <div className="basis-4/12">
          <header className="uppercase border-red-500 border-b-4 py-3 font-bold">
            Due Date
            <span className="text-gray-400 border-[1px] rounded-full px-1 ml-2">
              {tasksIsDue.length}
            </span>
          </header>
          <div className="pt-7 flex flex-col gap-6">
            {tasksIsDue.map((task) => (
              <CardTask key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
