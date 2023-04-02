import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import { TasksType } from "../types";

export default function useGetTasks() {
  const [tasks, setTasks] = useState<TasksType[]>([]);
  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const list: TasksType[] = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as TasksType);
        setTasks(list);
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { tasks };
}
