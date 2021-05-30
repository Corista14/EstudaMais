import React, { useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import firebase from "firebase/app";
import "firebase/firestore";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const db = firebase.firestore();

  function signup(email, password, username) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((credentials) => {
        return db.collection("users").doc(credentials.user.uid).set({
          username: username,
          userResourcesCount: 0,
          level: 1,
          progress: 0,
        });
      });
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
