import {
  doc,
  setDoc,
  addDoc,
  collection,
  Timestamp,
  query,
  deleteDoc,
  updateDoc,
  getDoc,
  getDocs,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfiguration";

const addNewUser = async (uid, name, email) => {
  try {
    await setDoc(doc(db, "users", uid), {
      name,
      email,
      uid,
      createdAt: Timestamp.now(),
    });
  } catch (error) {
    console.error("Error writing new user to Firestore:", error);
    throw error;
  }
};

const checkUserEmailExists = async (email) => {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const snapshot = await getDocs(q);
    return snapshot.size > 0;
  } catch (error) {
    console.error("Error checking user email:", error);
    return false;
  }
};

export { addNewUser, checkUserEmailExists };
