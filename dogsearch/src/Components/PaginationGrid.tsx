import * as React from "react";
import { Box, Pagination, Grid } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { getDogBreeds, getDogSearchResults, getDogs, getPaginationResult } from "../Helpers/api-client";
import DogCard from "./DogCard";
import { Dog } from "../Helpers/typing";
import { setNextPage, setPrevPage, setSearchResults } from "../redux/reducers/SearchResults";


export default function PaginationGrid(){

    const dispatch = useDispatch();
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
    const [localResults, setLocalResults] = React.useState([]);
    const [curPage, setCurPage] = React.useState(1);

    React.useEffect(()=>{
        setLocalResults(results);
        console.log(results);
    }, [results]);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        getPaginationResult(value > curPage ? nextPage : prevPage)
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
        <Box width={'100%'} style={{flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '15px'}}>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
                {localResults.map((value: Dog, index: number) => (
                    <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                        <DogCard dogObject={value} />
                    </Grid>
                ))}
            </Grid>
            {pageTotal > 0 && <Pagination count={pageTotal} page={curPage} onChange={handleChange} siblingCount={0} />}
        </Box>
    )
}