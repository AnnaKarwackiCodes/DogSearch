import * as React from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import PaginationGrid from "../Components/PaginationGrid";
import SearchBar from "../Components/SearchBar";
import { getDogs, getPaginationResult } from "../Helpers/api-client";
import { setNextPage, setPrevPage, setSearchResults } from "../redux/reducers/SearchResults";
import DoggleTitle from "../Components/DoogleTitle";


export default function SearchScreen(){

    const dispatch = useDispatch();
    const [curPage, setCurPage] = React.useState(1);

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
        getPaginationResult(temp)
        .then((data: any) => {
            console.log(data);
            dispatch(setPrevPage({prev: data.prev?data.prev: ''}));
            dispatch(setNextPage({next: data.next?data.next: ''}));
            getDogs(data.resultIds)
            .then((dogs: any) => {
                console.log(dogs);
                dispatch(setSearchResults({results: dogs.data}));
            })
            .catch((error: any) => {
                console.log(error);
            })
        })
        .catch((error: any) => {
            console.log(error);
        })
        setCurPage(value);
      };
    return (
        <Box width={'100%'}>
            <Box style={{flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center'}} marginBottom={5} marginTop={2}>
                <DoggleTitle />
                <Typography variant="h4">The search engine for dogs</Typography>
            </Box>
            <Box margin={'auto'}>
                <SearchBar/>
                <PaginationGrid results={results} pageTotal={pageTotal} handlePageChange={handleChange} curPage={curPage}/>
            </Box>
        </Box>
    )
}