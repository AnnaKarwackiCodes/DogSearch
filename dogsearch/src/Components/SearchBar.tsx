import * as React from "react";
import { Box, Button, Autocomplete, TextField, Typography, Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { useDispatch } from 'react-redux';
import { getDogBreeds, getDogs, getDogSearchResults } from "../Helpers/api-client";
import { setSearchResults, setNextPage, setPrevPage, setTotalEntries, setTotalPages } from "../redux/reducers/SearchResults";
import Divider from '@mui/material/Divider';


export default function SearchBar(){
    const dispatch = useDispatch();
    const [dogBreedsList, setDogBreedsList] = React.useState([]);
    const stringarray : string[] = []
    const [dogBreed, setDogBreed] = React.useState(stringarray);
    const [zipCode, setZipCode] = React.useState(stringarray);
    const [minAge, setMinAge] = React.useState(0);
    const [maxAge, setMaxAge] = React.useState(100);
    const [resultSize, setResultSize] = React.useState(25);
    const [sortQueryField, setSortQueryField] = React.useState('breed');
    const [sortQueryDirection, setSortQueryDirection] = React.useState('asc');

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
        getDogSearchResults(dogBreed, zipCode, minAge, maxAge, resultSize, `${sortQueryField}:${sortQueryDirection}`)
        .then((data: any)=> {
            console.log(data);
            dispatch(setNextPage({next: data.next?data.next: ''}));
            dispatch(setPrevPage({next: data.prev?data.prev: ''}));
            dispatch(setTotalEntries({total: data.total}));
            dispatch(setTotalPages({value: Math.round(data.total/resultSize) + 1}));
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
    const handleQueryFieldChange = (event: SelectChangeEvent) => {
        setSortQueryField(event.target.value);
    };
      
    const handleQueryDirectionChange = (event: SelectChangeEvent) => {
        setSortQueryDirection(event.target.value);
    };

    return (
        <Box>
            <Box style={{width: '50%'}} margin={'auto'}>
                <Autocomplete
                    disablePortal
                    options={dogBreedsList}
                    sx={{ width: 450 }}
                    value={dogBreed[0]}
                    onInputChange={(event, newInputValue) => {
                        setDogBreed([newInputValue]);
                    }}
                    renderInput={(params) => <TextField {...params} label="Dog Breeds" />}
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
                <TextField 
                    id="outlined-basic" 
                    label="ZipCode" 
                    variant="outlined" 
                    value={zipCode}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setZipCode([event.target.value]);
                    }}
                    style={{margin: 5}}
                />
                <TextField 
                    id="outlined-basic" 
                    label="Number of Results per Page" 
                    variant="outlined" 
                    type="number"
                    value={resultSize}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setResultSize(event.target.valueAsNumber);
                    }}
                    style={{margin: 5, width: 200}}
                />
                <Box>
                <Typography variant="body2">Sort by</Typography>
                <Select
                    labelId="field-select-label"
                    id="field-select"
                    value={sortQueryField}
                    label="Field"
                    onChange={handleQueryFieldChange}
                    >
                    <MenuItem value={'breed'}>Breed</MenuItem>
                    <MenuItem value={'name'}>Name</MenuItem>
                    <MenuItem value={'age'}>Age</MenuItem>
                </Select>
                <Select
                    labelId="direction-select-label"
                    id="direction-select"
                    value={sortQueryField}
                    label="Direction"
                    onChange={handleQueryDirectionChange}
                    >
                    <MenuItem value={'asc'}>Acs</MenuItem>
                    <MenuItem value={'desc'}>Desc</MenuItem>
                </Select>
            </Box>
                <Button variant="outlined" onClick={()=>{startSearch()}}>Search</Button>
                <Divider style={{marginTop: 25, marginBottom: 25}} />
            </Box>
            
        </Box>
    )
}