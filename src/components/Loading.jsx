import React from "react"
import { styled } from '@mui/material';

import { CircularProgress, Box } from '@mui/material';

const Loading = () => {
    return(
        <>
            <Container>
                <CircularProgress/>
            </Container>            
        </>
    )
}

const Container = styled(Box)({ 
   width: '100%',
   display: 'flex',
   justifyContent: 'center'

})

export default Loading