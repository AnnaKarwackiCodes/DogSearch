import * as React from "react";
import { Box, Pagination, Grid, Stack } from "@mui/material";
import DogCard from "./DogCard";
import { Dog } from "../Helpers/typing";


export default function PaginationGrid({results, pageTotal, handlePageChange, curPage}: any){
    
    const [localResults, setLocalResults] = React.useState([]);

    React.useEffect(()=>{
        setLocalResults(results);
        //console.log(results);
    }, [results]);


    return (
        <Box width={'100%'} style={{flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center'}} margin={'auto'} paddingTop={2} marginBottom={5}>
            <Grid container spacing={{ xs: 1, md: 3 }} columns={{ xs: 4, sm: 10, md: 19, lg: 15, xl: 10 }} sx={{ justifyContent: "center", alignItems: "center",}}>
                {localResults.map((value: Dog, index: number) => (
                    <Grid key={index} size={{ xs: 3, sm: 4, md: 6, lg: 4, xl: 3 }} sx={{ justifyContent: "center", alignItems: "center",}}>
                        <DogCard dogObject={value} showFav={true}/>
                    </Grid>
                ))}
            </Grid>
            {pageTotal > 1 && <Stack alignItems="center" padding={5} ><Pagination style={{backgroundColor: 'white', padding: 15, borderRadius: 15}} boundaryCount={0} count={pageTotal} page={curPage} onChange={handlePageChange} siblingCount={0}/></Stack>}
        </Box>
    )
}