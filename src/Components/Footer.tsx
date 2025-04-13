import * as React from "react";
import { Box, Typography, List, ListItemButton, ListItem, ListItemIcon, ListItemText, Paper } from "@mui/material";
import GitHubIcon from '@mui/icons-material/GitHub';
import PaletteIcon from '@mui/icons-material/Palette';


export default function Footer(){
    
    const [localResults, setLocalResults] = React.useState([]);



    return (
        <Paper elevation={14} style={{width: '100%', backgroundColor: 'white', margin: 'auto', paddingTop:12, marginTop: 15}}>
            <Box style={{flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center',}}>
                <Typography>Site was built by Anna Karwacki using React, Material UI, Redux, and released using AWS Amplify</Typography>
                <Box width={'250px'}>
                <List>
                    <ListItem key={'GitHub'} disablePadding>
                        <ListItemButton onClick={()=>{window.open("https://github.com/AnnaKarwackiCodes/DogSearch", "_blank")}}>
                        <ListItemIcon>
                            <GitHubIcon style={{color: '#023047'}}/>
                        </ListItemIcon>
                        <ListItemText primary={'GitHub Repo'} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'Portfolio'} disablePadding>
                        <ListItemButton onClick={()=>{window.open("https://www.annakarwacki-makes.com/", "_blank")}}>
                        <ListItemIcon>
                            <PaletteIcon style={{color: '#023047'}}/>
                        </ListItemIcon>
                        <ListItemText primary={'Portfolio Website'} />
                        </ListItemButton>
                    </ListItem>
                </List>
                </Box>
            </Box>
        </Paper>
    )
}