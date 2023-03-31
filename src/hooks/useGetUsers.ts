import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import { UserType } from "../types";

export default function useGetUsers() {
  const [users, setUsers] = useState<UserType[]>([]);

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("displayName"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const lists: UserType[] = [];
      querySnapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() } as UserType);
      });
      setUsers(lists);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return { users };
}
