import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";


export default function ModalConfirmacion(props){

    const {children, mensaje, color, tooltip } = props

     const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (<>

       <Tooltip title={tooltip}>
        <IconButton color={color} onClick={handleOpen}>
          {children}
        </IconButton>
      </Tooltip>

         
     
        <Dialog
          open={open}
          onClose={() => handleClose(false)}
          aria-labelledby="confirm-dialog-title"
        >
        <DialogTitle 
          id="confirm-dialog-title"
          sx={{display: "flex", justifyContent: "space-between"}}
        >
          Confirmar acción
          {/* Botón de cerrar en la esquina derecha */}
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            { mensaje }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="error" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
  
    </>);

}