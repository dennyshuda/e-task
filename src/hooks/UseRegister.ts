import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, storage } from "../firebase/config";
import { ref, uploadBytes } from "firebase/storage";

export default function useRegister() {
  async function register(email: string, password: string, image: File | null) {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (image) {
        const imagePath = `images/${response.user.uid}/${image.name}`;
        const refStorage = ref(storage, imagePath);
        await uploadBytes(refStorage, image);
      } else {
        console.log("sorry file not found");
      }

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("done");
    }
  }
  return register;
}
