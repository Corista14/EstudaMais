import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
  DialogTitle,
} from "@material-ui/core";

function LogoutDialog({ openDialog, closeDialog, yesButton }) {
  return (
    <Dialog open={openDialog} onClose={closeDialog}>
      <DialogTitle>Estás prestes a sair da tua conta</DialogTitle>

      <DialogContent>
        <DialogContentText>
          Tens a certeza que pretendes sair da tua conta? Poderás sempre voltar
          assim que quiseres!
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={yesButton} color="primary">
          Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LogoutDialog;
