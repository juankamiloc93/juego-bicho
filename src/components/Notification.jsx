import React from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import { useSelector, useDispatch } from 'react-redux';
import { setAlert, reseAlert  } from '../redux/feactures/alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/**
 * 
 *
 * @returns 
 */
const Notification = () => {    

    const { alert } = useSelector((state) => state.alert)

    const dispatch = useDispatch()
    const resetProps = () => {
		dispatch(reseAlert())
	}

    const duration = 10000
     
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
    
        resetProps();
      };
    
    return <>
        <Snackbar 
            open={alert?.openAlert}
            autoHideDuration={duration}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right"
             }}
        >
            <Alert onClose={handleClose} severity={alert.type} sx={{ width: '100%' }}>
                {alert.mssg}
            </Alert>
        </Snackbar>
    </>
}

export { Notification }