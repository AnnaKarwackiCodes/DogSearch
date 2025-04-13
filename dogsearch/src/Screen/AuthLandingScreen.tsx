import * as React from "react";
import { Box, Button, Drawer } from "@mui/material";
import { useSelector } from 'react-redux';
import DrawerList from "../Components/DrawerList";
import MenuIcon from '@mui/icons-material/Menu';
import SearchScreen from "./SearchScreen";
import FavoritedDogsScreen from "./FavoritedDogsScreen";
import { logout } from "../Helpers/api-client";
import { useDispatch } from "react-redux";
import Footer from "../Components/Footer";


export default function AuthLandingScreen(){
    const curScreen = useSelector((store: any) => {
        return store.userInfo.curScreen;
      });
    const [isOpen, setIsOpen] = React.useState(false);
    const dispatch = useDispatch();

    React.useEffect(() => {
        setTimeout(()=> {
            logout(dispatch);
        },3600000);
    }, []);
    
    return (
        <Box width={'100%'}>
            <Button style={{position:'fixed', left:0, top: 0, backgroundColor: 'white', color: '#023047'}} onClick={() => {setIsOpen(true)}}>Menu <MenuIcon/></Button>
            <Drawer open={isOpen} onClose={()=>{setIsOpen(false)}} style={{flex: 1, left: 0}}>
                <DrawerList closeMenu={() => {setIsOpen(false)}}/>
            </Drawer>
            {curScreen === 0 ? <SearchScreen /> : <FavoritedDogsScreen/>}
            <Footer />
        </Box>
    )
}