import React, { useState, useEffect } from "react";
import "firebase/firestore";
import firebase from "firebase/app";
const db = firebase.firestore();

function useQueryProfiles() {
  const [queriedUsers, setQueriedUsers] = useState([]);

  useEffect(() => {
    const performQuery = async () => {
      const query = await db.collection("users").get();
      for (const user of query.docs) {
        const data = user.data();
        setQueriedUsers((prevState) => prevState.concat(data));
      }
    };
    performQuery();
  }, []);
  return { queriedUsers };
}

export default useQueryProfiles;
