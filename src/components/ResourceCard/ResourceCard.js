import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useDownloads } from "../../hooks/useDownloads";

function ResourceCard({ title, subject, downloadUrl, author, year }) {
  const db = firebase.firestore();
  const classes = useStyles();
  const { prevDownloads } = useDownloads(downloadUrl);

  async function updateDownloads() {
    console.log("ya...");
    db.collection("resource")
      .where("url", "==", downloadUrl)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          db.collection("resource")
            .doc(doc.id)
            .update({
              downloads: prevDownloads + 1,
            });
        });
      });
  }

  return (
    <div>
      <Card elevation={3} className={classes.card}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>

          <Typography variant="body2" color="textSecondary">
            {"" + author + " - " + subject + " (" + year + ")"}
          </Typography>
        </CardContent>

        <CardActions>
          <Button
            download
            onClick={updateDownloads}
            target="_blank"
            rel="noopener noreferrer"
            href={downloadUrl}
            color="primary"
          >
            Download
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({

}));

export default ResourceCard;
