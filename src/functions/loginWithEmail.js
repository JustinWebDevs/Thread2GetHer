import { auth } from "../firebase/connections";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function loginWithEmail(email, password) {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    console.log(error);
  }
}
