import * as React from "react";
import { Box, Button, Autocomplete, TextField, Typography, Select, MenuItem, SelectChangeEvent, InputLabel, Stack, Paper, CircularProgress } from "@mui/material";
import { useDispatch } from 'react-redux';
import { getDogBreeds, getDogs, getDogSearchResults } from "../Helpers/api-client";
import { setSearchResults, setNextPage, setPrevPage, setTotalEntries, setTotalPages } from "../redux/reducers/SearchResults";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';


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

    const [showLoading, setShowLoading] = React.useState(false);

    const [hideSearchBar, setHideSearchBar] = React.useState(false);

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
        setShowLoading(true);
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
                setHideSearchBar(true);
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
        });
    }
    const handleQueryFieldChange = (event: SelectChangeEvent) => {
        setSortQueryField(event.target.value);
    };
      
    const handleQueryDirectionChange = (event: SelectChangeEvent) => {
        setSortQueryDirection(event.target.value);
    };

    return (
        <Box marginTop={{md: '2vh', lg: '5vh'}} marginBottom={{md: '2vh', lg: '5vh'}}>
            <Box width={{ xs: '80%', sm: '75%', md: '60%' }} margin={'auto'}>
                {!hideSearchBar && <Paper elevation={3} style={{padding: 15}} >
                <Typography variant="body1">Start your search here:</Typography>
                <Box>
                    <Autocomplete
                        disablePortal
                        options={dogBreedsList}
                        value={dogBreed[0]}
                        onInputChange={(event, newInputValue) => {
                            setDogBreed([newInputValue]);
                        }}
                        renderInput={(params) => <TextField {...params} label="Dog Breeds" />}
                    />
                    <TextField 
                        id="outlined-basic" 
                        label="ZipCode" 
                        variant="outlined" 
                        value={zipCode}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setZipCode([event.target.value]);
                        }}
                        style={{margin: 5, marginTop: 10}}
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
                        style={{margin: 5, marginTop: 10, width: 70}}
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
                        style={{margin: 5, marginTop: 10, width: 80}}
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
                            style={{margin: 5, marginTop: 10, width: 200}}
                        />
                </Box>
                <Box>
                    <Typography variant="body1">Sort by:</Typography>
                    <Stack direction="row" spacing={2}>
                        <Box>
                            <InputLabel id="field-select-helper-label">Field</InputLabel>
                            <Select
                                labelId="field-select-label"
                                id="field-select"
                                value={sortQueryField}
                                label="Field"
                                onChange={handleQueryFieldChange}
                                style={{width: 100}}
                                >
                                <MenuItem value={'breed'}>Breed</MenuItem>
                                <MenuItem value={'name'}>Name</MenuItem>
                                <MenuItem value={'age'}>Age</MenuItem>
                            </Select>
                        </Box>
                        <Box>
                        <InputLabel id="direction-select-helper-label">Direction</InputLabel>
                        <Select
                            labelId="direction-select-label"
                            id="direction-select"
                            value={sortQueryDirection}
                            label="Direction"
                            onChange={handleQueryDirectionChange}
                            style={{width: 100}}
                            >
                            <MenuItem value={'asc'}>Ascending</MenuItem>
                            <MenuItem value={'desc'}>Descending</MenuItem>
                        </Select>
                        </Box>
                    </Stack>
                </Box>
                <Box>
                    <Button variant="contained" onClick={()=>{startSearch()}} style={{marginTop: 10, width: 120, backgroundColor: '#FFB703', color: '#023047'}}> <SearchIcon /> Search</Button>
                </Box>
                {showLoading && <CircularProgress style={{margin: 'auto', padding: 5}}/>}
                </Paper> }  
                <Button style={{color: '#023047'}} onClick={()=>{setHideSearchBar(!hideSearchBar)}}>{!hideSearchBar ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}{!hideSearchBar ? "Hide" : "Show"} Search Bar</Button>
            </Box>
        </Box>
    )
}