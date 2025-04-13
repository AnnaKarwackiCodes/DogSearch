import * as React from "react";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import PaginationGrid from "../Components/PaginationGrid";
import SearchBar from "../Components/SearchBar";
import { getDogs, getPaginationResult } from "../Helpers/api-client";
import { setNextPage, setPrevPage, setSearchResults } from "../redux/reducers/SearchResults";
import DoggleTitle from "../Components/DoogleTitle";


export default function SearchScreen(){

    const dispatch = useDispatch();
    const [curPage, setCurPage] = React.useState(1);
    const [showLoading, setShowLoading] = React.useState(false);

    const results = useSelector((store: any) => {
        return store.searchResults.results;
      });
    const pageTotal = useSelector((store: any) => {
        return store.searchResults.totalPages;
    });
    const nextPage = useSelector((store: any) => {
        return store.searchResults.nextPageQuery;
    });
    const prevPage = useSelector((store: any) => {
        return store.searchResults.prevPageQuery;
    });

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        console.log(value);
        let temp = '';
        if(value > curPage){
            temp = nextPage;
        } else if (value < curPage){
            temp = prevPage;
        } else {
            return;
        }
        setShowLoading(true);
        dispatch(setSearchResults({results: []}));
        getPaginationResult(temp)
        .then((data: any) => {
            console.log(data);
            dispatch(setPrevPage({prev: data.prev?data.prev: ''}));
            dispatch(setNextPage({next: data.next?data.next: ''}));
            getDogs(data.resultIds)
            .then((dogs: any) => {
                console.log(dogs);
                dispatch(setSearchResults({results: dogs.data}));
                setShowLoading(false);
            })
            .catch((error: any) => {
                console.log(error);
                setShowLoading(false);
            })
        })
        .catch((error: any) => {
            console.log(error);
            setShowLoading(false);
        })
        setCurPage(value);
      };

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [curPage]);

    return (
        <Box width={'100%'}>
            <Paper elevation={12} style={{flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center', backgroundColor: 'white', paddingBottom:15, marginBottom:35, paddingTop:5}}>
                <DoggleTitle />
                <Typography variant="h5">The search engine for dogs</Typography>
            </Paper>
            <Box margin={'auto'}>
                <SearchBar/>
                {showLoading && <Box margin={'auto'} width={'auto'} textAlign={'center'}><CircularProgress style={{color: '#FB8500'}}/></Box>}
                <PaginationGrid results={results} pageTotal={pageTotal} handlePageChange={handleChange} curPage={curPage}/>
            </Box>
        </Box>
    )
}