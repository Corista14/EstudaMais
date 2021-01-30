import React, { useState, useEffect } from "react";
import "firebase/firestore";
import firebase from "firebase/app";
const db = firebase.firestore();

function usePerformFirebaseQuery(year, subject, limit) {
  const [loading, setLoading] = useState(true);
  const [resource, setResource] = useState([]);

  useEffect(() => {
    const performQuery = async () => {
      setLoading(true);

      const query = await db
        .collection("resource")
        .where("year", "==", year)
        .where("subject", "==", subject)
        .get();
      for (const year of query.docs) {
        const data = year.data();
        setResource((prevState) => prevState.concat(data));
      }
      
    };
    performQuery();
    setLoading(false);
  }, []);

  

  return { resource, loading };
}
export default usePerformFirebaseQuery;
