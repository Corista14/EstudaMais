import { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

function useUser() {
  const db = firebase.firestore();
  const [user, setUser] = useState({});
  const { currentUser } = useAuth();

  useEffect(() => {
    const performQuery = async () => {
      const userDoc = await db.collection("users").doc(currentUser.uid).get();
      const usernameFromUserDoc = await userDoc.data();
      setUser(usernameFromUserDoc);
    };

    performQuery();
  }, [currentUser, db]);

  return { user };
}

export default useUser;
