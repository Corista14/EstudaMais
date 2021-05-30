import "firebase/firestore";
import firebase from "firebase/app";
import { useEffect, useState } from "react";

export function useResource(subject) {
  const db = firebase.firestore();
  const [queriedResource, setQueriedResource] = useState([]);

  useEffect(() => {
    const performQuery = async () => {
      const query = await db
        .collection("resource")
        .where("subject", "==", subject)
        .get();
      for (const resource of query.docs) {
        const newData = resource.data();
        setQueriedResource((prevState) => prevState.concat(newData));
      }
    };
    performQuery();
  }, [subject, db]);

  return { queriedResource };
}

export function useResourceByYear(subject, year) {
  const db = firebase.firestore();
  const [queriedResourceByYear, setQueriedResourceByYear] = useState([]);

  useEffect(() => {
    const performQuery = async () => {
      const query = await db
        .collection("resource")
        .where("subject", "==", subject)
        .where("year", "==", year)
        .get();
      for (const resource of query.docs) {
        const newData = resource.data();
        setQueriedResourceByYear((prevState) => prevState.concat(newData));
      }
    };
    performQuery();
  }, [subject, year, db]);

  return { queriedResourceByYear };
}

export function useResourceByPopular() {
  const db = firebase.firestore();
  const [queriedResourceByPopular, setQueriedResourceByPopular] = useState([]);

  useEffect(() => {
    const performQuery = async () => {
      const query = await db
        .collection("resource")
        .where("downloads", ">=", 3)
        .get();

      for (const resource of query.docs) {
        const newData = resource.data();
        setQueriedResourceByPopular((prevState) => prevState.concat(newData));
      }
    };
    performQuery();
  }, []);

  return { queriedResourceByPopular };
}
