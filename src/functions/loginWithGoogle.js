import { auth } from "../firebase/connections";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

export default async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.log(error);
  }
}
