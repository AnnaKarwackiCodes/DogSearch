import { Box, Typography } from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';


export default function DoogleTitle(){
    return (
        <Box width={'100%'} style={{flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center'}} margin={'auto'} paddingTop={2}>
            <Typography variant="h3">D<PetsIcon /><PetsIcon />gle</Typography>
        </Box>
    )
}