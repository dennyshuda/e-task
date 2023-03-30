import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/userSlice";
import { useNavigate } from "react-router";
import { doc, updateDoc } from "firebase/firestore";

export default function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function login(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);
        const userDetail = {
          displayName: user.displayName,
          userId: user.uid,
          photoURL: user.photoURL,
          email: user.email,
        };

        await updateDoc(doc(db, "users", user.uid), {
          online: true,
        });

        dispatch(userLogin(userDetail));
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  return login;
}
