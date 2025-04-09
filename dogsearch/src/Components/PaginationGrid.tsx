import * as React from "react";
import { Box, Pagination, Grid } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { getDogBreeds, getDogSearchResults, getDogs } from "../Helpers/api-client";
import DogCard from "./DogCard";


export default function PaginationGrid(){

    const [results, setResults] = React.useState([]);

    return (
        <Box width={'100%'} style={{flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '15px'}}>
            <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 10, md: 15 }}>
                {results.map((value, index) => (
                    <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
                        <DogCard dogObject={value} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}