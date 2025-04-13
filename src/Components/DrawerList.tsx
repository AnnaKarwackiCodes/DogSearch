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
            <Box style={{position:'fixed', left:100, top: 0,}} >
                <Button style={{color: '#023047'}} onClick={() => {closeMenu();}}>Close Menu<MenuOpenIcon /></Button>
            </Box>
            <Box marginTop={'35px'}>
                <Typography variant="h6">Welcome {userName}!</Typography>
            </Box>
            <List>
                <ListItem key={'Search'} disablePadding>
                    <ListItemButton onClick={()=>{dispatch(setCurScreen({value: 0})); window.scrollTo(0, 0);}}>
                    <ListItemIcon>
                        <SearchIcon style={{color: '#FFB703'}}/>
                    </ListItemIcon>
                    <ListItemText primary={'Search Dogs'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={'Favorite'} disablePadding>
                    <ListItemButton onClick={()=>{dispatch(setCurScreen({value: 1})); window.scrollTo(0, 0);}}>
                    <ListItemIcon>
                        <FavoriteBorderIcon style={{color: '#FB8500'}}/>
                    </ListItemIcon>
                    <ListItemText primary={'Favorite Dogs'} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Button variant="outlined" style={{color: '#219EBC'}} onClick={()=>{
                logout(dispatch);
            }}>
                Logout
            </Button>
        </Box>
    );
}