import { Box, Typography, Button } from "@mui/material";
import * as React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logout, getDogBreeds } from "../Helpers/api-client";

export default function DrawerList(){
    const dispatch = useDispatch();

    const userName = useSelector((store: any) => {
    return store.userInfo.userName;
    });
    const userEmail = useSelector((store: any) => {
    return store.userInfo.userEmail;
    });

    return(
        <Box width={'200px'} p={'15px'}>
            <Button variant="outlined" onClick={()=>{logout(dispatch);}}>Logout</Button>
            <Box marginTop={'15px'}>
                <Typography>Welcome {userName}!</Typography>
                <Button variant="outlined" onClick={()=>{getDogBreeds();}}>test</Button>
            </Box>
        </Box>
    );
}