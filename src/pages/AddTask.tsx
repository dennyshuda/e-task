import Select from "react-select";
import useGetUsers from "../hooks/useGetUsers";
import { useEffect, useState } from "react";
import { UserType } from "../types";

interface OptionUsers {
  value: UserType;
  label: string;
}

export default function AddTask() {
  const [optionUsers, setOptionUsers] = useState<OptionUsers[]>();
  const { users } = useGetUsers();

  useEffect(() => {
    if (users) {
      const option = users.map((user) => {
        return {
          value: user,
          label: user.displayName,
        };
      });
      setOptionUsers(option);
    }
  }, [users]);

  const options = [
    { value: "urgent", label: "Urgent" },
    { value: "important", label: "Important" },
    { value: "help", label: "Help" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-medium">Add Task</h1>
      <form className="py-3">
        <div className="mb-3 flex flex-col">
          <label className="mb-2 font-medium" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="Title"
            className="input-text"
          />
          <span className="error-message">Error</span>
        </div>
        <div className="mb-3 flex flex-col">
          <label className="mb-2 font-medium" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            className="input-text"
          />
          <span className="error-message">Error</span>
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="duedate" className="mb-2 font-medium">
            Set Due Date
          </label>
          <input
            id="duedate"
            type="date"
            name="duedate"
            className="outline-none border-[1px] self-start py-1 px-2 rounded-md"
          />
          <span className="error-message">Error</span>
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="duedate" className="mb-2 font-medium">
            User
          </label>
          <Select options={optionUsers} isMulti />
          <span className="error-message">Error</span>
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="duedate" className="mb-2 font-medium">
            Category
          </label>
          <Select options={options} />
          <span className="error-message">Error</span>
        </div>
        <button className="bg-blue-700 hover:bg-blue-800 btn">Add Task</button>
      </form>
    </div>
  );
}
