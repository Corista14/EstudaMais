import firebase from "firebase/app";
import "firebase/firestore";
import { useEffect, useState } from "react";

export function useDownloads(url) {
  const [prevDownloads, setPrevDownloads] = useState(0);
  const db = firebase.firestore()
  useEffect(() => {
    const performQuery = async () => {
      const query = await db
        .collection("resource")
        .where("url", "==", url)
        .get();
      for (const resource of query.docs) {
        const newData = resource.data();
        setPrevDownloads(newData.downloads);
      }
    };

    performQuery();
  }, []);

  return { prevDownloads };
}
