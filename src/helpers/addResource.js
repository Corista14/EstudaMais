import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { useState } from "react";

async function addResource(
  year,
  subject,
  author,
  resourceName,
  file,
  downloads
) {
  const db = firebase.firestore();
  const date = new Date();
  const stringDate = date.toString()
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(file.name);
  await fileRef.put(file);

  fileRef.getDownloadURL().then((url) => {
    db.collection("resource")
      .doc()
      .set({
        name: resourceName,
        year: year,
        subject: subject,
        url: url,
        author: author,
        creationDate: stringDate,
        downloads: 0
      }).catch((e) => console.log(e.message));
  });
  console.log("done")
}

export default addResource;
