import * as React from "react";
import { Box, Card, Typography, TextField, Button, Alert, Drawer } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import DrawerList from "../Components/DrawerList";
import MenuIcon from '@mui/icons-material/Menu';
import PaginationGrid from "../Components/PaginationGrid";
import SearchBar from "../Components/SearchBar";
import SearchScreen from "./SearchScreen";
import FavoritedDogsScreen from "./FavoritedDogsScreen";


export default function AuthLandingScreen(){
    const curScreen = useSelector((store: any) => {
        return store.userInfo.curScreen;
      });
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchResults, setSearchResults] = React.useState(['']);
    return (
        <Box width={'100%'}>
            <Button style={{position:'fixed', left:0, top: 0, backgroundColor: 'white'}} onClick={() => {setIsOpen(true)}}><MenuIcon/></Button>
            <Drawer open={isOpen} onClose={()=>{setIsOpen(false)}} style={{flex: 1, left: 0}}>
                <DrawerList />
            </Drawer>
            {curScreen === 0 ? <SearchScreen /> : <FavoritedDogsScreen/>}
        </Box>
    )
}