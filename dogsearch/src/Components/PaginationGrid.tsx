import * as React from "react";
import { Box, Pagination, Grid } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { getDogBreeds, getDogSearchResults, getDogs } from "../Helpers/api-client";



export default function PaginationGrid(){

    const [results, setResults] = React.useState([]);

    React.useEffect(()=>{
        getDogSearchResults(['Affenpinscher'],[],0,100)
        .then((data: any) => {
            console.log('this is a test');
            console.log(data);
            setResults(data.resultIds);
            getDogs(data.resultIds);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }, []);

    return (
        <Box width={'300px'} style={{flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {results.map((value, index) => (
                    <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                        <Box>{value}</Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}