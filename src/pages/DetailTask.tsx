import {
  CalendarIcon,
  PaperAirplaneIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useLocation } from "react-router";
import useGetTaskById from "../hooks/useGetTaskById";

export default function DetailTask() {
  const { state: id } = useLocation();
  const { task } = useGetTaskById(id);
  console.log(task);

  return (
    <div className="flex">
      <div className="basis-8/12">
        <div className="border-[1px] rounded-md p-4">
          <h1 className="text-xl font-medium mb-3">{task?.title}</h1>
          <div className="text-gray-500 flex gap-2 mb-3 items-center">
            <CalendarIcon width="20" />
            <span>{task?.duedate}</span>
            <label className="bg-red-100 px-3 py-1 rounded-full font-medium text-red-500 text-sm">
              Due Date
            </label>
          </div>
          <p className="text-justify text-gray-700 mb-5">{task?.description}</p>
          <div className="flex gap-3">
            <button className="bg-green-600 hover:bg-green-700 btn">
              Mark As Completed
            </button>
            <button className="bg-red-600 hover:bg-red-700 btn">
              <TrashIcon width="20" />
            </button>
          </div>
        </div>
        {/* Comment */}
        <div className="p-4 mt-4 border-[1px] rounded-md">
          <h1 className="text-xl font-medium mb-3">Comments</h1>
          <div className="mb-4">
            <div className="mb-3 w-fit flex gap-1">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/002/275/847/small/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg"
                alt="avatar-user"
                className="avatar mr-1 self-start"
              />
              <div className="bg-gray-100 p-1 px-4 rounded-lg">
                <h1 className="font-medium">Nama User</h1>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>
            </div>
          </div>
          <form className="flex gap-2">
            <textarea className="basis-10/12 outline-none border-[1px] rounded-lg p-2" />
            <button
              type="submit"
              className="btn self-start bg-blue-700 hover:bg-blue-800"
            >
              <PaperAirplaneIcon width="20" />
            </button>
          </form>
        </div>
      </div>
      <div className="basis-4/12 px-3">
        <div className="border-[1px] rounded-md p-3">
          <h1 className="text-xl font-medium mb-3">Users</h1>
          <div>
            {task?.users.map((user) => (
              <div className="text-sm py-1 text-gray-500 flex items-center">
                <img
                  src={user.photoURL}
                  alt="avatar-user"
                  className="avatar mr-2"
                />
                <h1>{user.displayName}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
