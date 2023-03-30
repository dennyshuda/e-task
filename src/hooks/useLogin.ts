import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../features/userSlice";
import { useNavigate } from "react-router";

export default function useLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function login(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        const userDetail = {
          displayName: user.displayName,
          userId: user.uid,
          photoURL: user.photoURL,
          email: user.email,
        };
        dispatch(userLogin(userDetail));
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  return login;
}
