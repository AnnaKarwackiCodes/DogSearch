import { Box, Typography, Button, ListItem, ListItemButton, ListItemIcon, ListItemText, List } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../Helpers/api-client";
import SearchIcon from '@mui/icons-material/Search';
import { setCurScreen } from "../redux/reducers/UserInfo";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

export default function DrawerList({closeMenu}: any){
    const dispatch = useDispatch();

    const userName = useSelector((store: any) => {
    return store.userInfo.userName;
    });
    const userEmail = useSelector((store: any) => {
    return store.userInfo.userEmail;
    });

    return(
        <Box width={'200px'} p={'15px'}>
            <Box style={{position:'fixed', left:100, top: 0}}>
                <Button onClick={() => {closeMenu();}}>Close Menu<MenuOpenIcon /></Button>
            </Box>
            <Box marginTop={'35px'}>
                <Typography>Welcome {userName}!</Typography>
            </Box>
            <List>
                <ListItem key={'Search'} disablePadding>
                    <ListItemButton onClick={()=>{dispatch(setCurScreen({value: 0}))}}>
                    <ListItemIcon>
                        <SearchIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Search'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Favorite'} disablePadding>
                    <ListItemButton onClick={()=>{dispatch(setCurScreen({value: 1}))}}>
                    <ListItemIcon>
                        <FavoriteBorderIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Favorites'} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Button variant="outlined" onClick={()=>{
                logout(dispatch);
            }}>
                Logout
            </Button>
        </Box>
    );
}