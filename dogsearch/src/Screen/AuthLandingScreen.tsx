import * as React from "react";
import { Box, Card, Typography, TextField, Button, Alert, Drawer } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import DrawerList from "../Components/DrawerList";
import MenuIcon from '@mui/icons-material/Menu';
import PaginationGrid from "../Components/PaginationGrid";


export default function AuthLandingScreen(){

    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <Box width={'100%'}>
            <Button onClick={() => {setIsOpen(true)}}><MenuIcon/></Button>
            <Drawer open={isOpen} onClose={()=>{setIsOpen(false)}} style={{flex: 1, left: 0}}>
                <DrawerList />
            </Drawer>
            <Box style={{flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                <Typography variant="h3">Doggle</Typography>
                <Typography variant="h4">The search engine for dogs</Typography>
                <PaginationGrid />
            </Box>
        </Box>
    )
}