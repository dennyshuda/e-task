import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export default function useLogin() {
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
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  return login;
}
