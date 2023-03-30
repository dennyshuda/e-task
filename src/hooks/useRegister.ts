import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function useRegister() {
  const navigate = useNavigate();
  async function register(
    email: string,
    password: string,
    image: File | null,
    displayName: string
  ) {
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

        await getDownloadURL(refStorage)
          .then(async (url) => {
            await updateProfile(response.user, {
              displayName: displayName,
              photoURL: url,
            });
          })
          .catch((err) => console.log(err));

        console.log(response.user);
      } else {
        console.log("sorry file not found");
      }

      console.log(response);

      await setDoc(doc(db, "users", response.user.uid), {
        online: false,
        displayName: response.user.displayName,
        photoURL: response.user.photoURL,
        email: response.user.email,
      });

      toast.success("Succes Registration", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("done");
    }
  }
  return register;
}
