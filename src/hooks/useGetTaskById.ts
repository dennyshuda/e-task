import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import { TasksType } from "../types";

export default function useGetTaskById(idDoc: string) {
  const [task, setTask] = useState<TasksType>();

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "tasks", idDoc), (doc) => {
      setTask({ id: doc.id, ...doc.data() } as TasksType);
    });

    return () => {
      unsub();
    };
  }, [idDoc]);

  return { task };
}
