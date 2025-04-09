import * as React from "react";
import { Box, Card, Typography, TextField, Button, Alert, Drawer } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import DrawerList from "../Components/DrawerList";
import MenuIcon from '@mui/icons-material/Menu';


export default function AuthLandingScreen(){

    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <Box width={'300px'} style={{flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
            <Button onClick={() => {setIsOpen(true)}}><MenuIcon/></Button>
            <Drawer open={isOpen} onClose={()=>{setIsOpen(false)}}>
                <DrawerList />
            </Drawer>
        </Box>
    )
}