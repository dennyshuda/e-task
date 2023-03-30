import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export default function useRegister() {
  async function register(email: string, password: string) {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("done");
    }
  }
  return register;
}
