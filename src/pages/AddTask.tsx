import Select from "react-select";
import useGetUsers from "../hooks/useGetUsers";
import { useEffect, useState } from "react";
import { UserType } from "../types";
import { useFormik } from "formik";
import { addTaskSchema } from "../validations/AddTaskValidation";

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

  const {
    handleChange,
    values,
    handleSubmit,
    setFieldValue,
    errors,
    isSubmitting,
    isValid,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      duedate: "",
      users: [],
      category: "",
    },
    validationSchema: addTaskSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <h1 className="text-2xl font-medium">Add Task</h1>
      <form onSubmit={handleSubmit} className="py-3">
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
            onChange={handleChange}
            value={values.title}
          />
          {errors.title ? (
            <span className="error-message">{errors.title}</span>
          ) : (
            ""
          )}
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
            onChange={handleChange}
            value={values.description}
          />
          {errors.description ? (
            <span className="error-message">{errors.description}</span>
          ) : (
            ""
          )}
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
            onChange={handleChange}
            value={values.duedate}
          />
          {errors.duedate ? (
            <span className="error-message">{errors.duedate}</span>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="users" className="mb-2 font-medium">
            Users
          </label>
          <Select
            options={optionUsers}
            onChange={(lists) => {
              const value = lists.map((list) => list.value);
              setFieldValue("users", value);
            }}
            isMulti
          />

          {errors.users ? (
            <span className="error-message">{errors.users}</span>
          ) : (
            ""
          )}
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="category" className="mb-2 font-medium">
            Category
          </label>
          <Select
            options={options}
            onChange={(event) => {
              setFieldValue("category", event?.value);
            }}
          />
          {errors.category ? (
            <span className="error-message">{errors.category}</span>
          ) : (
            ""
          )}
        </div>
        {!isValid ? (
          <button type="submit" disabled className="bg-blue-400 btn">
            Add Task
          </button>
        ) : (
          <button type="submit" className="bg-blue-700 hover:bg-blue-800 btn">
            {isSubmitting ? "Please Wait" : "Add Task"}
          </button>
        )}
      </form>
    </div>
  );
}
