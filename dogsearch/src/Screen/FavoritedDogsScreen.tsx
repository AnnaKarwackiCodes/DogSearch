import * as React from "react";
import { Box, Card, Typography, TextField, Button, Alert, Drawer } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import PaginationGrid from "../Components/PaginationGrid";
import SearchIcon from '@mui/icons-material/Search';
import { setCurScreen } from "../redux/reducers/UserInfo";


export default function FavoritedDogsScreen(){

    const dispatch = useDispatch();
    const [curPage, setCurPage] = React.useState(1);

    const results = useSelector((store: any) => {
        return store.userInfo.favoriteDogs;
      });
    const [pageTotal, setPageTotal] = React.useState(0);
    const [nextPage, setNextPage] = React.useState('');
    const [prevPage, setPrevPage] = React.useState('');

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurPage(value);
      };

    return (
        <Box width={'100%'} style={{flex: 1}}>
            <Box style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                <Box>
                    <Typography variant="h3">Doggle</Typography>
                    <Typography variant="h4">Your Favorited Doggies</Typography>
                </Box>
                {results.length === 0 && 
                    <Box style={{width: 300, padding: 25}} margin={'auto'}>
                        <Typography variant="body1">You have not added any dogs to your favorites. Trying adding some</Typography>
                        <Button onClick={()=> {dispatch(setCurScreen({value: 0}))}}> <SearchIcon />Search Now for dogs to add.</Button>
                    </Box>}
                <PaginationGrid results={results} pageTotal={pageTotal} handlePageChange={handleChange} curPage={curPage}/>
            </Box>
        </Box>
    )
}