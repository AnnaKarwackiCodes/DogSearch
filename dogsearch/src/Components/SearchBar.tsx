import * as React from "react";
import { Box, Button, Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { getDogBreeds, getDogs, getDogSearchResults } from "../Helpers/api-client";
import { setSearchResults, setNextPage, setPrevPage, setTotalEntries, setTotalPages } from "../redux/reducers/SearchResults";

export default function SearchBar(){
    const dispatch = useDispatch();
    const [dogBreedsList, setDogBreedsList] = React.useState([]);
    const [dogBreed, setDogBreed] = React.useState('');
    const [zipCode, setZipCode] = React.useState('');
    const [minAge, setMinAge] = React.useState(0);
    const [maxAge, setMaxAge] = React.useState(100);
    

    React.useEffect(() => {
        getDogBreeds()
        .then((data: any) => {
            setDogBreedsList(data);
        })
        .catch((error: any) => {
            console.log(error);
        });
    }, []);
    
    function startSearch(){
        dispatch(setSearchResults({results: []}));
        getDogSearchResults([dogBreed], [zipCode], minAge, maxAge, 25, "", "")
        .then((data: any)=> {
            console.log(data);
            dispatch(setNextPage({next: data.next?data.next: ''}));
            dispatch(setPrevPage({next: data.prev?data.prev: ''}));
            dispatch(setTotalEntries({total: data.total}));
            dispatch(setTotalPages({value: Math.round(data.total/25)}));
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
        });
    }

    return (
        <Box style={{width: 450}} margin={'auto'}>
            <Autocomplete
                disablePortal
                options={dogBreedsList}
                sx={{ width: 450 }}
                value={dogBreed}
                onInputChange={(event, newInputValue) => {
                    setDogBreed(newInputValue);
                  }}
                renderInput={(params) => <TextField {...params} label="Dog Breeds" />}
            />
            <TextField 
                id="outlined-basic" 
                label="ZipCode" 
                variant="outlined" 
                value={zipCode}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setZipCode(event.target.value);
                }}
                style={{margin: 5}}
            />
            <TextField 
                id="outlined-basic" 
                label="Min Age" 
                variant="outlined" 
                type="number"
                value={minAge}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setMinAge(event.target.valueAsNumber);
                }}
                style={{margin: 5, width: 70}}
            />
            <TextField 
                id="outlined-basic" 
                label="Max Age" 
                variant="outlined" 
                type="number"
                value={maxAge}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setMaxAge(event.target.valueAsNumber);
                }}
                style={{margin: 5, width: 80}}
            />
            <Button variant="outlined" onClick={()=>{startSearch()}}>Search</Button>
        </Box>
    )
}